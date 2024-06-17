import AssetIcon from '@/components/shared/AssetIcon'
import Button from '@/components/shared/Button'
import { RampSteps, amountToQuoteVar, quoteVar, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateDecimal } from '@/services/truncate'
import { Asset } from '@/types/Asset'
import { PaymentMethodType } from '@/types/payment-method.type'
import { RampProviderType } from '@/types/rampProviderType'
import { useReactiveVar } from '@apollo/client'
import brlBrla from '@assets/icons/brl-brla.svg'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import useQuoteRamp from '@/hooks/ramp/useQuote'

interface QuotationStepProps {
  asset: Asset
}

export default function QuotationStep({ asset }: QuotationStepProps) {
  const amountToQuote = useReactiveVar(amountToQuoteVar)
  const [value, setValue] = useState<string>(amountToQuote ?? '0')
  const debounceValue = useDebounce(value, 300)
  const minDeposit = asset.ramp[0].minDeposit

  const { quote, isValidating: quoteIsValidating } = useQuoteRamp(
    'brl',
    debounceValue ? Number(debounceValue) : 0,
    asset.ramp[0].bridge?.fromChainId ?? asset.ramp[0].chainId,
    asset.type === 'fan-token',
    RampProviderType.brla,
    PaymentMethodType.pix,
    asset.ramp[0].bridge?.toChainId.toString(),
    asset.ramp[0].bridge?.toToken ?? asset.symbol,
    true
  )

  const { address } = useAccount()
  const { kycLevelInfo } = useKycLevelInfo('brla', address)
  const { t } = useLocaleTranslation()

  const limit = Number(debounceValue) * 100 >= Number(kycLevelInfo?.limits?.limitSwapBuy ?? 0)
  const error = limit && !!kycLevelInfo?.limits?.limitSwapBuy
  const errorMinValue = Number(debounceValue) < minDeposit

  const handleChange = (v: string) => {
    if (v.includes(',')) {
      v = v.replace(',', '.')
    }

    const regex = /^(\d+(\.\d*)?|\.\d+)$/

    if (!v || regex.test(v)) {
      if (v.length > 19 + v.split('.')[0].length) return

      setValue(v)
      amountToQuoteVar(v)
    }
  }

  const handleNext = useCallback(() => {
    if (!address) {
      rampStepControlVar(RampSteps.ConnectWallet)
      return
    }

    if (!kycLevelInfo?.level) {
      rampStepControlVar(RampSteps.Kyc)
      return
    }

    rampStepControlVar(RampSteps.ProcessingKyc)
  }, [address, kycLevelInfo?.level])

  const handleLabelButton = () => {
    if (error) {
      return `${t('v2.stake.depositErrorMessage.DepositLimitReached')}`
    }

    if (errorMinValue) {
      if (asset.type === 'fan-token') {
        return `${t('v2.stake.minTokenAmount')} ${minDeposit} ${asset.symbol}`
      }

      return `${t('v2.stake.minAmount')} ${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'brl'
      }).format(minDeposit)}`
    }

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

  useFacebookPixel(`onramp-quotation:${asset.id}`, quote?.amountToken !== undefined, {
    amountFiat: Number(debounceValue),
    amountToken: String(quote?.amountToken),
    assetId: asset.id
  })

  return (
    <Container>
      <BoxValuesContainer>
        <InputContainer className={`${error ? 'error' : ''}`}>
          {asset.type === 'fan-token' && <span>{t('v3.assetDetail.quantity')}</span>}
          {asset.type !== 'fan-token' && <span>{t('v3.assetDetail.totalAmount')}</span>}
          <div>
            {asset.type !== 'fan-token' && (
              <div>
                <Image src={brlBrla} width={36} height={24} alt='BRL' />
                <span>BRL</span>
              </div>
            )}
            {asset.type === 'fan-token' && (
              <div>
                <AssetIcon marginRight='8px' image={asset.symbolImage} chain={asset.chains[0]} size={24} altName={asset.symbol} />
                <span>{asset.symbol}</span>
              </div>
            )}
            {asset.type !== 'fan-token' && (
              <Input type='number' onChange={({ target }) => handleChange(target.value)} value={value} min={0} placeholder='0' step={1} />
            )}
            {asset.type === 'fan-token' && (
              <Input
                type='number'
                onChange={({ target }) => handleChange(parseInt(target.value.toString(), 10).toString())}
                value={value}
                min={0}
                placeholder='0'
                step={1}
              />
            )}
          </div>
        </InputContainer>
        <InputContainer disabled>
          {asset.type !== 'fan-token' && <span>{t('v3.assetDetail.quantity')}</span>}
          {asset.type === 'fan-token' && <span>{t('v3.assetDetail.totalAmount')}</span>}
          <div>
            {asset.type !== 'fan-token' && (
              <div>
                <AssetIcon marginRight='8px' image={asset.symbolImage} chain={asset.chains[0]} size={24} altName={asset.symbol} />
                <span>{asset.symbol}</span>
              </div>
            )}
            {asset.type === 'fan-token' && (
              <div>
                <Image src={brlBrla} width={36} height={24} alt='BRL' />
                <span>BRL</span>
              </div>
            )}
            {quoteIsValidating && <SkeletonLoading width={60} height={20} />}
            {!quoteIsValidating && asset.type !== 'fan-token' && (
              <Input value={truncateDecimal(quote?.amountToken ?? '0')} disabled placeholder='0' />
            )}
            {!quoteIsValidating && asset.type === 'fan-token' && (
              <Input value={truncateDecimal(quote?.amountBrl ?? '0')} disabled placeholder='0' />
            )}
          </div>
        </InputContainer>
      </BoxValuesContainer>
      <Button
        onClick={handleNext}
        disabled={errorMinValue || error || quoteIsValidating || !quote?.amountBrl}
        label={handleLabelButton()}
        icon={!error && !errorMinValue && <PiArrowRight />}
      />
      <footer>
        {t('v2.ramp.quote.terms')} <a href='#'>{t('v2.ramp.quote.policies')}.</a>
      </footer>
    </Container>
  )
}

const { Container, InputContainer, BoxValuesContainer, Input } = {
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
    gap: ${({ theme }) => theme.size[24]};
    align-items: center;
  `,
  InputContainer: styled.div<{ disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    width: 100%;

    > span {
      color: ${({ theme }) => theme.colorV2.gray[6]};
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }

    > div {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[16]};

      border-radius: ${({ theme }) => theme.size[8]};
      padding: ${({ theme }) => theme.size[8]};
      border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
      background: ${({ theme }) => theme.colorV2.white};

      ${({ disabled, theme }) =>
        disabled &&
        `
            background: ${theme.colorV2.gray[2]};
            box-shadow: ${theme.shadow[100]};
            border: 1px solid transparent;
          `}

      font-weight: 500;

      &.error {
        border: 1px solid ${({ theme }) => theme.color.red[300]};
      }

      > div {
        font-size: ${({ theme }) => theme.font.size[15]};
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
  `,
  Input: styled.input<{ disabled?: boolean }>`
    width: 50%;
    border-radius: 8px;
    background: transparent;
    border: 0;
    font-size: ${({ theme }) => theme.font.size[22]};
    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    text-align: right;

    &:focus {
      outline: none;
    }
  `
}
