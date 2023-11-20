import { useState } from 'react'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherAddPool, useStakeTogetherAddPool } from '@/types/Contracts'
import { useWaitForTransaction } from 'wagmi'
import { notification } from 'antd'

export default function useAddPool(projectAddress: `0x${string}`) {
  const { contracts, chainId } = chainConfig()
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)

  const {
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherAddPool({
    chainId,
    address: contracts.StakeTogether,
    args: [projectAddress, true],
    value: 0n,
    onError(error) {
      const { cause } = error as { cause?: { reason?: string } }
      if (cause && cause?.reason) {
        setPrepareTransactionErrorMessage(cause.reason)
      }
    },
    onSuccess() {
      setPrepareTransactionErrorMessage('')
    }
  })

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2,
    onSuccess: () => {
      setAwaitWalletAction(false)
      notification.success({
        message: `Projeto Adicionado com sucesso!`,
        placement: 'topRight'
      })
    },
    onError: () => {
      setAwaitWalletAction(false)
      notification.error({
        message: `Erro ao adicionar projeto!`,
        placement: 'topRight'
      })
    }
  })

  const tx = useStakeTogetherAddPool({
    ...config,
    onSuccess: data => {
      if (data?.hash) {
        setTxHash(data?.hash)
      }
    },
    onError: () => {
      setAwaitWalletAction(false)
    }
  })

  const addPool = () => {
    setAwaitWalletAction(true)
    tx.write?.()
  }

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
  }

  return {
    isLoading,
    isSuccess,
    addPool,
    resetState,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage,
    isError,
    awaitWalletAction,
    txHash
  }
}
