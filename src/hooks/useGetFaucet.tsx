import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useWaitForTransaction } from 'wagmi'

type FaucetData = {
  transactionHash: `0x${string}`
  amount: string
}

type GetFaucetParams = {
  address: string
  passcode: string
}

export default function useGetFaucet(handleSuccess?: () => void, handleError?: () => void) {
  const [data, setData] = useState<FaucetData | null>(null)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [amount, setAmount] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorApi, setErrorApi] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const resetStates = useCallback(() => {
    setErrorMessage('')
    setTxHash(undefined)
    setData(null)
    setErrorApi(false)
  }, [])

  const getFaucet = useCallback(
    async ({ address, passcode }: GetFaucetParams) => {
      setIsLoading(true)
      resetStates()
      try {
        const response = await axios.post<FaucetData>('/api/faucet', { address, passcode })
        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        handleError && handleError()
        setErrorApi(true)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setErrorMessage(error?.response?.data?.message)
        setIsLoading(false)
      }
    },
    [handleError, resetStates]
  )

  useEffect(() => {
    if (data) {
      setTxHash(data.transactionHash)
      setAmount(data.amount)
    }
  }, [data])

  const {
    isLoading: txLoading,
    isSuccess,
    isError
  } = useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      handleSuccess && handleSuccess()
    },
    onError: () => {
      handleError && handleError()
    }
  })

  useEffect(() => {
    return () => {
      resetStates()
    }
  }, [resetStates])

  return {
    getFaucet,
    isSuccess,
    txHash,
    isError: isError || errorApi,
    errorMessage,
    amount,
    isLoading: txLoading || isLoading
  }
}
