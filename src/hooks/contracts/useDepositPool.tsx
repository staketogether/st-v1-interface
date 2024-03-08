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
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
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
import useStConfig from './useStConfig'
import useConnectedAccount from '../useConnectedAccount'
import { Product } from '@/types/Product'
import { getSubgraphClient } from '@/config/apollo'

export default function useDepositPool(
  netDepositAmount: bigint,
  grossDepositAmount: bigint,
  poolAddress: `0x${string}`,
  enabled: boolean,
  product: Product,
  accountAddress: `0x${string}` | undefined
) {
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [prepareTransactionErrorMessage, setPrepareTransactionErrorMessage] = useState('')

  const [estimateGasCost, setEstimateGasCost] = useState(0n)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [depositEstimatedGas, setDepositEstimatedGas] = useState<bigint | undefined>(undefined)

  const { registerDeposit } = useMixpanelAnalytics()
  const { chainId, isTestnet } = chainConfig()
  const subgraphClient = getSubgraphClient({ productName: product.name, isTestnet })

  const { web3AuthUserInfo } = useConnectedAccount()
  const { stConfig, loading: stConfigLoading } = useStConfig({ productName: product.name })
  const { t } = useLocaleTranslation()

  const amountEstimatedGas = stConfig?.minDepositAmount || 0n
  const isDepositEnabled = enabled && netDepositAmount > 0n && !stConfigLoading
  const isDepositEstimatedGas = !enabled && stConfigLoading
  const { StakeTogether } = product.contracts[isTestnet ? 'testnet' : 'mainnet']
  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { estimateGas } = useEstimateTxInfo({
    account: StakeTogether,
    functionName: 'depositPool',
    args: [poolAddress, referral],
    contractAddress: StakeTogether,
    abi: stakeTogetherABI,
    value: amountEstimatedGas,
    skip: isDepositEstimatedGas && estimateGasCost > 0n
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

  useEffect(() => {
    if (accountAddress) {
      setDepositEstimatedGas(undefined)
      setEstimateGasCost(0n)
      setMaxFeePerGas(undefined)
      setMaxPriorityFeePerGas(undefined)
    }
  }, [accountAddress])

  const {
    config,
    isError: prepareTransactionIsError,
    isSuccess: prepareTransactionIsSuccess
  } = usePrepareStakeTogetherDepositPool({
    chainId,
    address: StakeTogether,
    args: [poolAddress, referral],
    account: accountAddress,
    enabled: accountAddress && isDepositEnabled,
    value: grossDepositAmount,
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
          message: `${t('v2.stake.insufficientGasBalance')}, ${t('v2.stake.depositErrorMessage.useMaxButton')}`,
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

  const tx = useStakeTogetherDepositPool({
    ...config,
    onSuccess: data => {
      if (data?.hash) {
        setTxHash(data?.hash)
      }
    },
    onError: () => {
      notification.error({
        message: `${t('v2.stake.userRejectedTheRequest')}`,
        placement: 'topRight'
      })
      setAwaitWalletAction(false)
    }
  })

  const deposit = () => {
    setAwaitWalletAction(true)
    tx.write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2,
    onSuccess: () => {
      setAwaitWalletAction(false)
      notification.success({
        message: `${t('notifications.depositSuccess')}: ${truncateWei(netDepositAmount, 4)} ${t('lsd.symbol')}`,
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
        registerDeposit(accountAddress, chainId, poolAddress, truncateWei(netDepositAmount, 4))
      }
    },
    onError: () => {
      setAwaitWalletAction(false)
      notification.error({
        message: `${t('notifications.depositError')}: ${truncateWei(netDepositAmount, 4)} ${t('lsd.symbol')}`,
        placement: 'topRight'
      })

      subgraphClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
    }
  })

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
  }

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
