import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { notification } from 'antd'
import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import { useAirdropClaim, usePrepareAirdropClaim } from '../../types/Contracts'

import useLocaleTranslation from '../useLocaleTranslation'
import { AccountClaimableReports } from '@/types/Incentives'

export default function useUserAirdropClaim(
  reportIncentive: AccountClaimableReports,
  accountAddress: `0x${string}`,
  userProof: string[],
  enabled: boolean
) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')
  const { contracts } = chainConfig()
  const { t } = useLocaleTranslation()
  // const { registerWithdraw } = useMixpanelAnalytics()
  const isUpdateDelegationEnabled = enabled

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
        message: t('v2.incentives.transactionModal.transactionErrorMessage'),
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
        message: t('v2.incentives.transactionModal.transactionSuccessMessage'),
        placement: 'topRight'
      })
    },
    onError: () => {
      setAwaitWalletAction(false)
      notification.error({
        message: t('v2.incentives.transactionModal.transactionErrorMessage'),
        placement: 'topRight'
      })
    }
  })

  const resetState = () => {
    setTxHash(undefined)
  }

  return {
    claim,
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
