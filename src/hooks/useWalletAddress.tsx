import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global'

interface UserWallet {
  walletAddress: string,
  type: string
}

export default function userWalletAddress(id: number) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then((res) => res.data);
  const { data, error } = useSWR<Array<UserWallet>>(id ? `/api/user-wallet/${id}` : null, fetcher);

  return {
    wallets: data,
    isLoading: !error && !data,
    isError: error
  };
}