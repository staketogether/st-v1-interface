import { useEffect } from 'react'
import useSWR from 'swr'
import { kycLevelVar } from './useRampControlModal'

export interface KycLevelInfo {
  level: number
  limits: {
    limitBurn: number
    limitMint: number
    limitSwapBuy: number
    limitSwapSell: number
  }
}

export default function useKycLevelInfo(provider: 'brla' | 'transak', taxId?: string, refreshInterval = false) {
  const { data, error, isLoading } = useSWR<KycLevelInfo>(taxId && `api/ramp/kyc/${provider}/${taxId}/info`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: refreshInterval ? 5000 : 0
  })

  useEffect(() => {
    if (data) {
      kycLevelVar(data)
    }
  }, [data])

  return {
    kycLevelInfo: data,
    isLoading,
    isError: error
  }
}
