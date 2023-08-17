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
import { useCalculateDelegationShares } from '@/hooks/contracts/useCalculateDelegationShares'
import useEstimateTxInfo from '../useEstimateTxInfo'
import { truncateWei } from '@/services/truncate'

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
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [failedToExecute, setFailedToExecute] = useState(false)
  const { registerDeposit } = useMixpanelAnalytics()

  const { delegations } = useCalculateDelegationShares({
    weiAmount: netDepositAmount,
    accountAddress,
    pools: [poolAddress],
    onlyUpdatedPools: true
  })

  const isDepositEnabled = enabled && netDepositAmount > 0n

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash
  })

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    functionName: 'depositPool',
    args: [delegations, referral],
    contractAddress: contracts.StakeTogether,
    abi: stakeTogetherABI,
    value: grossDepositAmount,
    skip: !isDepositEnabled || estimateGasCost > 0n
  })

  useEffect(() => {
    const handleMaxValue = async () => {
      const { estimatedCost } = await estimateGas()
      if (estimatedCost > 0n) {
        setEstimateGasCost(estimatedCost)
      }
    }
    handleMaxValue()
  }, [estimateGas])

  const { config } = usePrepareStakeTogetherDepositPool({
    chainId,
    address: contracts.StakeTogether,
    args: [delegations, referral],
    account: accountAddress,
    enabled: delegations.length > 0 && accountAddress && isDepositEnabled,
    value: grossDepositAmount
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
  }

  useEffect(() => {
    if (isSuccess && accountAddress) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool, queryDelegationShares]
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
