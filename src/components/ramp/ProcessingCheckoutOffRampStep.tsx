import { offRampPixKeyVar, quoteVar } from '@/hooks/ramp/useRampControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { StaticAsset } from '@/types/StaticAsset'
import { useReactiveVar } from '@apollo/client'
import { PiArrowsCounterClockwise, PiClockLight, PiCurrencyDollar } from 'react-icons/pi'
import styled, { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../shared/LottieAnimation'
import { useEffect } from 'react'
import { GiPadlockOpen } from 'react-icons/gi'
import useOffRampSell from '@/hooks/ramp/useOffRampSell'
import { useAccount, useSwitchChain } from 'wagmi'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import Button from '../shared/Button'
import { chainConfigByChainId } from '@/config/chain'
import successAnimation from '@assets/animations/success-animation.json'
import useAllowance from '@/hooks/contracts/useAllowance'
import useApprove from '@/hooks/contracts/useApprove'
interface ProcessingCheckoutStepProps {
  asset: StaticAsset
  type: 'buy' | 'sell' | 'swap'
  walletAddress: `0x${string}` | undefined
  userTokenRefetch: () => void
}

export default function ProcessingCheckoutOffRampStep({ asset, type, walletAddress, userTokenRefetch }: ProcessingCheckoutStepProps) {
  const theme = useTheme()
  const { t } = useLocaleTranslation()

  const offRampPixKey = useReactiveVar(offRampPixKeyVar)
  const quote = useReactiveVar(quoteVar)
  const { chain: walletChainId } = useAccount()
  const { web3AuthUserInfo } = useConnectedAccount()
  const { switchChain } = useSwitchChain()
  const { name } = chainConfigByChainId(asset.chains[0])

  const address = walletAddress ?? '0x'
  const isWrongNetwork = asset.chains[0] !== walletChainId?.id

  const {
    verifySellToken,
    isLoading: verifySellTokenLoading,
    paymentDetails,
    sendSellTokenLoading,
    awaitTransactionSuccess,
    sendSellTokenTx
  } = useOffRampSell({
    asset
  })

  useEffect(() => {
    if (awaitTransactionSuccess) {
      userTokenRefetch()
    }
  }, [awaitTransactionSuccess, userTokenRefetch])

  const sendAmountToken = quote?.amountToken
  useEffect(() => {
    async function send() {
      if (!address || !offRampPixKey || !sendAmountToken) {
        return
      }
      if (!verifySellTokenLoading) {
        await verifySellToken({ walletAddress: address, pixKey: offRampPixKey, amount: sendAmountToken, tokenSymbol: asset.symbol })
      }
    }
    send()
  }, [address, asset.chains, asset.symbol, sendAmountToken, offRampPixKey, verifySellToken, isWrongNetwork, verifySellTokenLoading])

  const changeNetwork = () => {
    if (isWrongNetwork && switchChain) {
      switchChain({
        chainId: asset.chains[0]
      })
      return
    }
  }

  function verifyNetworkLabel() {
    const changeNetworkLabel = `${t('switch')} ${name.charAt(0).toUpperCase() + name.slice(1)}`

    if (isWrongNetwork && web3AuthUserInfo) {
      return changeNetworkLabel
    }
    if (isWrongNetwork) {
      return <Button small onClick={changeNetwork} label={changeNetworkLabel} disabled={false} icon={<WrongNetworkIcon />} />
    }
    return t('v2.ramp.offRamp.connectedNetwork').replace('[network]', `${name.charAt(0).toUpperCase() + name.slice(1)}`)
  }

  useEffect(() => {
    if (isWrongNetwork) {
      switchChain({ chainId: asset.chains[0] })
    }
  }, [isWrongNetwork, asset.chains, switchChain])
  const spenderAddress = paymentDetails?.bridge?.approvalAddress ?? '0x'

  const {
    allowanceData,
    isLoading: allowanceIsLoading,
    refetch: allowanceRefetch
  } = useAllowance({
    contractAddress: asset.contractAddress,
    userAccountAddress: address,
    spenderAddress,
    chainId: asset.chains[0]
  })

  const {
    approve,
    awaitWalletAction,
    isLoading,
    isSuccess: approveIsSuccess,
    prepareTransactionIsError: approvePrepareTransactionIsError
  } = useApprove({
    accountAddress: address,
    spenderAddress,
    chainId: asset.chains[0],
    contractAddress: asset.contractAddress,
    enabled: !!paymentDetails?.bridge?.approvalAddress && !allowanceData && asset.type === 'erc20'
  })
  const approveIsLoading = isLoading || awaitWalletAction

  useEffect(() => {
    if (approveIsSuccess) {
      allowanceRefetch()
    }
  }, [approveIsSuccess, allowanceRefetch])

  const verifyUserIsApprovedAddress =
    (paymentDetails?.bridge?.approvalAddress && allowanceData && allowanceData > 0) ?? asset.type === 'native'

  function verifyAllowanceLabel() {
    if (verifyUserIsApprovedAddress) {
      return t('v2.ramp.offRamp.unlocked').replace('token', asset.symbol)
    }

    return (
      <Button
        small
        onClick={approve}
        label={t('v2.ramp.offRamp.unlock').replace('token', asset.symbol)}
        disabled={approveIsLoading || approvePrepareTransactionIsError || allowanceIsLoading}
        isLoading={approveIsLoading || allowanceIsLoading}
        icon={<PadlockIcon />}
      />
    )
  }

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {
    const icons = {
      waiting: <LottieAnimation animationData={loadingAnimation} height={32} loop />,
      process: <PiClockLight size={32} color={theme.color.secondary} />,
      success: <LottieAnimation animationData={successAnimation} height={32} />
    }
    return icons[moment]
  }

  const verifyNetworkWalletStep = {
    icon: isWrongNetwork ? getIcon('waiting') : getIcon('success'),
    text: verifyNetworkLabel()
  }

  const verifyAllowanceStep = {
    icon: verifyUserIsApprovedAddress ?? approveIsSuccess ? getIcon('success') : isWrongNetwork ? getIcon('process') : getIcon('waiting'),
    text: verifyAllowanceLabel()
  }

  const sendTransactionStep = {
    icon: verifyUserIsApprovedAddress ? getIcon('waiting') : getIcon('process'),
    text: (
      <Button
        small
        onClick={() => sendAmountToken && sendSellTokenTx(sendAmountToken)}
        label={t('v2.ramp.offRamp.sendToken').replace('token', asset.symbol)}
        disabled={!verifyUserIsApprovedAddress || !paymentDetails}
        isLoading={sendSellTokenLoading}
        icon={<SellTokenIcon />}
      />
    )
  }

  const steps =
    asset.type === 'native'
      ? [verifyNetworkWalletStep, sendTransactionStep]
      : [verifyNetworkWalletStep, verifyAllowanceStep, sendTransactionStep]

  return <WrapProcessingStep asset={asset} validationSteps={steps} title={t('v2.ramp.processingPayment')} type={type} />
}

const { WrongNetworkIcon, PadlockIcon, SellTokenIcon } = {
  WrongNetworkIcon: styled(PiArrowsCounterClockwise)`
    font-size: 16px;
  `,
  PadlockIcon: styled(GiPadlockOpen)`
    font-size: 16px;
  `,
  SellTokenIcon: styled(PiCurrencyDollar)`
    font-size: 16px;
  `
}
