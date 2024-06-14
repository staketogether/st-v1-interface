import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global'

export default function userKyc(id: string) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then((res) => res.data);
  const { data, error } = useSWR(id ? `/api/user-kyc/${id}` : null, fetcher);

  return {
    userKyc: data,
    isLoading: !error && !data,
    isError: error
  };
}