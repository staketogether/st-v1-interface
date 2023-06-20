import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { notification } from 'antd'
import { BigNumber, ethers, utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryPool } from '../../queries/queryPool'
import { usePrepareStakeTogetherWithdrawPool, useStakeTogetherWithdrawPool } from '../../types/Contracts'
import useTranslation from '../useTranslation'

export default function useWithdraw(
  withdrawAmount: string,
  accountAddress: `0x${string}`,
  poolAddress: `0x${string}`
) {
  const { contracts, chainId } = chainConfig()
  const [notify, setNotify] = useState(false)
  const { registerWithdraw } = useMixpanelAnalytics()
  const [estimateGas, setEstimateGas] = useState<string | undefined>(undefined)
  const [awaitWalletAction, setAwaitWalletAction] = useState(false)
  const withdrawRule =
    ethers.BigNumber.isBigNumber(withdrawAmount) && BigNumber.from(withdrawAmount).gt(0)

  const { config } = usePrepareStakeTogetherWithdrawPool({
    address: contracts.StakeTogether,
    args: [ethers.utils.parseEther(withdrawAmount), poolAddress],
    overrides: {
      from: accountAddress,
      gasLimit: BigNumber.from('300000')
    },
    enabled: !withdrawRule
  })

  const tx = useStakeTogetherWithdrawPool(config)
  const { provider } = chainConfig()

  const withdraw = () => {
    setAwaitWalletAction(true)
    tx.write?.()
    setNotify(true)
  }

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: tx.data?.hash
  })

  const { t } = useTranslation()

  useEffect(() => {
    if (tx.error) {
      setAwaitWalletAction(false)
    }
  }, [tx.error])

  useEffect(() => {
    const getEstimateGasPrice = async () => {
      try {
        if (config) {
          const gasPrice = await provider.estimateGas(config)
          const valueFormatted = utils.formatUnits(gasPrice, 'gwei')
          setEstimateGas(valueFormatted)
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (config) {
      getEstimateGasPrice()
    }
  }, [config, provider])

  useEffect(() => {
    if (isSuccess && withdrawAmount !== '0') {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
      registerWithdraw(accountAddress, chainId, poolAddress, withdrawAmount)
      if (notify) {
        notification.success({
          message: `${t('notifications.withdrawSuccess')} ${withdrawAmount} ${t('eth.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, isSuccess, notify, poolAddress, registerWithdraw, t, withdrawAmount])

  useEffect(() => {
    if (isError) {
      if (notify) {
        notification.error({
          message: `${t('notifications.withdrawError')} ${withdrawAmount} ${t('eth.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, isError, notify, poolAddress, t, withdrawAmount])

  return { withdraw, estimateGas, isLoading, isSuccess, awaitWalletAction }
}
