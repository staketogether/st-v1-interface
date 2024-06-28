import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useForm } from 'react-hook-form'
import { PiArrowLineRight, PiArrowRight, PiArrowsCounterClockwise, PiWallet } from 'react-icons/pi'
import styled from 'styled-components'
import { erc20Abi } from 'viem'
import Button from '../../shared/Button'
import Input from '../../shared/inputs/Input'
import AlertMessageComponent from '../../shared/AlertMessageComponent'

import { ethers, isAddress, parseEther } from 'ethers'

import AssetInput from './AssetsInput'
import { useCallback, useEffect, useState } from 'react'
import useBalanceOf from '@/hooks/contracts/useBalanceOf'
import useAssetSendTransaction from '@/hooks/contracts/useSendTransaction'
import { notification } from 'antd'
import { useRouter } from 'next/router'
import { chainConfigByChainId } from '@/config/chain'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import {
  useAccount,
  useSimulateContract,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt as useWaitForTransaction
} from 'wagmi'
import { capitalize } from '@/config/utils'
import { Asset, AssetNetwork } from '@/types/Asset'
import AssetNetworkSwitch from './AssetsNetworkSwitch'
import useEstimateTxInfo from '@/hooks/useEstimateTxInfo'

interface AssetSendProps {
  walletTo: string
}

export function AssetsSend({ asset, chainId }: { asset?: Asset; chainId: number }) {
  const [sendAmount, setSendAmount] = useState<string>('0')

  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [sendTransactionEstimatedGas, setSendTransactionEstimatedGas] = useState<bigint | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const contractAddress = asset?.networks.find(network => network.chainId === chainId)?.contractAddress
  const { address: account, chainId: walletChainId } = useAccount()
  const { name, transactionConfig } = chainConfigByChainId(chainId)
  const { reload, ...router } = useRouter()
  const { t } = useLocaleTranslation()

  const simulateAmount = ethers.parseUnits('0.0000001', asset?.decimals)

  const { estimateGas } = useEstimateTxInfo({
    account: account,
    functionName: 'transfer',
    contractAddress: contractAddress ?? '0x',
    args: [account, simulateAmount],
    abi: erc20Abi,
    chainId
  })
  console.log(sendTransactionEstimatedGas, prepareTransactionErrorMessage)

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } = await estimateGas()
      setSendTransactionEstimatedGas(estimatedGas)
      setEstimateGasCost(estimatedCost)
      setMaxFeePerGas(estimatedMaxFeePerGas)
      setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
    }
    if (estimateGasCost === 0n) {
      handleEstimateGasPrice()
    }
  }, [estimateGas, estimateGasCost])

  const {
    isError: prepareTransactionIsError,
    error: prepareTransactionError,
    data: prepareTransferTransactionData
  } = useSimulateContract({
    functionName: 'transfer',
    address: contractAddress ?? '0x',
    args: [account ?? '0x', ethers.parseUnits(sendAmount, asset?.decimals)],
    abi: erc20Abi,
    chainId: chainId,
    gas: !!sendTransactionEstimatedGas && sendTransactionEstimatedGas > 0n ? sendTransactionEstimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n ? maxPriorityFeePerGas : undefined
  })
  useEffect(() => {
    if (prepareTransactionIsError && prepareTransactionError) {
      const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

      if (
        !cause?.reason &&
        cause?.message &&
        cause.message.includes('The total cost (gas * gas fee + value) of executing this transaction exceeds the balance')
      ) {
        setPrepareTransactionErrorMessage('insufficientGasBalance')
        return
      }
      const response = cause as { data?: { errorName?: string } }

      if (cause && response?.data?.errorName) {
        setPrepareTransactionErrorMessage(response?.data?.errorName)
      }
    }
  }, [prepareTransactionError, prepareTransactionIsError, t])

  const { writeContract, data: txHash } = useWriteContract()
  const { isLoading: awaitTransactionLoading, isSuccess: awaitTransactionSuccess } = useWaitForTransaction({
    hash: txHash,
    confirmations: transactionConfig.confirmations
  })

  const { sendTransaction, isLoading: nativeTransactionLoading, isSuccess: nativeTransactionSuccess } = useAssetSendTransaction({ chainId })
  const isLoadingTransaction = nativeTransactionLoading || awaitTransactionLoading
  const isSuccessTransaction = nativeTransactionSuccess || awaitTransactionSuccess

  useEffect(() => {
    function verifyTransaction() {
      if (isSuccessTransaction) {
        notification.success({ message: t('genericTransactionSuccess') })
        reload()
      }
    }
    verifyTransaction()
  }, [reload, isSuccessTransaction, t])

  const isWrongNetwork = chainId !== walletChainId

  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const { isLoading: erc20IsLoading, tokenBalance: erc20TokenBalance } = useBalanceOf({
    chainId,
    decimals: asset?.decimals,
    type: asset?.type ?? 'erc20',
    contractAddress: asset?.networks.find(network => network.chainId === chainId)?.contractAddress,
    walletAddress: account
  })

  const sendAmountBigNumber =
    asset?.type === 'native' ? ethers.parseEther(sendAmount || '0') : ethers.parseUnits(sendAmount, asset?.decimals)
  const insufficientMinSend = sendAmountBigNumber > erc20TokenBalance.rawBalance

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
    writeContract(prepareTransferTransactionData!.request)
  }

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

  const isDisabled = insufficientMinSend || nativeTransactionLoading || (Number(sendAmount) <= 0 && !isWrongNetwork)

  const onNetworkChange = useCallback(
    (network: AssetNetwork) => {
      router.query.network = network.name.toLowerCase()
      router.query.product = network.contractAddress
      router.push(router)
    },
    [router]
  )

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
          disabled={isDisabled}
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
