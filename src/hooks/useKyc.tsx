import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global'

interface UserKyc {
  email: string, 
  fullName: string,
}

export default function userKyc(id: number ) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then((res) => res.data);
  const { data, error } = useSWR<UserKyc>(id ? `/api/user-kyc/${id}` : null, fetcher);

  return {
    kyc: data,
    isLoading: !error && !data,
    isError: error
  };
}