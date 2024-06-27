import useSWR from 'swr'
import axios from 'axios'
import { globalConfig } from '@/config/global'

interface UserProfile {
  id: number
}

interface UseUserProfileWalletReturn {
  userProfileWallet: UserProfile | undefined
  isLoadingUserWalletAddress: boolean
  isError: Error | null
}

export default function useUserWalletAddress(userWalletAddress?: `0x${string}`): UseUserProfileWalletReturn {
  const { backendUrl } = globalConfig

  const fetcher = async (uri: string): Promise<UserProfile> => {
    const response = await axios.get<UserProfile>(`${backendUrl}/${uri}`)
    return response.data
  }

  const { data, error, isLoading } = useSWR<UserProfile>(userWalletAddress ? `/api/user-profile/wallet/${userWalletAddress}` : null, fetcher)

  return {
    userProfileWallet: data,
    isLoadingUserWalletAddress: isLoading,
    isError: error ?? null
  }
}
