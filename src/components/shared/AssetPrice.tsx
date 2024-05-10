import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useCoinConversion from '@/hooks/useCoinConversion'
import { Asset } from '@/types/Asset'

interface AssetPriceProps {
  asset: Asset
  className?: string
}

export default function AssetPrice({ asset, className }: AssetPriceProps) {

  const { priceConvertedValue, loading, priceChangePercentage24h } = useCoinConversion('1', asset.chains[0], asset.contractAddress)
  const signalPercentChange24h = priceChangePercentage24h && priceChangePercentage24h > 0 ? '+' : ''
  return loading ? <SkeletonLoading width={64} /> : <>
    <span className={className}>{priceConvertedValue}</span>
    {priceChangePercentage24h && <span className={priceChangePercentage24h > 0 ? 'price-up' : 'price-down'}>{`${signalPercentChange24h}${priceChangePercentage24h.toFixed(2)}%`}</span >}
  </>
}
