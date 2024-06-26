import useSWR from 'swr'
import axios from 'axios'
import { globalConfig } from '@/config/global'

interface UserPixKey {
  pixKey: string
  type: string
}

interface UseUserPixKeyReturn {
  pixKey: UserPixKey[] | undefined
  isLoading: boolean
  isError: Error | null
}

//O NOME ESTA ERRADO, SE ELE RETORNA UMA LISTA O NOME NÃO DEVERIA ESTAR NO SINGULAR
export default function useUserPixKey(id: number | null): UseUserPixKeyReturn {
  const { backendUrl } = globalConfig

  const fetcher = async (url: string): Promise<UserPixKey[]> => {
    const response = await axios.get<UserPixKey[]>(url)
    return response.data
  }

  const url = id ? `${backendUrl}/api/pixkeys/${id}` : null
  //sempre puxar o isLoading para fazer um loading =)
  const { data, error, isLoading } = useSWR<UserPixKey[], Error>(url, fetcher)

  return {
    pixKey: data,
    isLoading: isLoading,
    isError: error ?? null
  }
}
