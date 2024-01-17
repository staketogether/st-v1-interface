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

import useLocaleTranslation from '../useLocaleTranslation'
import { AccountClaimableReports } from '@/types/Incentives'
import { AccountReportMerkleData } from '@/types/AccountReportMerkleData'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useConnectedAccount from '../useConnectedAccount'
import { queryAccountReportMerkleData } from '@/queries/subgraph/queryReportIncentivesPerReportBlock'
import { queryReportIncentivesPerAccount } from '@/queries/subgraph/queryReportIncentivesPerAccount'

export default function useUserAirdropClaim(
  reportIncentive: AccountClaimableReports,
  accountReportMerkleData: AccountReportMerkleData,
  accountAddress: `0x${string}`,
  userProof: string[],
  enabled: boolean
) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [depositEstimatedGas, setDepositEstimatedGas] = useState<bigint | undefined>(undefined)

  const { contracts } = chainConfig()
  const { web3AuthUserInfo } = useConnectedAccount()
  // const { registerWithdraw } = useMixpanelAnalytics()
  const isUpdateDelegationEnabled = enabled
  const { t } = useLocaleTranslation()

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    functionName: 'airdropClaim',
    args: [
      BigInt(reportIncentive.reportBlock),
      BigInt(accountReportMerkleData.index),
      accountAddress,
      BigInt(accountReportMerkleData.sharesAmount),
      accountReportMerkleData.proof as `0x${string}`[]
    ],
    contractAddress: contracts.Airdrop,
    abi: airdropABI,
    skip: !isUpdateDelegationEnabled
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
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareAirdropClaim({
    address: contracts.Airdrop,
    args: [
      BigInt(reportIncentive.reportBlock),
      BigInt(accountReportMerkleData.index),
      accountAddress,
      BigInt(accountReportMerkleData.sharesAmount),
      accountReportMerkleData.proof as `0x${string}`[]
    ],
    account: accountAddress,
    enabled: isUpdateDelegationEnabled,
    gas:
      !!depositEstimatedGas && depositEstimatedGas > 0n && !!web3AuthUserInfo ? depositEstimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && !!web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas:
      !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && !!web3AuthUserInfo
        ? maxPriorityFeePerGas
        : undefined,
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
      setAwaitWalletAction(false)
      notification.error({
        message: t('v2.incentives.transactionModal.transactionErrorMessage'),
        placement: 'topRight'
      })
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
          queryStakeTogether,
          queryAccountReportMerkleData,
          queryReportIncentivesPerAccount
        ]
      })

      notification.success({
        message: t('v2.incentives.transactionModal.successMessage'),
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
