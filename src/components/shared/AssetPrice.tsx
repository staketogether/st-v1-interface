import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useCoinConversion from '@/hooks/useCoinConversion'
import { Asset } from '@/types/Asset'
import styled from 'styled-components'

interface AssetPriceProps {
  asset: Asset
  className?: string
  showChangePercentage?: boolean
}

export default function AssetPrice({ asset, className, showChangePercentage = false }: AssetPriceProps) {
  const assetId = asset.type === 'bitcoin' ? asset.assetId : asset.contractAddress
  const { priceConvertedValue, loading, priceChangePercentage24h } = useCoinConversion('1', asset.chains[0], assetId)

  const signalPercentChange24h = priceChangePercentage24h && priceChangePercentage24h > 0 ? '+' : ''
  return loading ? (
    <ContainerLoading>
      {showChangePercentage && <SkeletonLoading width={80} height={30} />}
      <SkeletonLoading width={80} height={25} />
    </ContainerLoading>
  ) : (
    <>
      <span className={className}>{priceConvertedValue}</span>
      {priceChangePercentage24h && showChangePercentage && (
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
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `
}
