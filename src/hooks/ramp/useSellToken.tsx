import { globalConfig } from "@/config/global";
import { ProviderType } from "@/types/provider.type";
import axios, { AxiosError } from "axios";
import useSWR from "swr";

interface SellTokenProps {
    provider: ProviderType
    walletAddress: string
    pixKey: string
    amount?: number
    fromChain: number
    fromToken: string
    onSuccessCallback?: (data: { id: string }) => void,
    onErrorCallback?: (data?: AxiosError<{ message?: string; data?: string }>) => void
}

export default function useSellToken(requestData: SellTokenProps) {
    const { backendUrl } = globalConfig
    const { provider, amount, onSuccessCallback, onErrorCallback } = requestData
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const fetcher = (uri: string) => axios.post(`${backendUrl}/${uri}`, requestData).then(r => r.data)
    const { data, error, mutate, isLoading } = useSWR<{ id: string }>(amount ? `api/ramp/sell/${provider}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryCount: 1,
        shouldRetryOnError: false,
        revalidateOnMount: false,
        onSuccess: result => onSuccessCallback && onSuccessCallback(result),
        onError: result => onErrorCallback && onErrorCallback(result as AxiosError<{ message?: string; data?: string }>)
    })

    return {
        data,
        isLoading,
        error,
        mutate
    }

}