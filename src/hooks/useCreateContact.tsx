import { globalConfig } from '@/config/global';
import axios from 'axios';
import useSWR from 'swr';

export default function useCreateContact(
    email?: string,
    fullName?: string,
    onSuccessCallback?: (data: { id: string; }) => void,
    onErrorCallback?: () => void
) {
    const { backendUrl } = globalConfig
    const isValid = !!(email && fullName)
    const fetcher = (uri: string) => axios.post(`${backendUrl}/${uri}`, { fullName, email }).then(res => res.data)
    const { data, error, mutate, isLoading } = useSWR<{ id: string }>(isValid ? `api/contact` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryCount: 1,
        shouldRetryOnError: false,
        onSuccess: (data) => onSuccessCallback && onSuccessCallback(data),
        onError: () => onErrorCallback && onErrorCallback()
    })

    return {
        data,
        isLoading,
        error,
        mutate
    }
}