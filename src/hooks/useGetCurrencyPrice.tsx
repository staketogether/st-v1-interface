import { assetsList } from '@/config/asset'
import { globalConfig } from '@/config/global'
import { makeVar } from '@apollo/client'
import axios from 'axios'
import { useEffect } from 'react'

export const currencyPriceListVar = makeVar<{ name: string; value: number }[]>([])

export default function useGetCurrencyPrice() {
  const { backendUrl } = globalConfig

  useEffect(() => {
    const getDataPromise = async () => {
      try {
        const promises = assetsList.map(asset =>
          axios.get(`${backendUrl}/api/mobula/market-asset-data`, {
            params: {
              asset: asset.mobula.asset ? asset.mobula.asset : null,
              blockchain: asset.mobula.blockchain ? asset.mobula.blockchain : null,
              symbol: asset.mobula.symbol ? asset.mobula.symbol : null
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
