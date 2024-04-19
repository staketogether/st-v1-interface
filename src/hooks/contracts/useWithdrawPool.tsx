import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { stakeTogetherAbi } from '@/types/Contracts'
import { WithdrawType } from '@/types/Withdraw'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useSimulateContract, useWaitForTransactionReceipt as useWaitForTransaction, useWriteContract } from 'wagmi'
import { getSubgraphClient } from '../../config/apollo'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import useConnectedAccount from '../useConnectedAccount'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import useStConfig from './useStConfig'
import { Staking } from '@/types/Staking'

export default function useWithdrawPool(
  withdrawAmount: string,
  poolAddress: `0x${string}`,
  enabled: boolean,
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

  const { registerWithdraw } = useMixpanelAnalytics()
  const { web3AuthUserInfo } = useConnectedAccount()
  const { loading: stConfigLoading } = useStConfig({ name: product.id, chainId })
  const StakeTogether = product.contracts.StakeTogether
  const subgraphClient = getSubgraphClient({ stakingId: product.id })

  const { t } = useLocaleTranslation()

  const { stConfig } = useStConfig({ name: product.id, chainId })
  const amountEstimatedGas = stConfig?.minWithdrawAmount ?? 0n
  const amount = ethers.parseUnits(withdrawAmount.toString(), 18)
  const isWithdrawEnabled = enabled && amount > 0n && !stConfigLoading

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: StakeTogether,
    functionName: 'withdrawPool',
    args: [amountEstimatedGas, poolAddress],
    abi: stakeTogetherAbi,
    skip: !isWithdrawEnabled || estimateGasCost > 0n
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
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess,
    error: prepareTransactionError,
    isLoading: prepareTransactionsIsLoading
  } = useSimulateContract({
    query: {
      enabled: isWithdrawEnabled
    },
    address: StakeTogether,
    abi: stakeTogetherAbi,
    functionName: 'withdrawPool',
    args: [amount, poolAddress],
    account: accountAddress,
    gas: !!estimatedGas && estimatedGas > 0n && !!web3AuthUserInfo ? estimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && !!web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && !!web3AuthUserInfo ? maxPriorityFeePerGas : undefined
  })

  useEffect(() => {
    if (prepareTransactionIsError && prepareTransactionError) {
      const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

      if (
        !cause?.reason &&
        !!web3AuthUserInfo &&
        cause?.message &&
        cause.message.includes('The total cost (gas * gas fee + value) of executing this transaction exceeds the balance')
      ) {
        notification.warning({
          message: `${t('v2.stake.insufficientGasBalance')}, ${t('v2.stake.useMaxButton')}`,
          placement: 'topRight'
        })
        setPrepareTransactionErrorMessage('insufficientGasBalance')

        return
      }

      const { data } = cause as { data?: { errorName?: string } }

      if (cause && data?.errorName) {
        setPrepareTransactionErrorMessage(data.errorName)
      }
    }
  }, [prepareTransactionError, prepareTransactionIsError, t, web3AuthUserInfo])

  useEffect(() => {
    if (prepareTransactionIsSuccess) {
      setPrepareTransactionErrorMessage('')
    }
  }, [prepareTransactionIsSuccess])

  const { writeContract, data: txHash, isError: writeContractIsError, reset: writeContractReset } = useWriteContract()

  useEffect(() => {
    if (writeContractIsError && awaitWalletAction) {
      notification.error({
        message: `${t('v2.stake.userRejectedTheRequest')}`,
        placement: 'topRight'
      })
      setAwaitWalletAction(false)
    }
  }, [awaitWalletAction, t, writeContractIsError])

  const {
    isLoading,
    isSuccess: awaitTransactionSuccess,
    isError: awaitTransactionErrorIsError
  } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2
  })

  useEffect(() => {
    if (awaitTransactionErrorIsError && awaitWalletAction) {
      setAwaitWalletAction(false)
      notification.error({
        message: `${t('notifications.withdrawError')} ${withdrawAmount} ${t('eth.symbol')}`,
        placement: 'topRight'
      })
      setAwaitWalletAction(false)
    }
  }, [awaitTransactionErrorIsError, awaitWalletAction, t, withdrawAmount])

  useEffect(() => {
    if (awaitTransactionSuccess && awaitWalletAction) {
      setAwaitWalletAction(false)
      notification.success({
        message: `${t('notifications.withdrawSuccess')} ${withdrawAmount} ${t('eth.symbol')}`,
        placement: 'topRight'
      })
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
      if (accountAddress) {
        registerWithdraw(accountAddress, chainId, poolAddress, withdrawAmount.toString(), WithdrawType.POOL)
      }
    }
  }, [
    accountAddress,
    awaitTransactionSuccess,
    awaitWalletAction,
    chainId,
    poolAddress,
    registerWithdraw,
    subgraphClient,
    t,
    withdrawAmount
  ])

  const withdrawPool = (): void => {
    setAwaitWalletAction(true)
    writeContract(prepareTransactionData!.request)
  }

  return {
    withdrawPool,
    estimatedCost: estimateGasCost,
    isLoading,
    resetState: writeContractReset,
    isSuccess: awaitTransactionSuccess,
    awaitWalletAction,
    txHash,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionsIsLoading,
    prepareTransactionErrorMessage
  }
}
