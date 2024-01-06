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
import { airdropABI, useAirdropClaim, usePrepareAirdropClaim } from '../../types/Contracts'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import { ReportIncentive } from '@/types/Incentives'

export default function useUserAirdropClaim(
  reportIncentive: ReportIncentive,
  accountAddress: `0x${string}`,
  userProof: string[],
  enabled: boolean
) {
  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const { contracts } = chainConfig()
  const { t } = useLocaleTranslation()
  // const { registerWithdraw } = useMixpanelAnalytics()
  const isUpdateDelegationEnabled = enabled
  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: contracts.Airdrop,
    functionName: 'claim',
    args: [
      BigInt(reportIncentive.reportBlock),
      BigInt(reportIncentive.index),
      accountAddress,
      reportIncentive.sharesAmount,
      userProof as `0x${string}`[]
    ],
    abi: airdropABI,
    skip: estimateGasCost > 0n
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
  } = usePrepareAirdropClaim({
    address: contracts.Airdrop,
    args: [
      BigInt(reportIncentive.reportBlock),
      BigInt(reportIncentive.index),
      accountAddress,
      reportIncentive.sharesAmount,
      userProof as `0x${string}`[]
    ],
    account: accountAddress,
    enabled: isUpdateDelegationEnabled,
    onError(error) {
      if (!error) {
        return
      }
      const { cause } = error as { cause?: { reason?: string } }

      if (!cause) {
        return
      }

      const { data } = cause as { data?: { errorName?: string } }

      if (cause && data && data.errorName) {
        setPrepareTransactionErrorMessage(data.errorName)
      }
    },
    onSuccess() {
      setPrepareTransactionErrorMessage('')
    }
  })
  const tx = useAirdropClaim({
    ...config,
    onSuccess: data => {
      if (data?.hash) {
        setTxHash(data?.hash)
      }
    },
    onError: () => {
      notification.error({
        message: t('v2.updateDelegations.transactionMessages.walletError'),
        placement: 'topRight'
      })
      setAwaitWalletAction(false)
    }
  })

  const claim = () => {
    setAwaitWalletAction(true)
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2,
    onSuccess: () => {
      setAwaitWalletAction(false)
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

      notification.success({
        message: t('v2.updateDelegations.transactionMessages.successful'),
        placement: 'topRight'
      })
    },
    onError: () => {
      setAwaitWalletAction(false)
      notification.error({
        message: t('v2.updateDelegations.transactionMessages.walletError'),
        placement: 'topRight'
      })
    }
  })

  const resetState = () => {
    setTxHash(undefined)
  }

  return {
    claim,
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
