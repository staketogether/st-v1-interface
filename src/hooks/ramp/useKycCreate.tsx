import { globalConfig } from '@/config/global'
import axios from 'axios'
import useSWR from 'swr'



export enum TypeAccount {
  CPF = 'cpf',
  CNPJ = 'cnpj'
}

export interface KycCreate {
  cpfOrCnpj?: string
  birthDate?: string
  fullName?: string
  email?: string
  documentType?: 'RG' | 'CNH'
  accountType: TypeAccount
}


export default function useKycCreate(provider: 'brla' | 'transak', taxId?: string, kycData?: KycCreate) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.post(`${backendUrl}/${uri}`, { ...kycData, }).then(res => res.data)
  const { data, error } = useSWR(provider && taxId && kycData ? `api/ramp/kyc/${provider}/${taxId}/verify` : null, fetcher, {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false
  })

  return {
    data,
    isLoading: !error && !data,
    error
  }
}
