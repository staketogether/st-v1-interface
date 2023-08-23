import { airdropABI, useAirdropClaim, usePrepareAirdropClaim } from "@/types/Contracts";
import chainConfig from "@/config/chain";
import { useEffect, useState } from "react";
import { useMixpanelAnalytics } from "@/hooks/analytics/useMixpanelAnalytics";
import { useWaitForTransaction } from "wagmi";
import useTranslation from "@/hooks/useTranslation";
import useEstimateTxInfo from "@/hooks/useEstimateTxInfo";
import { notification } from "antd";

interface UseClaimAirdropProps {
  epoch?: bigint,
  index?: bigint,
  accountAddress?: `0x${string}`,
  sharesAmount?: bigint,
  merkleProof?: `0x${string}`[],
}

export const useClaimAirdrop = ({ epoch, index, accountAddress, sharesAmount, merkleProof }: UseClaimAirdropProps) => {
  const { chainId, contracts } = chainConfig()
  const isAirdropReady = Boolean(!!epoch && !!index && !!accountAddress && !!sharesAmount && !!merkleProof)

  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [notify, setNotify] = useState(false)
  const [failedToExecute, setFailedToExecute] = useState(false)
  const [maxFeePerGas, setMaxFeePerGas] = useState<bigint | undefined>(undefined)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<bigint | undefined>(undefined)
  const [estimatedGas, setEstimatedGas] = useState<bigint | undefined>(undefined)
  const [estimatedGasCost, setEstimatedGasCost] = useState(0n)

  const { registerAirdropClaim } = useMixpanelAnalytics()
  const { t } = useTranslation()

  const { estimateGas } = useEstimateTxInfo({
    account: accountAddress,
    functionName: 'claim',
    args: [epoch || 0n, index || 0n, accountAddress || '0x', sharesAmount || 0n, merkleProof || ['0x']],
    contractAddress: contracts.Airdrop,
    abi: airdropABI,
    skip: !isAirdropReady || estimatedGasCost > 0n
  })

  const { config } = usePrepareAirdropClaim({
    chainId,
    address: contracts.Airdrop,
    enabled: isAirdropReady,
    args: [epoch || 0n, index || 0n, accountAddress || '0x', sharesAmount || 0n, merkleProof || ['0x']],
    gas: !!estimatedGas && estimatedGas > 0n ? estimatedGas : undefined,
    maxFeePerGas: !!maxFeePerGas && maxFeePerGas > 0n ? maxFeePerGas : undefined,
    maxPriorityFeePerGas: !!maxPriorityFeePerGas && maxPriorityFeePerGas > 0n ? maxPriorityFeePerGas : undefined
  })

  const tx = useAirdropClaim({
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

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: txHash
  })

  const claim = () => {
    setAwaitWalletAction(true)
    tx.write?.()
    setNotify(true)
  }

  const resetState = () => {
    setAwaitWalletAction(false)
    setTxHash(undefined)
    setFailedToExecute(false)
  }

  useEffect(() => {
    const handleEstimateGasPrice = async () => {
      const { estimatedCost, estimatedGas, estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } =
        await estimateGas()
      setEstimatedGas(estimatedGas)
      setEstimatedGasCost(estimatedCost)
      setMaxFeePerGas(estimatedMaxFeePerGas)
      setMaxPriorityFeePerGas(estimatedMaxPriorityFeePerGas)
    }

    if (estimatedGasCost === 0n) {
      handleEstimateGasPrice()
    }
  }, [estimateGas, estimatedGasCost])

  useEffect(() => {
    if (isSuccess && accountAddress && epoch && index && sharesAmount) {
      // TODO: Refetch queries to update the UI
      registerAirdropClaim(accountAddress, chainId, epoch, index, sharesAmount.toString())
      if (notify) {
        notification.success({
          message: `${t('notifications.claimAirdropSuccess')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, epoch, index, isSuccess, notify, registerAirdropClaim, sharesAmount, t])

  useEffect(() => {
    if (isError || failedToExecute) {
      // TODO: Refetch queries to update the UI
      if (notify) {
        notification.error({
          message: `${t('notifications.claimAirdropError')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
      setFailedToExecute(false)
    }
  }, [failedToExecute, isError, notify, t])
  
  return {
    claim,
    isLoading,
    isSuccess,
    estimatedGas,
    estimatedGasCost,
    awaitWalletAction,
    txHash,
    resetState
  }
}
