import { useState } from 'react'
import chainConfig from '../../config/chain'
import { usePrepareStakeTogetherAddPool, useStakeTogetherAddPool } from '@/types/Contracts'
import { useWaitForTransactionReceipt as useWaitForTransaction } from 'wagmi'
import { notification } from 'antd'
import useLocaleTranslation from '../useLocaleTranslation'
import { getContractsByProductName } from '@/config/product'

export default function useAddPool(projectAddress: `0x${string}`, isSocial: boolean, disabled?: boolean) {
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
  } = usePrepareStakeTogetherAddPool({
    chainId,
    address: StakeTogether,
    enabled: disabled,
    args: [projectAddress, true, isSocial, false],
    value: 0n,
    onError(error) {
      console.error(error)
      if (!error) {
        return
      }

      const { cause } = error as { cause?: { reason?: string; message?: string } }

      const { data } = cause as { data?: { errorName?: string } }

      if (cause && data && data.errorName) {
        setPrepareTransactionErrorMessage(data.errorName)
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
      notification.error({
        message: `${t('v2.stake.userRejectedTheRequest')}`,
        placement: 'topRight'
      })
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
