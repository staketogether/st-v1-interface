import { globalConfig } from '@/config/global'
import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import { BrlaBuyEthStep, changeWalletAddress, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'
import { SWRConfig } from 'swr'
import { useAccount } from 'wagmi'
import CheckoutStep from '../ramp/CheckoutStep'
import GenericErrorComponent from '../ramp/GenericErrorComponent'
import KycStep from '../ramp/KycStep'
import PaymentMethod from '../ramp/PaymentMethod'
import ProcessingCheckoutStep from '../ramp/ProcessingCheckoutStep'
import ProcessingKycStep from '../ramp/ProcessingKycStep'
import QuotationOffRampStep from '../ramp/QuotationOffRamp'
import QuotationStep from '../ramp/QuotationStep'
import SuccessStep from '../ramp/SuccessStep'
import { TimeOutCheckout } from '../ramp/TimeOutCheckout'
import ConnectWallet from '../shared/ConnectWallet'
import { Asset } from '@/types/Asset'

export default function AssetsBuyControl({ asset }: { type: 'sell' | 'buy'; asset: Asset }) {
  const { t } = useLocaleTranslation()
  const { address } = useAccount()
  const { refetch } = useEthBalanceOf({ walletAddress: address, chainId: 1 })

  const steps = {
    MethodPayment: <PaymentMethod asset={asset} />,
    Quotation: <QuotationStep product={asset} />,
    QuotationOffRamp: <QuotationOffRampStep product={asset} />,
    Kyc: <KycStep asset={asset} />,
    ConnectWallet: <ConnectWallet useModal />,
    ProcessingKyc: <ProcessingKycStep product={asset} />,
    ProcessingCheckoutStep: <ProcessingCheckoutStep product={asset} />,
    Checkout: <CheckoutStep asset={asset} />,
    TimeOutCheckout: <TimeOutCheckout asset={asset} />,
    Success: <SuccessStep product={asset} />,
    error: <GenericErrorComponent />
  }

  const currentStep = useReactiveVar(stepsControlBuyCryptoVar)

  const titleList: Record<string, string> = {
    Success: t('v2.ramp.success'),
    MethodPayment: t('v2.ramp.provider')
  }
  const title = currentStep in titleList && titleList[currentStep]
  const { backendUrl } = globalConfig

  useEffect(() => {
    if (address && currentStep === BrlaBuyEthStep.ConnectWallet) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
      return
    }

    if (address && currentStep === BrlaBuyEthStep.Success) {
      refetch()
      return
    }
  }, [address, currentStep, refetch])

  useEffect(() => {
    if (address) {
      changeWalletAddress()
    }
  }, [address])

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnMount: true,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        errorRetryCount: 100,
        shouldRetryOnError: true,
        fetcher: (uri: string) =>
          axios.get(`${backendUrl}/${uri}`).then(res => {
            return res.data as string
          })
      }}
    >
      <Container>
        {title && <h2>{title}</h2>}
        {steps[currentStep]}
      </Container>
    </SWRConfig>
  )
}

const { Container } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    h2 {
      text-align: center;
      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `
}
