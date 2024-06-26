import useSWR from 'swr'
import axios from 'axios'
import { globalConfig } from '@/config/global'

interface UserProfile {
  id: number
}

interface UseUserProfileWalletReturn {
  profileWallet: UserProfile | undefined
  isLoading: boolean
  isError: Error | null
}

export default function useUserProfileWallet(wallet: `0x${string}`): UseUserProfileWalletReturn {
  const { backendUrl } = globalConfig

  const fetcher = async (uri: string): Promise<UserProfile> => {
    const response = await axios.get<UserProfile>(`${backendUrl}/${uri}`)
    return response.data
  }

  const { data, error } = useSWR<UserProfile>(wallet ? `/api/user-profile/wallet/${wallet}` : null, fetcher)

  return {
    profileWallet: data,
    isLoading: !error ?? !data,
    isError: error ?? null
  }
}
