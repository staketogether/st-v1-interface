import { ethereumStaking } from '@/config/products/staking'
import useCoinConversion from '@/hooks/useCoinConversion'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { formatNumberByLocale } from '@/services/format'
import { truncateDecimal } from '@/services/truncate'
import { ValidatorsData } from '@/types/Analytics'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiArrowSquareOut } from 'react-icons/pi'
import styled from 'styled-components'

interface AnalyticsValidatorRowProps {
  validator: ValidatorsData
  index: number
}

export default function AnalyticsValidatorRow({ validator, index }: AnalyticsValidatorRowProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const validatorBalance = formatNumberByLocale(truncateDecimal(String(validator.balance) || '0', 2), locale)
  const { priceConvertedValue: validatorBalanceUsdPriceFormatted } = useCoinConversion(
    validatorBalance,
    ethereumStaking.asset.mobula.filterCoinConversion
  )

  return (
    <ValidatorTableRow href={`https://beaconcha.in/validator/${validator.validatorindex}`} target='_blank'>
      <span>{index + 1}</span>
      <span>{`${validator.validatorindex}`}</span>
      <span>
        <span>{`${formatNumberByLocale(truncateDecimal(String(validator.balance), 4), locale)} ${t('eth.symbol')}`}</span>
        <span> {`${validatorBalanceUsdPriceFormatted}`}</span>
      </span>
      <span>{`${validator.effectivenessPercentage.toFixed(2)}%`}</span>
      <span>
        <LinkIcon />
        {t('v2.analytics.validators.viewOnBeaconChain')}
      </span>
    </ValidatorTableRow>
  )
}

const { ValidatorTableRow, LinkIcon } = {
  ValidatorTableRow: styled(Link)`
    padding: 12px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    span {
      &:nth-child(3) {
        display: flex;
        flex-direction: column;
        gap: 4px;
        span {
          color: ${({ theme }) => theme.colorV2.gray[1]};
        }
      }
      &:nth-child(4) {
        color: ${({ theme }) => theme.color.green[500]};
      }
      &:last-child {
        color: ${({ theme }) => theme.colorV2.blue[3]};
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
      }
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 42px;
      display: grid;
      grid-template-columns: 40px 1fr 1fr 1fr 1fr;
      gap: ${({ theme }) => theme.size[12]};
      align-items: center;
      padding: 0px 24px;
    }

    border: 1px solid ${({ theme }) => theme.colorV2.white};

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      * {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }
  `,
  LinkIcon: styled(PiArrowSquareOut)`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.colorV2.blue[3]};
  `
}
