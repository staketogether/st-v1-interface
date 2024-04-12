import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import useGetAssetData from '@/hooks/useGetAssetData'
import { ProductAsset } from '@/types/ProductAsset'
import { ProductStaking } from '@/types/ProductStaking'
type TokensShowValuePriceProps = {
  product: ProductStaking | ProductAsset
}

export default function TokensShowValuePrice({ product }: TokensShowValuePriceProps) {
  const { handleQuotePrice } = useCoinUsdToUserCurrency()
  const { assetData, isLoading } = useGetAssetData(product.getMobulaAssetData)
  return isLoading && !assetData?.price ? (
    <SkeletonLoading width={80} />
  ) : (
    <span>{`${handleQuotePrice(assetData?.price || 0)}`}</span>
  )
}
