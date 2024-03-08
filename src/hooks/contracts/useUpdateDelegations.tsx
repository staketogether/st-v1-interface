import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountDelegations } from '@/queries/subgraph/queryAccountDelegations'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { queryDelegationShares } from '@/queries/subgraph/queryDelegatedShares'
import { queryPoolActivities } from '@/queries/subgraph/queryPoolActivities'
import { queryPools } from '@/queries/subgraph/queryPools'
import { queryPoolsMarketShare } from '@/queries/subgraph/queryPoolsMarketShare'
import { queryStakeTogether } from '@/queries/subgraph/queryStakeTogether'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { ethereumMainnetClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { queryPool } from '../../queries/subgraph/queryPool'
import {
  stakeTogetherABI,
  usePrepareStakeTogetherUpdateDelegations,
  useStakeTogetherUpdateDelegations
} from '../../types/Contracts'
import useEstimateTxInfo from '../useEstimateTxInfo'
import useLocaleTranslation from '../useLocaleTranslation'
import useConnectedAccount from '../useConnectedAccount'
import { getContractsByProductName } from '@/config/product'

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
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [estimatedGas, setEstimatedGas] = useState<bigint | undefined>(undefined)

  // const { registerWithdraw } = useMixpanelAnalytics()
  const { isTestnet, stakeTogetherPool } = chainConfig()
  //VERIFICAR A NECESSIDADE DE ESPECIFICAR O PRODUTO
  const { StakeTogether } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })
  const { web3AuthUserInfo } = useConnectedAccount()
  const { t } = useLocaleTranslation()

  const updateDelegationEstimatedGas: PoolData[] = [
    {
      pool: stakeTogetherPool,
      percentage: ethers.parseUnits('1', 18)
    }
  ]
  const isUpdateDelegationEnabled = enabled

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    contractAddress: StakeTogether,
    functionName: 'updateDelegations',
    args: [updateDelegationEstimatedGas],
    abi: stakeTogetherABI,
    skip: estimateGasCost > 0n
  })

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } =
        await estimateGas()
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
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherUpdateDelegations({
    address: StakeTogether,
    args: [updateDelegationPools],
    account: accountAddress,
    enabled: isUpdateDelegationEnabled,
    gas: !!estimatedGas && estimatedGas > 0n && !!web3AuthUserInfo ? estimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n && !!web3AuthUserInfo ? maxFeePerGas : undefined,
    maxPriorityFeePerGas:
      !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n && !!web3AuthUserInfo
        ? maxPriorityFeePerGas
        : undefined,
    onError(error) {
      if (!error) {
        return
      }

      const { cause } = error as { cause?: { reason?: string; message?: string } }

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
    },
    onSuccess() {
      setPrepareTransactionErrorMessage('')
    }
  })
  const tx = useStakeTogetherUpdateDelegations({
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

  const updateDelegations = () => {
    setAwaitWalletAction(true)
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2,
    onSuccess: () => {
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
    updateDelegations,
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
