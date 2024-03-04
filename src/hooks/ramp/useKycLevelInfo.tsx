import { useEffect } from 'react'
import useSWR from 'swr'
import { kycLevelVar } from './useControlModal'

export interface KycLevelInfo {
  level: number
  limits: {
    limitBurn: number
    limitMint: number
    limitSwapBuy: number
    limitSwapSell: number
  }
}

export default function useKycLevelInfo(provider: 'brla' | 'transak', taxId?: string) {
  const { data, error, isLoading } = useSWR<KycLevelInfo>(taxId && `api/ramp/kyc/${provider}/${taxId}/info`)

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
