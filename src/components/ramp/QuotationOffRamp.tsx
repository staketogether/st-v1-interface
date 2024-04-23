import QuotationStepEthAmount from '@/components/ramp/QuotationStepEthAmount'
import Button from '@/components/shared/Button'
import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import { BrlaBuyEthStep, fiatAmountVar, quoteVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import useQuoteRamp from '@/hooks/ramp/useQuote'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateDecimal } from '@/services/truncate'
import { Asset } from '@/types/Asset'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import brlBrla from '@assets/icons/brl-brla.svg'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowDown, PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import AssetInput from '../assets/AssetsInput'
import { KycLevel } from './KycLevel'

interface QuotationOffRampStepProps {
  product: Asset
}

export default function QuotationOffRampStep({ product }: QuotationOffRampStepProps) {
  const fiatAmount = useReactiveVar(fiatAmountVar)
  const [value, setValue] = useState<number | string>(0)
  console.log({
    value,
    fiatAmount
  })
  const debounceValue = useDebounce(ethers.parseUnits(`${value}`, product.decimals), 300)
  const { account } = useConnectedAccount()
  const minDeposit = product.ramp[0].minDeposit
  const { balance: ethBalance, isLoading: ethBalanceLoading } = useEthBalanceOf({
    walletAddress: account,
    chainId: product.chains[0],
    token: product.contractAddress
  })
  const { quote, isValidating: quoteIsValidating } = useQuoteRamp(
    'brl',
    debounceValue.toString(),
    product.ramp[0].bridge?.fromChainId ?? product.ramp[0].chainId,
    1,
    ProviderType.brla,
    PaymentMethodType.pix,
    `${product.ramp[0].bridge?.toChainId}`,
    product.ramp[0].bridge?.toToken,
    true
  )

  const { address } = useAccount()
  const { kycLevelInfo } = useKycLevelInfo('brla', address)
  const { t } = useLocaleTranslation()
  const limit = Number(debounceValue) * 100 >= Number(kycLevelInfo?.limits.limitSwapBuy ?? 0)
  const error = limit && !!kycLevelInfo?.limits.limitSwapBuy
  const errorMinValue = debounceValue
  const handleChange = (v: string) => {
    if (v.includes(',')) {
      v = v.replace(',', '.')
    }
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!v || regex.test(v)) {
      if (v.length > 19 + v.split('.')[0].length) return

      const newValue = ethers.parseUnits(v, product.decimals).toString()
      console.log({
        v,
        newValue
      })
      setValue(v)
      fiatAmountVar(v)
    }
  }

  const handleNext = useCallback(() => {
    if (!address) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ConnectWallet)
      return
    }

    if (!kycLevelInfo?.level) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.Kyc)
      return
    }

    stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
  }, [address, kycLevelInfo?.level])

  const handleLabelButton = () => {
    if (error) {
      return `${t('v2.stake.depositErrorMessage.DepositLimitReached')}`
    }

    // if (BigInt(debounceValue) < minDeposit) {
    //   return `${t('v2.stake.minAmount')} R$${minDeposit}`
    // }

    return t('next')
  }

  useEffect(() => {
    if (!quote) {
      return
    }
    quoteVar({
      ...quote,
      amountToken: truncateDecimal(quote?.amountToken)
    })
  }, [quote])

  useFacebookPixel(`offramp-quotation:${product.id}`, !!quote, {
    amountToken: parseFloat(quote?.amountToken ?? '0'),
    amountFiat: parseFloat(quote?.amountBrl ?? '0'),
    method: 'PIX',
    assetId: product.id
  })
  return (
    <Container>
      <KycLevel amountValue={Number(debounceValue)} />
      <BoxValuesContainer>
        <AssetInput
          ethAmountValue={String(value)}
          onChange={v => {
            handleChange(v)
          }}
          productAsset={product}
          hasError={false}
          balance={ethBalance}
          balanceLoading={ethBalanceLoading}
        />

        <ArrowDown />
        <InputContainer className={`${error ? 'error' : ''}`}>
          <div>
            <Image src={brlBrla} width={36} height={24} alt='BRL' />
            <span>BRL</span>
          </div>
          <input type='number' disabled value={quote?.amountBrl} min={0} placeholder='0' step={1} />
        </InputContainer>
      </BoxValuesContainer>
      <QuotationStepEthAmount product={product} />
      <Button
        onClick={handleNext}
        disabled={false}
        label={handleLabelButton()}
        icon={!error && !errorMinValue && <PiArrowRight />}
      />
      <footer>
        {t('v2.ramp.quote.terms')} <a href='#'>{t('v2.ramp.quote.policies')}.</a>
      </footer>
    </Container>
  )
}

const { Container, InputContainer, ArrowDown, BoxValuesContainer } = {
  Container: styled.div`
    width: auto;
    color: ${({ theme }) => theme.colorV2.gray[1]};

    > header {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }

    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[24]};

    > footer {
      font-size: 13px;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.6;
      text-align: center;
    }
  `,
  BoxValuesContainer: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
  `,
  InputContainer: styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[16]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    font-weight: 500;

    border: 1px solid transparent;

    &.error {
      border: 1px solid ${({ theme }) => theme.color.red[300]};
    }

    > div {
      font-size: ${({ theme }) => theme.font.size[15]};
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    input {
      width: 50%;
      border: 0;
      background: transparent;
      font-size: ${({ theme }) => theme.font.size[22]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      text-align: right;
      &:focus {
        outline: none;
      }
    }
  `,
  ArrowDown: styled(PiArrowDown)`
    font-size: ${({ theme }) => theme.font.size[24]};
  `
}
