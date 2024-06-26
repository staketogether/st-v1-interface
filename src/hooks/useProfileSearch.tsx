import useSWR from 'swr'
import axios from 'axios'
import { globalConfig } from '@/config/global'

interface UserKyc {
  email: string
  kyc: {
    fullName: string
  }
  kycUsedLimit: {
    limitMint: number
    limitBurn: number
    limitSwapBuy: number
    limitSwapSell: number
    limitBRLAOutOwnAccount: number
    limitBRLAOutThirdParty: number
  }
}

//NÃO EXISTE RETURN EM NOME DE TIPOS
interface UseUserProfileReturn {
  profileData: UserKyc | undefined
  isLoading: boolean
  isError: Error | null
}

// id do que? qualquer um serve?
//por que o hook se chama userProfile se ele não retorna o perfil do usuário?
// o nome do hook tem que ser o mesmo do arquivo
export default function useUserProfile(id?: number): UseUserProfileReturn {
  const { backendUrl } = globalConfig

  const fetcher = async (uri: string): Promise<UserKyc> => {
    const response = await axios.get<UserKyc>(`${backendUrl}/${uri}`)
    return response.data
  }

  const { data, error } = useSWR<UserKyc>(id ? `/api/user-profile/profile/${id}` : null, fetcher)

  return {
    profileData: data,
    isLoading: !error ?? !data,
    isError: error ?? null
  }
}
