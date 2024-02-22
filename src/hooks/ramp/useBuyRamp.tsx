import { globalConfig } from '@/config/global'
import { PaymentMethodType } from '@/types/payment-method.type'
import axios from 'axios'
import useSWR from 'swr'

interface BuyRamp {
  id: string
  due: string
  brCode: string
}
interface BuyRampRequest {
  chainId: string
  paymentMethod: PaymentMethodType
  fiatCurrencyCode: string
  amount: number
  taxId: string
  receiverAddress: string

}
export default function useBuyRamp(provider: 'brla' | 'transak', request?: BuyRampRequest) {

  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.post(`${backendUrl}/${uri}`, request).then(res => res.data)
  const { data, error } = useSWR<BuyRamp>(request && `api/ramp/kyc/${provider}`, fetcher)

  return {
    buyRampResponse: data,
    isLoading: !error && !data,
    isError: error
  }
}
