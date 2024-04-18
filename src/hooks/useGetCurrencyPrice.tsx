import { globalConfig } from '@/config/global'
import { productAssetList } from '@/config/products/asset'

import { ProductMarketAssetData } from '@/types/ProductStaking'
import { makeVar } from '@apollo/client'
import axios from 'axios'
import { useEffect } from 'react'

export const currencyPriceListVar = makeVar<{ name: string; value: number }[]>([])

export default function useGetCurrencyPrice() {
  const { backendUrl } = globalConfig

  useEffect(() => {
    const getDataPromise = async () => {
      try {
        const promises = productAssetList.map(product =>
          axios.get<ProductMarketAssetData>(`${backendUrl}/api/mobula/market-asset-data`, {
            params: {
              asset: product.mobula.asset ? product.mobula.asset : null,
              blockchain: product.mobula.blockchain ? product.mobula.blockchain : null,
              symbol: product.mobula.symbol ? product.mobula.symbol : null
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
