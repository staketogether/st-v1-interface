import useSWR from 'swr'
import { pixBankInfoVar } from './useControlModal'

export interface PixBankInfo {
  name: string
  taxId: string
  bankName: string
}

export default function usePixBankInfo(provider: 'brla' | 'transak', pixKey?: string, accountAddress?: string) {
  const { data, error, isLoading } = useSWR<PixBankInfo>(
    accountAddress && pixKey && `api/ramp/buy/${provider}/pix-bank-info/${pixKey}/${accountAddress}`, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 1,
    shouldRetryOnError: false,
    revalidateOnMount: false,
  })

  pixBankInfoVar(data)
  return {
    pixBankInfo: data,
    isLoading: isLoading,
    isError: error
  }
}
