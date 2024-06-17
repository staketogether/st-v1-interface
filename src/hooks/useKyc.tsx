import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global'

export default function userKyc(wallet: `0x${string}`) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then((res) => res.data);
  const { data, error } = useSWR(wallet ? `api/user-kyc/${wallet}` : null, fetcher);

  return {
    res: data,
    isLoading: !error && !data,
    isError: error
  };
}