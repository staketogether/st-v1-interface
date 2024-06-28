import useSWR from 'swr'
import axios from 'axios'
import { globalConfig } from '@/config/global'

interface UserPixKey {
  pixKey: string
  type: 'cpfCnpj' | 'email' | 'phone_number',
}

interface UseUserPixKey {
  userListPixKeys: UserPixKey[] | undefined
  isLoadingPixKeys: boolean
  isError: Error | null
}

export default function useUserListPixKeys(userProfileId?: number | null): UseUserPixKey{
  const { backendUrl } = globalConfig

  const fetcher = async (url: string): Promise<UserPixKey[]> => {
    const response = await axios.get<UserPixKey[]>(url)
    return response.data
  }

  const url = userProfileId ? `${backendUrl}/api/pixkeys/${userProfileId}` : null
  const { data, error, isLoading } = useSWR<UserPixKey[], Error>(url, fetcher)

  return {
    userListPixKeys: data,
    isLoadingPixKeys: isLoading,
    isError: error ?? null
  }
}
