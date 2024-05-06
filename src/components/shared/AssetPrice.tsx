import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useCoinConversion from '@/hooks/useCoinConversion'
import { Asset } from '@/types/Asset'

interface AssetPriceProps {
  asset: Asset
  className?: string
}

export default function AssetPrice({ asset, className }: AssetPriceProps) {
  const contractAddress = asset.type === 'native' ? asset.wrapperContractAddress : asset.contractAddress
  const { priceConvertedValue, loading } = useCoinConversion('1', asset.chains[0], contractAddress)
  return loading ? <SkeletonLoading width={80} /> : <span className={className}>{priceConvertedValue}</span>
}
