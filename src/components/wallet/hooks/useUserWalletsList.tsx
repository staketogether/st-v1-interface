import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global';

interface UserWallet {
  walletAddress: string;
  type: string;
}

export default function useUserWalletsList(userProfileId?: number | null) {
  const { backendUrl } = globalConfig;
  const fetcher = (url: string) => axios.get<UserWallet[]>(url).then((res) => res.data);

  const url = userProfileId ? `${backendUrl}/api/user-wallet/${userProfileId}` : null;
  const { data, error, isLoading } = useSWR<UserWallet[]>(url, fetcher);

  return {
    walletsList: data,
    isLoadingWalletsList: isLoading,
    isError: error,
  };
}