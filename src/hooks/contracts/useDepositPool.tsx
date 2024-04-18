import { getSubgraphClient } from '@/config/apollo'
import { chainConfigByChainId } from '@/config/chain'
import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { truncateWei } from '@/services/truncate'
import { stakeTogetherAbi } from '@/types/Contracts'
import { ProductStaking } from '@/types/ProductStaking'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useSimulateContract, useWaitForTransactionReceipt as useWaitForTransaction, useWriteContract } from 'wagmi'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import useConnectedAccount from '../useConnectedAccount'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import useStConfig from './useStConfig'

export default function useDepositPool(
  netDepositAmount: bigint,
  grossDepositAmount: bigint,
  poolAddress: `0x${string}`,
  enabled: boolean,
  product: ProductStaking,
  chainId: number,
  accountAddress: `0x${string}` | undefined
) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [depositEstimatedGas, setDepositEstimatedGas] = useState<bigint | undefined>(undefined)

  const { registerDeposit } = useMixpanelAnalytics()
  const { isTestnet } = chainConfigByChainId(chainId)
  const subgraphClient = getSubgraphClient({ productName: product.name, isTestnet })
  const { web3AuthUserInfo } = useConnectedAccount()
  const { stConfig, loading: stConfigLoading } = useStConfig({ productName: product.name, chainId })
  const { t } = useLocaleTranslation()

  const amountEstimatedGas = stConfig?.minDepositAmount || 0n

  const isDepositEnabled = enabled && netDepositAmount > 0n && !stConfigLoading

  const isDepositEstimatedGas = !enabled && stConfigLoading
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']
  // Todo! Implement Referral
  const referral = poolAddress

  const { estimateGas } = useEstimateTxInfo({
    account: StakeTogether,
    functionName: 'depositPool',
    args: [poolAddress, referral],
    contractAddress: StakeTogether,
    abi: stakeTogetherAbi,
    value: amountEstimatedGas,
    skip: isDepositEstimatedGas && estimateGasCost > 0n,
    chainId: chainId
  })

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } = await estimateGas()
      setDepositEstimatedGas(estimatedGas)
      setEstimateGasCost(estimatedCost)
      setMaxFeePerGas(estimatedMaxFeePerGas)
      setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
    }

    if (estimateGasCost === 0n) {
      handleEstimateGasPrice()
    }
  }, [estimateGas, estimateGasCost])

  useEffect(() => {
    if (accountAddress) {
      setDepositEstimatedGas(undefined)
      setEstimateGasCost(0n)
      setMaxFeePerGas(undefined)
      setMaxPriorityFeePerGas(undefined)
    }
  }, [accountAddress])

  const {
    data: prepareTransactionData,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess,
    error: prepareTransactionError,
    isLoading: prepareTransactionsIsLoading,
    refetch: refetchPrepareTransaction
  } = useSimulateContract({
    query: {
      enabled: accountAddress && isDepositEnabled
    },
    account: accountAddress,
    abi: stakeTogetherAbi,
    chainId,
    functionName: 'depositPool',
    address: StakeTogether,
    args: [poolAddress, referral],
    value: grossDepositAmount,
    gas: !!depositEstimatedGas && depositEstimatedGas > 0n && !!web3AuthUserInfo ? depositEstimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && !!web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && !!web3AuthUserInfo ? maxPriorityFeePerGas : undefined
  })

  useEffect(() => {
    if (prepareTransactionIsError && prepareTransactionError) {
      const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

      if (
        (!cause || !cause.reason) &&
        !!web3AuthUserInfo &&
        cause?.message &&
        cause.message.includes('The total cost (gas * gas fee + value) of executing this transaction exceeds the balance')
      ) {
        notification.warning({
          message: `${t('v2.stake.insufficientGasBalance')}, ${t('v2.stake.depositErrorMessage.useMaxButton')}`,
          placement: 'topRight'
        })
        setPrepareTransactionErrorMessage('insufficientGasBalance')

        return
      }
      const response = cause as { data?: { errorName?: string } }

      if (cause && response?.data && response?.data?.errorName) {
        setPrepareTransactionErrorMessage(response?.data?.errorName)
      }
    }
  }, [prepareTransactionError, prepareTransactionIsError, t, web3AuthUserInfo])

  useEffect(() => {
    if (prepareTransactionIsSuccess) {
      setPrepareTransactionErrorMessage('')
    }
  }, [prepareTransactionIsSuccess])

  const { writeContract, data: txHash, isError: writeContractIsError, reset: resetWriteContract } = useWriteContract()

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
    confirmations: product.transactionConfig.confirmations
  })

  useEffect(() => {
    if (awaitTransactionErrorIsError && awaitWalletAction) {
      setAwaitWalletAction(false)
      notification.error({
        message: `${t('notifications.depositError')}: ${truncateWei(netDepositAmount, 4)} ${t('lsd.symbol')}`,
        placement: 'topRight'
      })
    }
  }, [awaitTransactionErrorIsError, awaitWalletAction, netDepositAmount, t])

  useEffect(() => {
    if (awaitTransactionSuccess && awaitWalletAction) {
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
        message: `${t('notifications.depositSuccess')}: ${truncateWei(netDepositAmount, 4)} ${product.symbol}`,
        placement: 'topRight'
      })
      refetchPrepareTransaction()
      if (accountAddress) {
        registerDeposit(accountAddress, chainId, poolAddress, truncateWei(netDepositAmount, 4))
      }
    }
  }, [
    accountAddress,
    awaitTransactionSuccess,
    awaitWalletAction,
    chainId,
    netDepositAmount,
    poolAddress,
    product.symbol,
    refetchPrepareTransaction,
    registerDeposit,
    subgraphClient,
    t
  ])

  const deposit = async () => {
    setAwaitWalletAction(true)
    writeContract(prepareTransactionData!.request)
  }

  return {
    deposit,
    isLoading,
    isSuccess: awaitTransactionSuccess,
    estimatedGas: estimateGasCost,
    awaitWalletAction,
    txHash,
    resetState: resetWriteContract,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage,
    prepareTransactionsIsLoading
  }
}
