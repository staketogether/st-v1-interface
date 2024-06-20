import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useForm } from 'react-hook-form'
import { PiArrowLineRight, PiArrowRight, PiArrowsCounterClockwise, PiWallet } from 'react-icons/pi'
import styled from 'styled-components'
import { encodeFunctionData, erc20Abi } from 'viem'
import Button from '../shared/Button'
import Input from '../shared/inputs/Input'
import AlertMessageComponent from '../shared/AlertMessageComponent'

import { ethers, isAddress, parseEther } from 'ethers'

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
import { Asset } from '@/types/Asset'

interface AssetSendProps {
  walletTo: string
}

export function AssetsSend({ asset, chainId }: { asset?: Asset, chainId: number }) {
  const [sendAmount, setSendAmount] = useState<string>('0')

  const { t } = useLocaleTranslation()
  const { account, chainId: walletChainId } = useConnectedAccount()
  const isWrongNetwork = chainId !== walletChainId
  const { name } = chainConfigByChainId(chainId)
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const { isLoading, tokenBalance } = useBalanceOf({
    chainId,
    decimals: asset?.decimals,
    type: asset?.type ?? 'erc20',
    contractAddress: asset?.networks[chainId].contractAddress,
    walletAddress: account
  })
  const { reload } = useRouter()
  const {
    sendTransaction,
    isLoading: transactionLoading,
    isSuccess: transactionSuccess
  } = useAssetSendTransaction({ chainId })

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
        chainId
      })
      return
    }

    const to = data.walletTo as `0x${string}`

    if (!isAddress(to)) {
      notification.error({ message: t('getFaucetErrorMessages.invalidAddress') })
      setError('walletTo', {
        type: 'invalid',
        message: `${t('getFaucetErrorMessages.invalidAddress')}`
      })
      return
    }
    if (asset?.type === 'native') {
      sendTransaction({ to, value: parseEther(sendAmount), chainId })
      return
    }
    const transferTxData = encodeFunctionData({
      abi: erc20Abi,
      args: [to, ethers.parseUnits(sendAmount, asset?.decimals)],
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
      {account &&
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
            chainId={chainId}
            ethAmountValue={sendAmount}
            onChange={v => {
              handleChange(v)
            }}
            onMaxFunction={() => setSendAmount(tokenBalance.balance)}
            asset={asset}
            hasError={false}
            background='white'
            balance={tokenBalance.balance}
            balanceLoading={isLoading}
            accountIsConnected={!!account}
          />
        </div>
      }
      {account && <AlertMessageComponent message={t('disclaimer')} />}
      {!account &&
        <ConnectWallet>
          <WalletIcon />
          <span>{t('connectYourWallet')}</span>
          <Button
            form='assetSendForm'
            isLoading={transactionLoading || openSidebarConnectWallet}
            type='submit'
            block
            label={handleButtonName()}
            disabled={transactionLoading || openSidebarConnectWallet || !!(Number(sendAmount) <= 0 && !isWrongNetwork)}
          />
        </ConnectWallet>
      }
      {account &&
        <Button
          form='assetSendForm'
          isLoading={transactionLoading || openSidebarConnectWallet}
          type='submit'
          label={handleButtonName()}
          icon={handleButtonIcon()}
          disabled={transactionLoading || openSidebarConnectWallet || !!(Number(sendAmount) <= 0 && !isWrongNetwork)}
        />
      }
    </FormContainer>
  )
}

const { FormContainer, ConnectWallet, WalletIcon } = {
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
    max-height: 450px;
    max-width: 420px;
  `,
  ConnectWallet: styled.div`
    width: 100%;
    border-radius: ${({ theme }) => theme.size[8]};
    align-items: start;
    background: ${({ theme }) => theme.colorV2.gray[2]};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[24]};

    span {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 500;
      color: ${({ theme }) => theme.color.gray[500]};
    }
  `,
  WalletIcon: styled(PiWallet)`
    width: 80px;
    height: 80px;
    color: ${({ theme }) => theme.color.gray[500]};
  `
}
