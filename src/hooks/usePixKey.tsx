import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global'

interface UserPixKey {
  pixKey: string,
  type: string
}

export default function userPixKey(id: number) {
  const { backendUrl } = globalConfig
  const fetcher = (uri: string) => axios.get(`${backendUrl}/${uri}`).then((res) => res.data);
  const { data, error } = useSWR<Array<UserPixKey>>(id ? `/api/pixkeys/${id}` : null, fetcher);

  return {
    pixKey: data,
    isLoading: !error && !data,
    isError: error
  };
}