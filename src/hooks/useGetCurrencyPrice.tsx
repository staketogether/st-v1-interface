import { globalConfig } from '@/config/global'
import { assetsList } from '@/config/product/asset'
import { AssetStats } from '@/types/AssetStats'
import { makeVar, useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const currencyPriceListVar = makeVar<{ id: string; value: number; price24h: number, priceChangePercentage24h: number }[]>([])

export default function useGetCurrencyPrice() {
  const { backendUrl } = globalConfig
  const [loading, setLoading] = useState(true)
  const currencyPriceList = useReactiveVar(currencyPriceListVar)

  useEffect(() => {
    const getDataPromise = async () => {
      try {
        const promises = assetsList.map(asset =>
          axios.get<AssetStats>(
            `${backendUrl}/api/asset-stats/${asset.chains[0]}/${asset.contractAddress}`
          )
        )

        const responses = await Promise.all(promises)

        const responseData = responses.map(response => {
          return {
            id: `${response.data.ref}`,
            value: response.data.marketCapUsd,
            price24h: response.data.priceChange24h,
            priceChangePercentage24h: response.data.priceChangePercentage24h
          }
        })
        currencyPriceListVar(responseData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getDataPromise()
  }, [backendUrl])

  return { isLoading: loading, currencyPriceList }
}
