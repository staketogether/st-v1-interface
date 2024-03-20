import { useState } from 'react'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherRemovePool, useStakeTogetherRemovePool } from '@/types/Contracts'
import { useWaitForTransaction } from 'wagmi'
import { notification } from 'antd'
import useLocaleTranslation from '../useLocaleTranslation'
import { getContractsByProductName } from '@/config/product'

export default function useRemovePool(projectAddress: `0x${string}`, disabled?: boolean) {
  const { isTestnet, chainId } = chainConfig()
  const { StakeTogether } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const { t } = useLocaleTranslation()

  const {
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherRemovePool({
    chainId,
    address: StakeTogether,
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
        message: `${t('v2.panelProject.messages.projectRemoved')}`,
        placement: 'topRight'
      })
      resetState()
    },
    onError: () => {
      setAwaitWalletAction(false)
      notification.error({
        message: `${t('v2.panelProject.messages.errorProjectRemove')}`,
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
