import { assetsList } from '@/config/product/asset'
import { globalConfig } from '@/config/global'
import { MobulaMarketAssetResponse } from '@/types/mobula-market-asset'
import { makeVar } from '@apollo/client'
import axios from 'axios'
import { useEffect } from 'react'

export const currencyPriceListVar = makeVar<{ name: string; value: number, price24h: number }[]>([])

export default function useGetCurrencyPrice() {
  const { backendUrl } = globalConfig

  useEffect(() => {
    const getDataPromise = async () => {
      try {
        const promises = assetsList.map(asset =>
          axios.get<MobulaMarketAssetResponse>(`${backendUrl}/api/mobula/market-asset-data`, {
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
            value: response.data.data.price,
            price24h: response.data.data.price_change_24h

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
