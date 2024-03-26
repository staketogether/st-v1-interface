import { useState } from 'react'
import {
  useSimulateContract,
  useWaitForTransactionReceipt as useWaitForTransaction,
  useWriteContract
} from 'wagmi'
import chainConfig from '../../config/chain'
import { stakeTogetherABI } from '../../types/Contracts'
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
  // const { t } = useLocaleTranslation()

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
    data,
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
    // onError(error) {
    //   if (!error) {
    //     return
    //   }

    //   const { cause } = error as { cause?: { reason?: string; message?: string } }

    //   if (
    //     (!cause || !cause.reason) &&
    //     !!web3AuthUserInfo &&
    //     cause?.message &&
    //     cause.message.includes(
    //       'The total cost (gas * gas fee + value) of executing this transaction exceeds the balance'
    //     )
    //   ) {
    //     notification.warning({
    //       message: `${t('v2.stake.depositErrorMessage.insufficientGasBalance')}, ${t(
    //         'v2.stake.depositErrorMessage.useMaxButton'
    //       )}`,
    //       placement: 'topRight'
    //     })
    //     setPrepareTransactionErrorMessage('insufficientGasBalance')

    //     return
    //   }

    //   const { data } = cause as { data?: { errorName?: string } }

    //   if (cause && data && data.errorName) {
    //     setPrepareTransactionErrorMessage(data.errorName)
    //   }
    // },
    // onSuccess() {
    //   setPrepareTransactionErrorMessage('')
    // }
  })
  const { writeContract } = useWriteContract()
  // const tx = useStakeTogetherUpdateDelegations({
  //   ...config,
  //   onSuccess: data => {
  //     if (data?.hash) {
  //       setTxHash(data?.hash)
  //     }
  //   },
  //   onError: () => {
  //     notification.error({
  //       message: t('v2.updateDelegations.transactionMessages.walletError'),
  //       placement: 'topRight'
  //     })
  //     setAwaitWalletAction(false)
  //   }
  // })

  const updateDelegations = () => {
    setAwaitWalletAction(true)
    writeContract(data!.request)
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: txHash,
    confirmations: 2
    // onSuccess: () => {
    //   setAwaitWalletAction(false)
    //   ethereumMainnetClient.refetchQueries({
    //     include: [
    //       queryAccount,
    //       queryPool,
    //       queryDelegationShares,
    //       queryAccountActivities,
    //       queryAccountDelegations,
    //       queryAccountRewards,
    //       queryPoolActivities,
    //       queryPools,
    //       queryPoolsMarketShare,
    //       queryStakeTogether
    //     ]
    //   })

    //   notification.success({
    //     message: t('v2.updateDelegations.transactionMessages.successful'),
    //     placement: 'topRight'
    //   })
    // },
    // onError: () => {
    //   setAwaitWalletAction(false)
    //   notification.error({
    //     message: t('v2.updateDelegations.transactionMessages.walletError'),
    //     placement: 'topRight'
    //   })
    // }
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
