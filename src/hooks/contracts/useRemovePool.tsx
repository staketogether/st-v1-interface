import { useState } from 'react'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherRemovePool, useStakeTogetherRemovePool } from '@/types/Contracts'
import { useWaitForTransaction } from 'wagmi'
import { notification } from 'antd'

export default function useRemovePool(projectAddress: `0x${string}`, disabled?: boolean) {
  const { contracts, chainId } = chainConfig()
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)

  const {
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherRemovePool({
    chainId,
    address: contracts.StakeTogether,
    args: [projectAddress],
    enabled: !!disabled,
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
        message: `Projeto Removido com sucesso!`,
        placement: 'topRight'
      })
      resetState()
    },
    onError: () => {
      setAwaitWalletAction(false)
      notification.error({
        message: `Erro ao Remover o projeto!`,
        placement: 'topRight'
      })
    }
  })

  const tx = useStakeTogetherRemovePool({
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

  const removePool = () => {
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
    removePool,
    resetState,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage,
    isError,
    awaitWalletAction,
    txHash
  }
}
