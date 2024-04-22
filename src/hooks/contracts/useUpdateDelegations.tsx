import { getSubgraphClient } from '@/config/apollo'
import { queryAccount } from '@/queries/subgraph/queryAccount'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPool } from '@/queries/subgraph/queryPool'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { stakeTogetherAbi } from '@/types/Contracts'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useSimulateContract, useWaitForTransactionReceipt as useWaitForTransaction, useWriteContract } from 'wagmi'
import useConnectedAccount from '../useConnectedAccount'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import { chainConfigByChainId } from '@/config/chain'
import { Staking } from '@/types/Staking'

export interface PoolData {
  pool: `0x${string}`
  percentage: bigint
}

export default function useUpdateDelegations(
  enabled: boolean,
  updateDelegationPools: PoolData[],
  product: Staking,
  chainId: number,
  accountAddress?: `0x${string}`
) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [estimatedGas, setEstimatedGas] = useState<bigint | undefined>(undefined)
  const subgraphClient = getSubgraphClient({ stakingId: 'eth-staking' })
  const { web3AuthUserInfo } = useConnectedAccount()
  const config = chainConfigByChainId(chainId)
  const { t } = useLocaleTranslation()

  const updateDelegationEstimatedGas: PoolData[] = [
    {
      pool: product.stakeTogetherPool as `0x${string}`,
      percentage: ethers.parseUnits('1', 18)
    }
  ]
  const isUpdateDelegationEnabled = enabled

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: product.contracts.StakeTogether,
    functionName: 'updateDelegations',
    args: [updateDelegationEstimatedGas],
    abi: stakeTogetherAbi,
    skip: estimateGasCost > 0n
  })

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas: estimatedGas2, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } = await estimateGas()
      setEstimatedGas(estimatedGas2)
      setEstimateGasCost(estimatedCost)
      setMaxFeePerGas(estimatedMaxFeePerGas)
      setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
    }

    if (estimateGasCost === 0n) {
      handleEstimateGasPrice()
    }
  }, [estimateGas, estimateGasCost])

  const {
    data: prepareTransactionData,
    error: prepareTransactionError,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = useSimulateContract({
    query: {
      enabled: isUpdateDelegationEnabled
    },
    address: product.contracts.StakeTogether,
    args: [updateDelegationPools as readonly { pool: `0x${string}`; percentage: bigint }[]],
    account: accountAddress,
    abi: stakeTogetherAbi,
    chainId: chainId,
    functionName: 'updateDelegations',
    gas: !!estimatedGas && estimatedGas > 0n && !!web3AuthUserInfo ? estimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && !!web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && !!web3AuthUserInfo ? maxPriorityFeePerGas : undefined
  })

  useEffect(() => {
    if (!prepareTransactionIsError) {
      return
    }

    const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

    if (
      !cause?.reason &&
      !!web3AuthUserInfo &&
      cause?.message &&
      cause.message.includes('The total cost (gas * gas fee + value) of executing this transaction exceeds the balance')
    ) {
      notification.warning({
        message: `${t('v2.stake.depositErrorMessage.insufficientGasBalance')}, ${t('v2.stake.depositErrorMessage.useMaxButton')}`,
        placement: 'topRight'
      })
      setPrepareTransactionErrorMessage('insufficientGasBalance')

      return
    }

    const { data } = cause as { data?: { errorName?: string } }

    if (cause && data?.errorName) {
      setPrepareTransactionErrorMessage(data.errorName)
    }
  }, [prepareTransactionIsError, t, prepareTransactionError, web3AuthUserInfo])

  useEffect(() => {
    if (prepareTransactionIsSuccess) {
      setPrepareTransactionErrorMessage('')
    }
  }, [prepareTransactionIsSuccess])

  const { writeContract, data: txHash, isError: writeContractIsError, reset: resetState } = useWriteContract()

  useEffect(() => {
    if (writeContractIsError) {
      notification.error({
        message: t('v2.updateDelegations.transactionMessages.walletError'),
        placement: 'topRight'
      })
      setAwaitWalletAction(false)
    }
  }, [t, writeContractIsError])

  const {
    isLoading,
    isSuccess: awaitTransactionSuccess,
    isError: awaitTransactionErrorIsError
  } = useWaitForTransaction({
    hash: txHash,
    confirmations: config.transactionConfig.confirmations
  })

  useEffect(() => {
    if (awaitTransactionSuccess) {
      setAwaitWalletAction(false)
      subgraphClient.refetchQueries({
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

      notification.success({
        message: t('v2.updateDelegations.transactionMessages.successful'),
        placement: 'topRight'
      })
    }
  }, [awaitTransactionSuccess, subgraphClient, t])

  useEffect(() => {
    if (awaitTransactionErrorIsError) {
      setAwaitWalletAction(false)
      notification.error({
        message: t('v2.updateDelegations.transactionMessages.walletError'),
        placement: 'topRight'
      })
    }
  }, [awaitTransactionErrorIsError, t])

  const updateDelegations = () => {
    setAwaitWalletAction(true)
    writeContract(prepareTransactionData!.request)
  }

  return {
    updateDelegations,
    estimateGasCost,
    isLoading,
    isSuccess: awaitTransactionSuccess,
    awaitWalletAction,
    txHash,
    resetState: resetState,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage
  }
}
