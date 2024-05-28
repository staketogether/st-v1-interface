import Button from '@/components/shared/Button'
import { RampSteps, amountToQuoteVar, quoteVar, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import useKycLevelInfo from '@/hooks/ramp/useKycLevelInfo'
import useQuoteOffRamp from '@/hooks/ramp/useQuoteOffRamp'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { PaymentMethodType } from '@/types/payment-method.type'
import { ProviderType } from '@/types/provider.type'
import brlBrla from '@assets/icons/brl-brla.svg'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowDown, PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import AssetInput from '../assets/AssetsInput'
import { TokenBalance } from '@/hooks/contracts/useBalanceOf'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import AlertMessageComponent from '../shared/AlertMessageComponent'
import { chainConfigByChainId } from '@/config/chain'

interface QuotationOffRampStepProps {
  asset: Asset
  userTokenBalance: TokenBalance
  userTokenIsLoading: boolean
}

export default function QuotationOffRampStep({ asset: asset, userTokenBalance, userTokenIsLoading }: QuotationOffRampStepProps) {
  const [value, setValue] = useState<string>('0')

  const amountDebounceValue = useDebounce(value, 300)
  const [chainId] = asset.chains
  const { t } = useLocaleTranslation()

  const { quote, isLoading } = useQuoteOffRamp({
    amount: amountDebounceValue,
    chainId,
    provider: ProviderType.brla,
    paymentMethod: PaymentMethodType.pix,
    includeMarkup: true,
    tokenSymbol: asset.symbol
  })
  useEffect(() => {
    if (!quote) {
      return
    }

    quoteVar({
      ...quote,
      amountToken: amountDebounceValue
    })
  }, [quote, amountDebounceValue])

  const { address: userWalletAddress } = useAccount()
  const { kycLevelInfo } = useKycLevelInfo('brla', userWalletAddress)

  const limit = Number(amountDebounceValue) >= Number(kycLevelInfo?.limits.limitSwapSell ?? 0)
  const errorLimitReached = limit && !!kycLevelInfo?.limits.limitSwapSell
  const errorMaxSellValue = !(Number(userTokenBalance.balance) >= Number(amountDebounceValue))
  const disabledButton = errorLimitReached || errorMaxSellValue || !Number(value) || isLoading

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
    if (!userWalletAddress) {
      rampStepControlVar(RampSteps.ConnectWallet)
      return
    }

    if (!kycLevelInfo?.level) {
      rampStepControlVar(RampSteps.Kyc)
      return
    }

    rampStepControlVar(RampSteps.ProcessingKyc)
  }, [userWalletAddress, kycLevelInfo?.level])

  const handleLabelButton = () => {
    if (errorLimitReached) {
      return `${t('v2.stake.depositErrorMessage.DepositLimitReached')}`
    }

    if (errorMaxSellValue) {
      return 'Invalid amount'
    }

    return t('next')
  }

  useFacebookPixel(`offramp-quotation:${asset.id}`, !!quote, {
    amountToken: parseFloat(quote?.amountToken ?? '0'),
    amountFiat: parseFloat(quote?.amountBrl ?? '0'),
    method: 'PIX',
    assetId: asset.id
  })
  const { name } = chainConfigByChainId(asset.chains[0])
  return (
    <Container>
      <BoxValuesContainer>
        <AssetInput
          ethAmountValue={String(value)}
          onChange={v => {
            handleChange(v)
          }}
          onMaxFunction={() => setValue(userTokenBalance.balance)}
          productAsset={asset}
          hasError={false}
          balance={userTokenBalance.balance}
          balanceLoading={userTokenIsLoading}
          accountIsConnected={!!userWalletAddress}
        />

        <ArrowDown />
        <InputContainer className={`${errorLimitReached ? 'error' : ''}`}>
          <div>
            <Image src={brlBrla} width={36} height={24} alt='BRL' />
            <span>BRL</span>
          </div>
          {isLoading ? (
            <SkeletonLoading width={120} />
          ) : (
            <input type='number' disabled value={quote?.amountBrl} min={0} placeholder='0' step={1} />
          )}
        </InputContainer>
      </BoxValuesContainer>
      <Button
        onClick={handleNext}
        disabled={disabledButton}
        label={handleLabelButton()}
        icon={!errorLimitReached && !errorMaxSellValue && <PiArrowRight />}
      />
      <AlertMessageComponent message={t('v2.ramp.offRamp.alertMessage').replace('[network]', name)} />
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
