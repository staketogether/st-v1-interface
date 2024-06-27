import useSWR from 'swr'
import axios from 'axios'
import { globalConfig } from '@/config/global'

interface UserProfile {
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

interface UseUserProfile {
  userProfile: UserProfile | undefined
  isLoadingProfileSearch: boolean
  isError: Error | null
}

export default function useProfileSearch(userProfileId?: number): UseUserProfile {
  const { backendUrl } = globalConfig

  const fetcher = async (uri: string): Promise<UserProfile> => {
    const response = await axios.get<UserProfile>(`${backendUrl}/${uri}`)
    return response.data
  }

  const { data, error, isLoading } = useSWR<UserProfile>(userProfileId ? `/api/user-profile/profile/${userProfileId}` : null, fetcher)

  return {
    userProfile: data,
    isLoadingProfileSearch: isLoading,
    isError: error ?? null
  }
}
