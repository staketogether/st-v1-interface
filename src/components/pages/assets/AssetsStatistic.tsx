import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import styled from 'styled-components'
import { Asset } from '@/types/Asset'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'

interface AssetsStatisticProps {
  asset?: Asset
  assetIsLoading: boolean
}

export default function AssetsStatistic({ asset, assetIsLoading }: AssetsStatisticProps) {
  const { t } = useLocaleTranslation()
  const { handleQuotePrice } = useCoinUsdToUserCurrency()

  return (
    <ProductBodyContainer>
      <h2>{t('v2.ethereumStaking.statistics')}</h2>
      <StatisticContainer>
        <div>
          <span>{t('v2.ethereumStaking.marketCap')}</span>
          {assetIsLoading ? (
            <SkeletonLoading width={170} height={15} />
          ) : (
            <span className='valueItem'>{`${handleQuotePrice(asset?.marketCap ?? 0)}`}</span>
          )}
        </div>
        <div>
          <span>Volume</span>
          {assetIsLoading ? (
            <SkeletonLoading width={170} height={15} />
          ) : (
            <span className='valueItem'>{`${handleQuotePrice(asset?.totalVolume ?? 0)}`}</span>
          )}
        </div>
        <div>
          <span>{t('v2.ethereumStaking.priceChange')}</span>
          {assetIsLoading ? (
            <SkeletonLoading width={170} height={15} />
          ) : (
            <span className='valueItem'>{`${asset?.priceChangePercentage1Y?.toFixed(2)}%`}</span>
          )}
        </div>
      </StatisticContainer>
    </ProductBodyContainer>
  )
}

const { ProductBodyContainer, StatisticContainer } = {
  ProductBodyContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    > h2 {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: ${({ theme }) => theme.font.size[15]};
      line-height: 18px;
      font-weight: 500;
    }

    a,
    span {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.8;
      line-height: 1.5rem;

      &.valueItem {
        font-size: 16px;
        color: ${({ theme }) => theme.colorV2.gray[1]};
        opacity: 1;
      }

      &.copy {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        cursor: pointer;

        img {
          margin-top: 1px;
        }
      }
    }

    a:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  StatisticContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `
}
