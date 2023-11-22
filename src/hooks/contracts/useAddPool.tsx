import { useState } from 'react'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherAddPool, useStakeTogetherAddPool } from '@/types/Contracts'
import { useWaitForTransaction } from 'wagmi'
import { notification } from 'antd'
import useLocaleTranslation from '../useLocaleTranslation'

export default function useAddPool(projectAddress: `0x${string}`, disabled?: boolean) {
  const { contracts, chainId } = chainConfig()
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const { t } = useLocaleTranslation()

  const {
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherAddPool({
    chainId,
    address: contracts.StakeTogether,
    enabled: !!disabled,
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
        message: `${t('v2.panelProject.messages.projectAddedSuccessfully')}`,
        placement: 'topRight'
      })
    },
    onError: () => {
      setAwaitWalletAction(false)
      notification.error({
        message: `${t('v2.panelProject.messages.errorAddProject')}`,
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
