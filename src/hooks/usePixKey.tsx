import useSWR from 'swr';
import axios from 'axios';
import { globalConfig } from '@/config/global';

interface UserPixKey {
  pixKey: string;
  type: string;
}

export default function userPixKey(id: number | null) {
  const { backendUrl } = globalConfig;
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const url = id ? `${backendUrl}/api/pixkeys/${id}` : null;
  const { data, error } = useSWR<UserPixKey[]>(url, fetcher);

  return {
    pixKey: data,
    isLoading: !error && !data,
    isError: error,
  };
}