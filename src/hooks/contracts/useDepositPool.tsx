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
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import {
  stakeTogetherABI,
  usePrepareStakeTogetherDepositPool,
  useStakeTogetherDepositPool
} from '../../types/Contracts'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'

export default function useDepositPool(
  netDepositAmount: bigint,
  grossDepositAmount: bigint,
  poolAddress: `0x${string}`,
  enabled: boolean,
  accountAddress?: `0x${string}`
) {
  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [notify, setNotify] = useState(false)
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [depositEstimatedGas, setDepositEstimatedGas] = useState<bigint | undefined>(undefined)
  const [failedToExecute, setFailedToExecute] = useState(false)

  const { registerDeposit } = useMixpanelAnalytics()
  const { contracts, chainId } = chainConfig()

  const amountEstimatedGas = ethers.parseUnits('0.001', 18)

  const isDepositEnabled = enabled && netDepositAmount > 0n

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2
  })

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    functionName: 'depositPool',
    args: [poolAddress, referral],
    contractAddress: contracts.StakeTogether,
    abi: stakeTogetherABI,
    value: amountEstimatedGas,
    skip: !enabled || estimateGasCost > 0n
  })

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } =
        await estimateGas()
      setDepositEstimatedGas(estimatedGas)
      setEstimateGasCost(estimatedCost)
      setMaxFeePerGas(estimatedMaxFeePerGas)
      setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
    }

    if (estimateGasCost === 0n) {
      handleEstimateGasPrice()
    }
  }, [estimateGas, estimateGasCost])

  const {
    config,
    isError: prepareTransactionIsError,
    error: prepareTransactionError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherDepositPool({
    chainId,
    address: contracts.StakeTogether,
    args: [poolAddress, referral],
    account: accountAddress,
    enabled: accountAddress && isDepositEnabled,
    value: grossDepositAmount,
    gas: !!depositEstimatedGas && depositEstimatedGas > 0n ? depositEstimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n ? maxPriorityFeePerGas : undefined
  })

  const tx = useStakeTogetherDepositPool({
    ...config,
    onSuccess: data => {
      if (data?.hash) {
        setTxHash(data?.hash)
      }
    },
    onError: () => {
      setNotify(true)
      setFailedToExecute(true)
      setAwaitWalletAction(false)
    }
  })

  const deposit = () => {
    setAwaitWalletAction(true)
    tx.write?.()
    setNotify(true)
  }

  const { t } = useLocaleTranslation()

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
    setFailedToExecute(false)
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
      registerDeposit(accountAddress, chainId, poolAddress, truncateWei(netDepositAmount, 4))
      if (notify) {
        notification.success({
          message: `${t('notifications.depositSuccess')}: ${truncateWei(netDepositAmount, 4)} ${t(
            'lsd.symbol'
          )}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, notify, netDepositAmount, isSuccess, poolAddress, registerDeposit, t])

  useEffect(() => {
    if (isError || failedToExecute) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
      if (notify) {
        notification.error({
          message: `${t('notifications.depositError')}: ${truncateWei(netDepositAmount, 4)} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
      setFailedToExecute(false)
    }
  }, [accountAddress, notify, netDepositAmount, failedToExecute, isError, poolAddress, t])

  useEffect(() => {
    if (prepareTransactionIsError && prepareTransactionError) {
      const { cause } = prepareTransactionError as { cause?: { reason?: string } }
      if (cause && cause?.reason) {
        setPrepareTransactionErrorMessage(cause.reason)
      }
    }
  }, [prepareTransactionError, prepareTransactionIsError])

  useEffect(() => {
    if (prepareTransactionIsSuccess) {
      setPrepareTransactionErrorMessage('')
    }
  }, [prepareTransactionIsSuccess])

  return {
    deposit,
    isLoading,
    isSuccess,
    estimatedGas: estimateGasCost,
    awaitWalletAction,
    txHash,
    resetState,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage
  }
}
