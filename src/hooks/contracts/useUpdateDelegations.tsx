import { useEffect, useState } from 'react'
import {
  useSimulateContract,
  useWaitForTransactionReceipt as useWaitForTransaction,
  useWriteContract
} from 'wagmi'
import chainConfig from '../../config/chain'
import { stakeTogetherABI } from '../../types/Contracts'
import useConnectedAccount from '../useConnectedAccount'
import { getContractsByProductName } from '@/config/product'
import { notification } from 'antd'
import useLocaleTranslation from '../useLocaleTranslation'
import { ethereumMainnetClient } from '@/config/apollo'
import { queryAccount } from '@/queries/subgraph/queryAccount'
import { queryPool } from '@/queries/subgraph/queryPool'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'

export type PoolData = {
  pool: `0x${string}`
  percentage: bigint
}

export default function useUpdateDelegations(
  enabled: boolean,
  updateDelegationPools: PoolData[],
  accountAddress?: `0x${string}`
) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [estimateGasCost] = useState(0n)
  const [maxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [estimatedGas] = useState<bigint | undefined>(undefined)

  // const { registerWithdraw } = useMixpanelAnalytics()
  const { isTestnet, chainId } = chainConfig()
  //VERIFICAR A NECESSIDADE DE ESPECIFICAR O PRODUTO
  const { StakeTogether } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })

  // const { stakeTogetherPool } = getProductByName({
  //   productName: 'ethereum-stake'
  // })

  const { web3AuthUserInfo } = useConnectedAccount()
  const { t } = useLocaleTranslation()

  // const updateDelegationEstimatedGas: PoolData[] = [
  //   {
  //     pool: stakeTogetherPool[isTestnet ? 'testnet' : 'mainnet'],
  //     percentage: ethers.parseUnits('1', 18)
  //   }
  // ]
  const isUpdateDelegationEnabled = enabled

  // const { estimateGas } = useEstimateTxInfo({
  //   account: accountAddress,
  //   contractAddress: StakeTogether,
  //   functionName: 'updateDelegations',
  //   args: [updateDelegationEstimatedGas],
  //   abi: stakeTogetherABI,
  //   skip: estimateGasCost > 0n
  // })

  // useEffect(() => {
  //   const handleEstimateGasPrice = async () => {
  //     const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } =
  //       await estimateGas()
  //     setEstimatedGas(estimatedGas)
  //     setEstimateGasCost(estimatedCost)
  //     setMaxFeePerGas(estimatedMaxFeePerGas)
  //     setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
  //   }

  //   if (estimateGasCost === 0n) {
  //     handleEstimateGasPrice()
  //   }
  // }, [estimateGas, estimateGasCost])

  const {
    data: prepareTransactionData,
    error: prepareTransactionError,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = useSimulateContract({
    query: {
      enabled: isUpdateDelegationEnabled
    },
    address: StakeTogether,
    args: [updateDelegationPools],
    account: accountAddress,
    abi: stakeTogetherABI,

    chainId,
    functionName: 'updateDelegations',
    gas: !!estimatedGas && estimatedGas > 0n && !!web3AuthUserInfo ? estimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && !!web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas:
      !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && !!web3AuthUserInfo
        ? maxPriorityFeePerGas
        : undefined
  })

  useEffect(() => {
    if (!prepareTransactionIsError) {
      return
    }

    const { cause } = prepareTransactionError as { cause?: { reason?: string; message?: string } }

    if (
      (!cause || !cause.reason) &&
      !!web3AuthUserInfo &&
      cause?.message &&
      cause.message.includes(
        'The total cost (gas * gas fee + value) of executing this transaction exceeds the balance'
      )
    ) {
      notification.warning({
        message: `${t('v2.stake.depositErrorMessage.insufficientGasBalance')}, ${t(
          'v2.stake.depositErrorMessage.useMaxButton'
        )}`,
        placement: 'topRight'
      })
      setPrepareTransactionErrorMessage('insufficientGasBalance')

      return
    }

    const { data } = cause as { data?: { errorName?: string } }

    if (cause && data && data.errorName) {
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
    confirmations: 2
  })

  useEffect(() => {
    if (awaitTransactionSuccess) {
      setAwaitWalletAction(false)
      ethereumMainnetClient.refetchQueries({
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
  }, [awaitTransactionSuccess, t])

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
