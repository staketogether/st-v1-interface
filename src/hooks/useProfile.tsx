import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global';

interface UserProfile {
  id: number;
}

interface UseUserProfileWalletReturn {
  profileWallet: UserProfile | undefined;
  isLoading: boolean;
  isError: any;
}

export default function useUserProfileWallet(wallet: `0x${string}`): UseUserProfileWalletReturn {
  const { backendUrl } = globalConfig;
  const fetcher = (uri: string) => axios.get<UserProfile>(`${backendUrl}/${uri}`).then((res) => res.data);

  const { data, error } = useSWR<UserProfile>(wallet ? `/api/user-profile/wallet/${wallet}` : null, fetcher);

  return {
    profileWallet: data,
    isLoading: !error && !data,
    isError: error
  };
}