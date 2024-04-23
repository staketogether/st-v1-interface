import { globalConfig } from '@/config/global'
import { Asset } from '@/types/Asset'
import { PaymentMethodType } from '@/types/payment-method.type'
import axios from 'axios'
import useSWR from 'swr'

export interface BuyRamp {
  id: string
  due: string
  brCode: string
}
export interface BuyRampRequest {
  chainId: number
  paymentMethod: PaymentMethodType
  fiatCurrencyCode: string
  amount: number
  accountAddress: string
  receiverAddress: string
  convertToChainId?: number
  convertToToken?: string
}

export interface OffRampRequest {
  walletAddress: string
  pixKey: string
  amount: string
  asset: Asset
}
export default function useBuyRamp(provider: 'brla' | 'transak', request?: BuyRampRequest) {
  const { backendUrl } = globalConfig
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const fetcher = (uri: string) => axios.post(`${backendUrl}/${uri}`, request).then(res => res.data)
  const { data, error } = useSWR<BuyRamp>(request && `api/ramp/buy/${provider}`, fetcher)

  return {
    buyRampResponse: data,
    isLoading: !error && !data,
    isError: error
  }
}
