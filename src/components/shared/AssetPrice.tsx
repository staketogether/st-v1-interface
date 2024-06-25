import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useCoinConversion from '@/hooks/useCoinConversion'
import styled from 'styled-components'

interface AssetPriceProps {
  contractAddress?: string
  chainId: number
  className?: string
  showChangePercentage?: boolean
}

export default function AssetPrice({ contractAddress, chainId, className, showChangePercentage = false }: AssetPriceProps) {
  const { priceConvertedValue, loading, priceChangePercentage24h } = useCoinConversion('1', chainId, contractAddress)
  const signalPercentChange24h = priceChangePercentage24h && priceChangePercentage24h > 0 ? '+' : ''
  return loading ? (
    <ContainerLoading>
      {showChangePercentage && <SkeletonLoading width={80} height={24} />}
      <SkeletonLoading width={120} height={22} />
    </ContainerLoading>
  ) : (
    <>
      <span className={className}>{priceConvertedValue}</span>
      {!!(priceChangePercentage24h && showChangePercentage) && (
        <span
          className={priceChangePercentage24h > 0 ? 'price-up' : 'price-down'}
        >{`${signalPercentChange24h}${priceChangePercentage24h.toFixed(2)}%`}</span>
      )}
    </>
  )
}

const { ContainerLoading } = {
  ContainerLoading: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    height: 40px;
  `
}
