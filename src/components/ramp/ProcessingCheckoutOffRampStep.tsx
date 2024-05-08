import { offRampPixKeyVar, quoteVar } from '@/hooks/ramp/useRampControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { useReactiveVar } from '@apollo/client'
import { PiArrowsCounterClockwise, PiClockLight } from 'react-icons/pi'
import styled, { useTheme } from 'styled-components'
import WrapProcessingStep from './WrapProcessingStep'
import loadingAnimation from '@assets/animations/loading-animation.json'
import LottieAnimation from '../shared/LottieAnimation'
import { useEffect } from 'react'
import useOffRampSell from '@/hooks/ramp/useOffRampSell'
import { ProviderType } from '@/types/provider.type'
import { useAccount, useSwitchChain } from 'wagmi'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import Button from '../shared/Button'
import { chainConfigByChainId } from '@/config/chain'
import successAnimation from '@assets/animations/success-animation.json'
interface ProcessingCheckoutStepProps {
  asset: Asset
  type: 'buy' | 'sell' | 'swap'
  walletAddress: `0x${string}` | undefined
}

export default function ProcessingCheckoutOffRampStep({ asset, type, walletAddress }: ProcessingCheckoutStepProps) {
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

  const { sendSellToken } = useOffRampSell({
    asset
  })

  const getIcon = (moment: 'waiting' | 'process' | 'success') => {
    const icons = {
      waiting: <LottieAnimation animationData={loadingAnimation} height={32} loop />,
      process: <PiClockLight size={32} color={theme.color.secondary} />,
      success: <LottieAnimation animationData={successAnimation} height={32} />
    }
    return icons[moment]
  }

  const openStakeConfirmation = () => {
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
      return <Button small onClick={openStakeConfirmation} label={changeNetworkLabel} disabled={false} icon={<WrongNetworkIcon />} />
    }
    return 'verified wallet network '
  }

  useEffect(() => {
    if (isWrongNetwork) {
      switchChain({ chainId: asset.chains[0] })
    }
  }, [isWrongNetwork, asset.chains, switchChain])

  useEffect(() => {
    async function send() {
      if (isWrongNetwork) {
        return
      }
      if (!address || !offRampPixKey || !quote?.amountToken) {
        return
      }
      await sendSellToken({ walletAddress: address, pixKey: offRampPixKey, amount: quote?.amountToken, tokenSymbol: asset.symbol })
    }
    send()
  }, [address, asset.chains, asset.symbol, quote?.amountToken, offRampPixKey, sendSellToken, isWrongNetwork])

  const validationSteps = [
    {
      icon: isWrongNetwork ? getIcon('waiting') : getIcon('success'),
      text: verifyNetworkLabel()
    },
    {
      icon: isWrongNetwork ? getIcon('process') : getIcon('waiting'),
      text: t('v2.ramp.processingPayment')
    }
  ]

  return <WrapProcessingStep asset={asset} validationSteps={validationSteps} title={t('v2.ramp.processingPayment')} type={type} />
}

const { WrongNetworkIcon } = {
  WrongNetworkIcon: styled(PiArrowsCounterClockwise)`
    font-size: 16px;
  `
}
