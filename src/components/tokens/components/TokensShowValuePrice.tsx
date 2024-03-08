import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import useGetAssetData from '@/hooks/useGetAssetData'
import { Product } from '@/types/Product'
import React from 'react'
type TokensShowValuePriceProps = {
  product: Product
}

export default function TokensShowValuePrice({ product }: TokensShowValuePriceProps) {
  const { handleQuotePrice } = useCoinUsdToUserCurrency()
  const { assetData } = useGetAssetData(product.getMobulaAssetData)
  return <span>{`${handleQuotePrice(assetData?.price || 0)}`}</span>
}
