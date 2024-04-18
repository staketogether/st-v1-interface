import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { notification } from 'antd'
import { useEffect, useState } from 'react'
import { useSimulateContract, useWaitForTransactionReceipt as useWaitForTransaction, useWriteContract } from 'wagmi'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'

import { WithdrawType } from '@/types/Withdraw'
import { ethers } from 'ethers'

import { getSubgraphClient } from '@/config/apollo'
import { chainConfigByChainId } from '@/config/chain'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { stakeTogetherAbi } from '@/types/Contracts'
import { ProductStaking } from '@/types/ProductStaking'
import useConnectedAccount from '../useConnectedAccount'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'

export default function useWithdrawValidator(
  withdrawAmount: string,
  poolAddress: `0x${string}`,
  enabled: boolean,
  product: ProductStaking,
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
  const { isTestnet } = chainConfigByChainId(chainId)
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']
  const subgraphClient = getSubgraphClient({ productName: product.name, isTestnet })
  const { web3AuthUserInfo } = useConnectedAccount()

  const { t } = useLocaleTranslation()

  const amount = ethers.parseUnits(withdrawAmount.toString(), 18)
  const isWithdrawEnabled = enabled && amount > 0n

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: StakeTogether,
    functionName: 'withdrawBeacon',
    args: [amount, poolAddress],
    abi: stakeTogetherAbi,
    skip: !isWithdrawEnabled || estimateGasCost > 0n
  })

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } = await estimateGas()

      setEstimatedGas(estimatedGas)
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
    args: [amount, poolAddress],
    account: accountAddress,
    abi: stakeTogetherAbi,
    functionName: 'withdrawBeacon',
    gas: !!estimatedGas && estimatedGas > 0n && !!web3AuthUserInfo ? estimatedGas : undefined,
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
          message: `${t('v2.stake.insufficientGasBalance')}, ${t('v2.stake.useMaxButton')}`,
          placement: 'topRight'
        })
        setPrepareTransactionErrorMessage('insufficientGasBalance')

        return
      }

      const { data } = cause as { data?: { errorName?: string } }

      if (cause && data && data.errorName) {
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

  const withdrawValidator = () => {
    setAwaitWalletAction(true)
    writeContract(prepareTransactionData!.request)
  }

  return {
    withdrawValidator,
    estimatedCost: 0n,
    isLoading,
    isSuccess: awaitTransactionSuccess,
    awaitWalletAction,
    txHash,
    resetState: writeContractReset,
    prepareTransactionIsError,
    prepareTransactionIsSuccess,
    prepareTransactionErrorMessage,
    prepareTransactionsIsLoading
  }
}
