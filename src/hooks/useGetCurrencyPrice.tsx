import { makeVar } from '@apollo/client'
import { useEffect } from 'react'
import useGetAssetData from './useGetAssetData'

export const currencyPriceVar = makeVar(0)

export default function useGetCurrencyPrice() {


  const { assetData } = useGetAssetData({ asset: 'Ethereum', blockchain: 'ethereum', symbol: 'eth' })

  useEffect(() => {
    currencyPriceVar(assetData?.price ?? 0)

  }, [assetData?.price])
}
