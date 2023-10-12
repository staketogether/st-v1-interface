import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import {
  stakeTogetherABI,
  usePrepareStakeTogetherUpdateDelegations,
  useStakeTogetherUpdateDelegations
} from '../../types/Contracts'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import { ethers } from 'ethers'

export type PoolData = {
  pool: `0x${string}`
  percentage: bigint
}

export default function useUpdateDelegations(
  enabled: boolean,
  updateDelegationPools: PoolData[],
  accountAddress?: `0x${string}`
) {
  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [notify, setNotify] = useState(false)
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const { contracts, chainId } = chainConfig()

  const { registerWithdraw } = useMixpanelAnalytics()
  const isUpdateDelegationEnabled = enabled

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: contracts.StakeTogether,
    functionName: 'UpdateDelegations',
    args: [
      [
        {
          pool: '0xb6ad42d615759e50c8087849a2f6f0e2032f7085' as `0x${string}`,
          percentage: ethers.parseUnits('1', 18)
        }
      ]
    ],
    abi: stakeTogetherABI,
    skip: !enabled || estimateGasCost > 0n
  })

  useEffect(() => {
    const handleEstimateGas = async () => {
      const { estimatedCost } = await estimateGas()
      if (estimatedCost > 0n) {
        setEstimateGasCost(estimatedCost)
      }
    }
    handleEstimateGas()
  }, [estimateGas])

  const {
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherUpdateDelegations({
    address: contracts.StakeTogether,
    args: [updateDelegationPools],
    account: accountAddress,
    enabled: isUpdateDelegationEnabled,
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
  const tx = useStakeTogetherUpdateDelegations({
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

  const updateDelegations = () => {
    setAwaitWalletAction(true)
    tx.write?.()
    setNotify(true)
  }

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2
  })

  const { t } = useLocaleTranslation()

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
  }

  useEffect(() => {
    if (isSuccess && accountAddress) {
      apolloClient.refetchQueries({
        include: [
          queryAccount,
          queryPool,
          queryDelegationShares,
          queryAccountActivities,
          queryAccountDelegations,
          queryAccountRewards,
          queryPoolActivities,
          queryPools,
          queryPoolsMarketShare,
          queryStakeTogether
        ]
      })

      if (notify) {
        notification.success({
          message: `update delegation success`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, notify, isSuccess, registerWithdraw, t])

  useEffect(() => {
    if (isError) {
      if (notify) {
        notification.error({
          message: `updateDelegationError`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, isError, notify, t])

  return {
    updateDelegations,
    estimateGasCost,
    isLoading,
    isSuccess,
    awaitWalletAction,
    resetState,
    txHash,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage
  }
}
