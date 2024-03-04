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


export interface KycPayload {
  fullName?: string
  email?: string
  cpf?: string
  birthDateTimestamp?: number
  cnpj?: string
  startDateTImestamp?: number
}


export default function useKycCreate(
  provider: 'brla' | 'transak',
  taxId?: string,
  kycData?: KycPayload,
  onSuccessCallback?: (data: { id: string; }) => void,
  onErrorCallback?: () => void
) {
  const { backendUrl } = globalConfig
  const isValid = provider && taxId && kycData
  const fetcher = (uri: string) => axios.post(`${backendUrl}/${uri}`, { ...kycData, }).then(res => res.data)
  const { data, error, mutate, isLoading } = useSWR<{ id: string }>(isValid ? `api/ramp/kyc/${provider}/${taxId}/verify` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 1,
    shouldRetryOnError: false,
    revalidateOnMount: false,
    onSuccess: (data) => onSuccessCallback && onSuccessCallback(data),
    onError: () => onErrorCallback && onErrorCallback()
  })

  return {
    data,
    isLoading,
    error,
    mutate
  }
}
