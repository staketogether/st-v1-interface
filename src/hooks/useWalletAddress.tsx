import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global';

interface UserWallet {
  walletAddress: string;
  type: string;
}

export default function useWalletAddress(id: number | null) {
  const { backendUrl } = globalConfig;
  const fetcher = (url: string) => axios.get<UserWallet[]>(url).then((res) => res.data);

  const url = id ? `${backendUrl}/api/user-wallet/${id}` : null;
  const { data, error } = useSWR<UserWallet[]>(url, fetcher);

  return {
    wallets: data,
    isLoading: !error && !data,
    isError: error,
  };
}