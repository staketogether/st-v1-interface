import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useForm } from 'react-hook-form'
import { PiArrowLineRight, PiArrowRight, PiArrowsCounterClockwise, PiWallet } from 'react-icons/pi'
import styled from 'styled-components'
import { encodeFunctionData, erc20Abi } from 'viem'
import Button from '../../shared/Button'
import Input from '../../shared/inputs/Input'
import AlertMessageComponent from '../../shared/AlertMessageComponent'

import { ethers, isAddress, parseEther } from 'ethers'

import AssetInput from './AssetsInput'
import { useCallback, useEffect, useState } from 'react'
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
import AssetNetworkSwitch, { Network } from './AssetsNetworkSwitch'
import useEstimateTxInfo from '@/hooks/useEstimateTxInfo'

interface AssetSendProps {
  walletTo: string
}

export function AssetsSend({ asset, chainId }: { asset?: Asset; chainId: number }) {
  const [sendAmount, setSendAmount] = useState<string>('0')

  // const [estimateGasCost, setEstimateGasCost] = useState(0n)
  // const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  // const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  // const [depositEstimatedGas, setDepositEstimatedGas] = useState<bigint | undefined>(undefined)

  // const { estimateGas } = useEstimateTxInfo({
  //   account: StakeTogether,
  //   functionName: 'depositPool',
  //   args: [poolAddress, referral],
  //   contractAddress: StakeTogether,
  //   abi: stakeTogetherAbi,
  //   value: amountEstimatedGas,
  //   skip: isDepositEstimatedGas && estimateGasCost > 0n,
  //   chainId: chainId
  // })

  // useEffect(() => {
  //   const handleEstimateGasPrice = async () => {
  //     const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } = await estimateGas()
  //     setDepositEstimatedGas(estimatedGas)
  //     setEstimateGasCost(estimatedCost)
  //     setMaxFeePerGas(estimatedMaxFeePerGas)
  //     setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
  //   }

  //   if (estimateGasCost === 0n) {
  //     handleEstimateGasPrice()
  //   }
  // }, [estimateGas, estimateGasCost])

  const { t } = useLocaleTranslation()
  const { account, chainId: walletChainId } = useConnectedAccount()
  const isWrongNetwork = chainId !== walletChainId
  const { name } = chainConfigByChainId(chainId)

  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const { isLoading: erc20IsLoading, tokenBalance: erc20TokenBalance } = useBalanceOf({
    chainId,
    decimals: asset?.decimals,
    type: asset?.type ?? 'erc20',
    contractAddress: asset?.networks.find(network => network.chainId === chainId)?.contractAddress,
    walletAddress: account
  })

  const { isLoading: nativeIsLoading, tokenBalance: nativeTokenBalance } = useBalanceOf({
    chainId,
    type: 'native',
    decimals: 18,
    walletAddress: account
  })

  const sendAmountBigNumber = ethers.parseEther(sendAmount || '0')
  const insufficientMinSend = sendAmountBigNumber > erc20TokenBalance.rawBalance

  const { reload, ...router } = useRouter()
  const { sendTransaction, isLoading: transactionLoading, isSuccess: transactionSuccess } = useAssetSendTransaction({ chainId })

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
  // console.log(asset)
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
          onError: error => {
            notification.error({ message: error.message })
          }
        }
      )
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

  const isDisabled = insufficientMinSend || transactionLoading || (Number(sendAmount) <= 0 && !isWrongNetwork)

  const onNetworkChange = useCallback(
    (network: Network) => {
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
      {account && <AlertMessageComponent message={t('disclaimer')} />}
      {!account && (
        <ConnectWallet>
          <WalletIcon />
          <span>{t('connectYourWallet')}</span>
          <Button
            form='assetSendForm'
            isLoading={transactionLoading || openSidebarConnectWallet}
            type='submit'
            block
            label={handleButtonName()}
            disabled={transactionLoading || openSidebarConnectWallet}
          />
        </ConnectWallet>
      )}
      {account && (
        <Button
          form='assetSendForm'
          isLoading={transactionLoading || openSidebarConnectWallet}
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
