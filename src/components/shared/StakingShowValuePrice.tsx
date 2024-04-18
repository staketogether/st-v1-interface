import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useCoinConversion from '@/hooks/useCoinConversion'
import { ProductAsset } from '@/types/ProductAsset'

import { ProductStaking } from '@/types/ProductStaking'
interface TokensShowValuePriceProps {
  product: ProductStaking | ProductAsset
  type: 'staking' | 'assets'
  className?: string
}

export default function StakingShowValuePrice({ product, className, type }: TokensShowValuePriceProps) {
  const mobulaFilterCoinConversion =
    type === 'staking'
      ? (product as ProductStaking).asset.mobula.filterCoinConversion
      : (product as ProductAsset).mobula.filterCoinConversion

  const { priceConvertedValue, loading } = useCoinConversion('1', mobulaFilterCoinConversion)
  return loading && !priceConvertedValue ? <SkeletonLoading width={80} /> : <span className={className}>{priceConvertedValue}</span>
}
