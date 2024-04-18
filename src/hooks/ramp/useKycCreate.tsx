import { globalConfig } from '@/config/global'
import axios, { AxiosError } from 'axios'
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
  onSuccessCallback?: (data: { id: string }) => void,
  onErrorCallback?: (data?: AxiosError<{ message?: string; data?: string }>) => void
) {
  const { backendUrl } = globalConfig
  const isValid = provider && taxId && kycData
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const fetcher = (uri: string) => axios.post(`${backendUrl}/${uri}`, { ...kycData }).then(r => r.data)
  const { data, error, mutate, isLoading } = useSWR<{ id: string }>(isValid ? `api/ramp/kyc/${provider}/${taxId}/verify` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 1,
    shouldRetryOnError: false,
    revalidateOnMount: false,
    onSuccess: result => onSuccessCallback && onSuccessCallback(result),
    onError: result => onErrorCallback && onErrorCallback(result as AxiosError<{ message?: string; data?: string }>)
  })

  return {
    data,
    isLoading,
    error,
    mutate
  }
}
