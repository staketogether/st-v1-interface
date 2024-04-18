import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useCoinConversion from '@/hooks/useCoinConversion'

import { ProductStaking } from '@/types/ProductStaking'
type TokensShowValuePriceProps = {
  product: ProductStaking
  className?: string
}

export default function StakingShowValuePrice({ product, className }: TokensShowValuePriceProps) {
  const { priceConvertedValue, loading } = useCoinConversion('1', product.asset.mobula.filterCoinConversion)
  return loading && !priceConvertedValue ? <SkeletonLoading width={80} /> : <span className={className}>{priceConvertedValue}</span>
}
