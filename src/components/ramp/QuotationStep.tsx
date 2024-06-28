import AssetIcon from '@/components/shared/AssetIcon'
import Button from '@/components/shared/Button'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import useQuoteRamp from '@/hooks/ramp/useQuote'
import { RampSteps, amountToQuoteVar, quoteVar, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateDecimal } from '@/services/truncate'
import { Asset } from '@/types/Asset'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import { useReactiveVar } from '@apollo/client'
import brlBrla from '@assets/icons/brl-brla.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import AssetNetworkSwitch, { Network } from '../pages/assets/AssetsNetworkSwitch'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

interface QuotationStepProps {
  asset?: Asset
  chainId: number
}

export default function QuotationStep({ asset, chainId }: QuotationStepProps) {
  const router = useRouter()

  const amountToQuote = useReactiveVar(amountToQuoteVar)
  const [value, setValue] = useState<string>(amountToQuote ?? '0')
  const debounceValue = useDebounce(value, 300)
  const minDeposit = 10

  const { quote, isValidating: quoteIsValidating } = useQuoteRamp(
    'brl',
    debounceValue ? Number(debounceValue) : 0,
    asset?.bridge?.chainId ?? chainId,
    asset?.isFanToken,
    ProviderType.brla,
    PaymentMethodType.pix,
    asset?.bridge?.chainId ? chainId.toString() : undefined,
    asset?.bridge?.contractAddress ?? asset?.symbol,
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
      if (asset?.isFanToken) {
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

  useFacebookPixel(
    `onramp-quotation:${asset?.networks.find(network => network.chainId === chainId)?.contractAddress}`,
    quote?.amountToken !== undefined,
    {
      amountFiat: Number(debounceValue),
      amountToken: String(quote?.amountToken),
      assetId: `${asset?.networks.find(network => network.chainId === chainId)?.contractAddress}`
    }
  )

  const onNetworkChange = useCallback(
    (network: Network) => {
      router.query.network = network.name.toLowerCase()
      router.query.product = network.contractAddress
      router.push(router)
    },
    [router]
  )

  return (
    <Container>
      <BoxValuesContainer>
        <AssetNetworkSwitch chainId={chainId} networks={asset?.networks ?? []} title='Rede de recebimento' onChange={onNetworkChange} />
        <InputContainer className={`${error ? 'error' : ''}`}>
          {asset?.isFanToken && <span>{t('v3.assetDetail.quantity')}</span>}
          {!asset?.isFanToken && <span>{t('v3.assetDetail.totalAmount')}</span>}
          <div>
            {!asset?.isFanToken && (
              <div>
                <Image src={brlBrla} width={36} height={24} alt='BRL' />
                <span>BRL</span>
              </div>
            )}
            {asset?.isFanToken && (
              <div>
                <AssetIcon marginRight='8px' image={asset.imageUrl} chain={chainId} size={24} altName={asset?.symbol} />
                <span>{asset.symbol}</span>
              </div>
            )}
            {!asset?.isFanToken && (
              <Input type='number' onChange={({ target }) => handleChange(target.value)} value={value} min={0} placeholder='0' step={1} />
            )}
            {asset?.isFanToken && (
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
          {!asset?.isFanToken && <span>{t('v3.assetDetail.quantity')}</span>}
          {asset?.isFanToken && <span>{t('v3.assetDetail.totalAmount')}</span>}
          <div>
            {!asset?.isFanToken && (
              <div>
                <AssetIcon marginRight='8px' image={asset?.imageUrl} chain={chainId} size={24} altName={asset?.symbol} />
                <span>{asset?.symbol}</span>
              </div>
            )}
            {asset?.isFanToken && (
              <div>
                <Image src={brlBrla} width={36} height={24} alt='BRL' />
                <span>BRL</span>
              </div>
            )}
            {quoteIsValidating && <SkeletonLoading width={60} height={20} />}
            {!quoteIsValidating && !asset?.isFanToken && (
              <Input value={truncateDecimal(quote?.amountToken ?? '0')} disabled placeholder='0' />
            )}
            {!quoteIsValidating && asset?.isFanToken && <Input value={truncateDecimal(quote?.amountBrl ?? '0')} disabled placeholder='0' />}
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
