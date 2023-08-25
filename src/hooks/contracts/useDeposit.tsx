import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { notification } from 'antd'
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
import useTranslation from '../useTranslation'
import { useCalculateDelegationPercentage } from '@/hooks/contracts/useCalculateDelegationPercentage'
import useEstimateTxInfo from '../useEstimateTxInfo'
import { truncateWei } from '@/services/truncate'
import { ethers } from 'ethers'
import { useFeeStakeEntry } from '@/hooks/subgraphs/useFeeStakeEntry'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'

export default function useDeposit(
  netDepositAmount: bigint,
  grossDepositAmount: bigint,
  poolAddress: `0x${string}`,
  enabled: boolean,
  accountAddress?: `0x${string}`
) {
  const { contracts, chainId } = chainConfig()
  const [notify, setNotify] = useState(false)
  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [depositEstimatedGas, setDepositEstimatedGas] = useState<bigint | undefined>(undefined)
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [failedToExecute, setFailedToExecute] = useState(false)
  const { registerDeposit } = useMixpanelAnalytics()

  const { delegations, loading: loadingDelegations } = useCalculateDelegationPercentage({
    weiAmount: netDepositAmount,
    accountAddress,
    pools: [poolAddress]
  })

  const amountEstimatedGas = ethers.parseUnits('0.001', 18)
  const { fee: feeEstimatedGas } = useFeeStakeEntry()
  const feeAmountEstimatedGas =
    (amountEstimatedGas * BigInt(feeEstimatedGas?.value || 0n)) / ethers.parseEther('1')
  const netAmountEstimatedGas = amountEstimatedGas - feeAmountEstimatedGas
  const { delegations: delegationsEstimatedGas } = useCalculateDelegationPercentage({
    weiAmount: netAmountEstimatedGas,
    accountAddress,
    pools: [poolAddress]
  })

  const isDepositEnabled = enabled && netDepositAmount > 0n && !loadingDelegations

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2
  })

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    functionName: 'depositPool',
    args: [delegationsEstimatedGas, referral],
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

  const { config } = usePrepareStakeTogetherDepositPool({
    chainId,
    address: contracts.StakeTogether,
    args: [delegations, referral],
    account: accountAddress,
    enabled: delegations.length > 0 && accountAddress && isDepositEnabled,
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

  const { t } = useTranslation()

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
  }, [accountAddress, chainId, netDepositAmount, isSuccess, notify, poolAddress, registerDeposit, t])

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
  }, [accountAddress, netDepositAmount, failedToExecute, isError, notify, poolAddress, t])

  return {
    deposit,
    isLoading,
    isSuccess,
    estimatedGas: estimateGasCost,
    awaitWalletAction,
    txHash,
    resetState
  }
}
