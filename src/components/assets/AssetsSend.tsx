import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useForm } from 'react-hook-form'
import { PiArrowLineRight, PiArrowRight, PiArrowsCounterClockwise } from 'react-icons/pi'
import styled from 'styled-components'
import { encodeFunctionData, erc20Abi } from 'viem'
import Button from '../shared/Button'
import Input from '../shared/inputs/Input'

import { ethers, isAddress, parseEther } from 'ethers'

import { Asset } from '@/types/Asset'
import AssetInput from './AssetsInput'
import { useEffect, useState } from 'react'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useBalanceOf from '@/hooks/contracts/useBalanceOf'
import useAssetSendTransaction from '@/hooks/contracts/useSendTransaction'
import { notification } from 'antd'
import { useRouter } from 'next/router'
import { chainConfigByChainId } from '@/config/chain'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { useSwitchChain } from 'wagmi'
import { capitalize } from '@/config/utils'

interface AssetSendProps {
  walletTo: string
}

export function AssetsSend({ asset }: { asset: Asset }) {
  const [sendAmount, setSendAmount] = useState<string>('0')

  const { t } = useLocaleTranslation()
  const { account, chainId: walletChainId } = useConnectedAccount()
  const isWrongNetwork = asset.chains[0] !== walletChainId
  const { name } = chainConfigByChainId(asset.chains[0])
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const { isLoading, tokenBalance } = useBalanceOf({ asset, walletAddress: account })
  const { reload } = useRouter()
  const {
    sendTransaction,
    isLoading: transactionLoading,
    isSuccess: transactionSuccess
  } = useAssetSendTransaction({ chainId: asset.chains[0] })

  useEffect(() => {
    function verifyTransaction() {
      if (transactionSuccess) {
        notification.success({ message: t('genericTransactionSuccess') })
        reload()
      }
    }
    verifyTransaction()
  }, [reload, transactionSuccess, t])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<AssetSendProps>()

  const handleChange = (v: string) => {
    if (v.includes(',')) {
      v = v.replace(',', '.')
    }
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!v || regex.test(v)) {
      if (v.length > 19 + v.split('.')[0].length) return

      setSendAmount(v)
    }
  }

  const { switchChain } = useSwitchChain()
  const onSubmit = (data: AssetSendProps) => {
    if (!account) {
      setOpenSidebarConnectWallet(true)
      return
    }

    if (isWrongNetwork && !!account && switchChain) {
      switchChain({
        chainId: asset.chains[0]
      })
      return
    }
    const [chain] = asset.chains

    const to = data.walletTo as `0x${string}`

    if (!isAddress(to)) {
      notification.error({ message: t('getFaucetErrorMessages.invalidAddress') })
      setError('walletTo', {
        type: 'invalid',
        message: `${t('getFaucetErrorMessages.invalidAddress')}`
      })
      return
    }
    if (asset.type === 'native') {
      sendTransaction({ to, value: parseEther(sendAmount), chainId: chain })
      return
    }
    const transferTxData = encodeFunctionData({
      abi: erc20Abi,
      args: [to, ethers.parseUnits(sendAmount, asset.decimals)],
      functionName: 'transfer'
    })
    sendTransaction({
      to,
      data: transferTxData
    })
  }

  function handleButtonName() {
    if (!account) {
      return t('connectWallet')
    }

    if (isWrongNetwork && !!account) {
      return `${t('switch')} ${capitalize(name.toLowerCase().replaceAll('-', ' '))}`
    }

    return t('next')
  }

  function handleButtonIcon() {
    if (!account) {
      return <PiArrowLineRight />
    }

    if (isWrongNetwork && !!account) {
      return <PiArrowsCounterClockwise />
    }

    return <PiArrowRight />
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id='assetSendForm'>
      <div>
        <Input
          title={t('sendAddress')}
          disabled={false}
          disabledLabel={false}
          register={register('walletTo', {
            required: `${t('v2.createProject.formMessages.required')}`
          })}
          maxLength={64}
          background='white'
          error={errors.walletTo?.message}
          placeholder={'0x'}
        />
        <AssetInput
          ethAmountValue={sendAmount}
          onChange={v => {
            handleChange(v)
          }}
          onMaxFunction={() => setSendAmount(tokenBalance.balance)}
          productAsset={asset}
          hasError={false}
          background='white'
          balance={tokenBalance.balance}
          balanceLoading={isLoading}
          accountIsConnected={!!account}
        />
      </div>

      <Button
        form='assetSendForm'
        isLoading={transactionLoading || openSidebarConnectWallet}
        type='submit'
        label={handleButtonName()}
        icon={handleButtonIcon()}
        disabled={transactionLoading || openSidebarConnectWallet || !!(Number(sendAmount) <= 0 && !isWrongNetwork)}
      />
    </FormContainer>
  )
}

const { FormContainer } = {
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
    max-height: 450px;
    max-width: 420px;
  `
}
