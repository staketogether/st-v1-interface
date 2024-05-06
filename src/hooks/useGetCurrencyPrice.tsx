import { assetsList } from '@/config/product/asset'
import { globalConfig } from '@/config/global'
import { makeVar, useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AssetStats } from '@/types/AssetStats'

export const currencyPriceListVar = makeVar<{ id: string; value: number; price24h: number }[]>([])

export default function useGetCurrencyPrice() {
  const { backendUrl } = globalConfig
  const [loading, setLoading] = useState(true)
  const currencyPriceList = useReactiveVar(currencyPriceListVar)

  useEffect(() => {
    const getDataPromise = async () => {
      try {
        const promises = assetsList.map(asset =>
          axios.get<AssetStats>(
            `${backendUrl}/api/asset-stats/${asset.chains[0]}/${asset.type === 'native' ? asset.wrapperContractAddress : asset.contractAddress}`
          )
        )

        const responses = await Promise.all(promises)

        const responseData = responses.map(response => {
          return {
            id: `${response.data.ref}`,
            value: response.data.market_data.current_price.usd,
            price24h: response.data.market_data.price_change_24h
          }
        })

        currencyPriceListVar(responseData)
        setLoading(false)
      } catch (error) {
        console.error('Error Quotation price:', error)
        setLoading(false)
      }
    }
    getDataPromise()
  }, [backendUrl])

  return { isLoading: loading, currencyPriceList }
}
