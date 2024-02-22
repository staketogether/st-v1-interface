import useSWR from 'swr'

interface KycLevelInfo {
  level: number
  limits: {
    limitBurn: number
    limitMint: number
    limitSwapBuy: number
    limitSwapSell: number
  }
}

export default function useKycLevelInfo(provider: 'brla' | 'transak', taxId?: string) {
  const { data, error } = useSWR<KycLevelInfo>(taxId && `api/ramp/kyc/${provider}/${taxId}/info`)

  return {
    kycLevelInfo: data,
    isLoading: !error && !data,
    isError: error
  }
}
