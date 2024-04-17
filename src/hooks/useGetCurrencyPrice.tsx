import { makeVar } from '@apollo/client'
import { useEffect } from 'react'
import axios from 'axios'
import { ProductMarketAssetData } from '@/types/ProductStaking'
import { globalConfig } from '@/config/global'
import { mobulaAssets } from '@/config/products/mobula-asset'

export const currencyPriceListVar = makeVar<{ name: string; value: number }[]>([])

export default function useGetCurrencyPrice() {
  const { backendUrl } = globalConfig

  useEffect(() => {
    const getDataPromise = async () => {
      try {
        const promises = mobulaAssets.map(asset =>
          axios.get<ProductMarketAssetData>(`${backendUrl}/api/mobula/market-asset-data`, {
            params: {
              asset: asset.asset ? asset.asset : null,
              blockchain: asset.blockchain ? asset.blockchain : null,
              symbol: asset.symbol ? asset.symbol : null
            }
          })
        )

        const responses = await Promise.all(promises)

        const responseData = responses.map(response => {
          return {
            name: `${response.data.data.name}-${response.config.params.blockchain}`,
            value: response.data.data.price
          }
        })

        currencyPriceListVar(responseData)
      } catch (error) {
        console.error('Error Quotation price:', error)
      }
    }
    getDataPromise()
  }, [backendUrl])
}
