import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useForm } from 'react-hook-form'
import { PiArrowLineRight, PiArrowRight, PiArrowsCounterClockwise, PiWallet } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '../../shared/Button'
import Input from '../../shared/inputs/Input'
import AlertMessageComponent from '../../shared/AlertMessageComponent'

import { ethers, isAddress, parseEther } from 'ethers'

import AssetInput from './AssetsInput'
import { useCallback, useEffect, useState } from 'react'
import useBalanceOf from '@/hooks/contracts/useBalanceOf'
import useAssetSendTransaction from '@/components/pages/assets/hooks/useSendTransaction'
import { notification } from 'antd'
import { useRouter } from 'next/router'
import { chainConfigByChainId } from '@/config/chain'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { useSwitchChain } from 'wagmi'
import { capitalize } from '@/config/utils'
import { Asset, AssetNetwork } from '@/types/Asset'
import AssetNetworkSwitch from './AssetsNetworkSwitch'
import useTransferTransaction from './hooks/useTransferTransaction'
import useConnectedAccount from '@/hooks/useConnectedAccount'

interface AssetSendProps {
  walletTo: string
}

export function AssetsSend({ asset, chainId, userTokenRefetch }: { asset: Asset; chainId: number; userTokenRefetch: () => void }) {
  const [sendAmount, setSendAmount] = useState<string>('0')

  const { account, chainId: walletChainId, web3AuthUserInfo } = useConnectedAccount()
  const { name } = chainConfigByChainId(chainId)
  const { t } = useLocaleTranslation()
  const router = useRouter()

  const {
    isLoading: erc20IsLoading,
    tokenBalance: erc20TokenBalance,
    refetch
  } = useBalanceOf({
    chainId,
    decimals: asset?.decimals,
    type: asset?.type ?? 'erc20',
    contractAddress: asset?.networks.find(network => network.chainId === chainId)?.contractAddress,
    walletAddress: account
  })

  const { tokenBalance: nativeTokenBalance, refetch: nativeTokenRefetch } = useBalanceOf({
    chainId,
    decimals: asset?.decimals,
    type: 'native'
  })

  const {
    awaitWalletAction,
    isLoading: transferLoading,
    isSuccess: transferSuccess,
    sendTransfer,
    prepareTransactionErrorMessage,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    sendTransactionEstimatedGas
  } = useTransferTransaction({ chainId, asset, sendAmountValue: sendAmount })
  const { sendTransaction, isLoading: nativeTransactionLoading, isSuccess: nativeTransactionSuccess } = useAssetSendTransaction({ chainId })

  const isLoadingTransaction = asset.type === 'native' ? nativeTransactionLoading : awaitWalletAction || transferLoading
  const isSuccessTransaction = asset.type === 'native' ? nativeTransactionSuccess : transferSuccess
  const prepareTransaction = asset.type === 'native' ? true : prepareTransactionIsSuccess
  const prepareTransactionError = asset.type === 'native' ? false : prepareTransactionIsError

  useEffect(() => {
    function verifyTransaction() {
      if (isSuccessTransaction) {
        notification.success({ message: t('genericTransactionSuccess') })
        userTokenRefetch()
        refetch()
        nativeTokenRefetch()
      }
    }
    verifyTransaction()
  }, [isSuccessTransaction, userTokenRefetch, refetch, nativeTokenRefetch, t])

  const isWrongNetwork = chainId !== walletChainId

  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const sendAmountBigNumber =
    asset?.type === 'native' ? ethers.parseEther(sendAmount || '0') : ethers.parseUnits(sendAmount, asset?.decimals)
  const insufficientMinSend = sendAmountBigNumber > erc20TokenBalance.rawBalance
  const userCanPayForGas = nativeTokenBalance.rawBalance > sendTransactionEstimatedGas

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

  function handleButtonName() {
    if (!account) {
      return t('connectWallet')
    }

    if (isWrongNetwork && !!account) {
      return `${t('switch')} ${capitalize(name.toLowerCase().replaceAll('-', ' '))}`
    }

    if (insufficientMinSend) {
      return t('form.insufficientFunds')
    }

    if (!userCanPayForGas) {
      return t('form.insufficientFundsPerGas')
    }

    if (!prepareTransaction && prepareTransactionErrorMessage && prepareTransactionErrorMessage === 'insufficientGasBalance') {
      return t('form.insufficientFundsPerGas')
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

  const isDisabled =
    asset.type === 'native'
      ? insufficientMinSend || nativeTransactionLoading || (Number(sendAmount) <= 0 && !isWrongNetwork)
      : insufficientMinSend ||
        (!prepareTransaction && !!web3AuthUserInfo) ||
        prepareTransactionError ||
        (Number(sendAmount) <= 0 && !isWrongNetwork) ||
        (!userCanPayForGas && !!web3AuthUserInfo)

  const onNetworkChange = useCallback(
    (network: AssetNetwork) => {
      router.query.network = network.name.toLowerCase()
      router.query.product = network.contractAddress
      router.push(router)
    },
    [router]
  )

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
      sendTransaction(
        { to, value: parseEther(sendAmount), chainId },
        {
          onError: () => {
            if (sendAmountBigNumber === erc20TokenBalance.rawBalance) {
              notification.error({
                message: t('form.insufficientFundsPerGas')
              })
              return
            }
            notification.error({
              message: t('sendTransactionError')
                .replace('network', name)
                .replace('symbol', `${chainId === 137 ? 'MATIC' : 'ETH'}`)
            })
          }
        }
      )
      return
    }

    if (!userCanPayForGas && !!web3AuthUserInfo) {
      notification.error({
        message: t('form.insufficientFundsPerGas')
      })
      return
    }

    sendTransfer()
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id='assetSendForm'>
      <AssetNetworkSwitch chainId={chainId} networks={asset?.networks ?? []} title='Rede ' onChange={onNetworkChange} />
      {account && (
        <>
          <AssetInput
            chainId={chainId}
            ethAmountValue={sendAmount}
            onChange={v => {
              handleChange(v)
            }}
            onMaxFunction={() => setSendAmount(erc20TokenBalance.balance)}
            asset={asset}
            hasError={false}
            background='white'
            balance={erc20TokenBalance.balance}
            balanceLoading={erc20IsLoading}
            accountIsConnected={!!account}
          />
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
        </>
      )}
      {account && (
        <AlertMessageComponent
          message={t('disclaimer')
            .replace('network', name)
            .replace('symbol', `${chainId === 137 ? 'MATIC' : 'ETH'}`)}
        />
      )}
      {!account && (
        <ConnectWallet>
          <WalletIcon />
          <span>{t('connectYourWallet')}</span>
          <Button
            form='assetSendForm'
            isLoading={nativeTransactionLoading || openSidebarConnectWallet}
            type='submit'
            block
            label={handleButtonName()}
            disabled={nativeTransactionLoading || openSidebarConnectWallet}
          />
        </ConnectWallet>
      )}
      {account && (
        <Button
          form='assetSendForm'
          isLoading={isLoadingTransaction || openSidebarConnectWallet}
          type='submit'
          label={handleButtonName()}
          icon={handleButtonIcon()}
          disabled={isDisabled || isLoadingTransaction}
        />
      )}
    </FormContainer>
  )
}

const { FormContainer, ConnectWallet, WalletIcon } = {
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
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
