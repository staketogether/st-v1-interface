import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global'

interface UserProfile {
  id: number
}

export default function userProfileWallet(wallet: `0x${string}`) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then((res) => res.data);
  const { data, error } = useSWR<UserProfile>(wallet ? `/api/user-profile/wallet/${wallet}` : null, fetcher);

  return {
    profileWallet: data,
    isLoading: !error && !data,
    isError: error
  };
}