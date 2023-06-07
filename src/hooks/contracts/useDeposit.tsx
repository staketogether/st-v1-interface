import { notification } from 'antd'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { apolloClient } from '../../config/apollo'
import chainConfig from '../../config/chain'
import { queryAccount } from '../../queries/queryAccount'
import { queryPool } from '../../queries/queryPool'
import { usePrepareStakeTogetherDepositPool, useStakeTogetherDepositPool } from '../../types/Contracts'
import useTranslation from '../useTranslation'
import { useMixpanelAnalytics } from "@/hooks/analytics/useMixpanelAnalytics";

export default function useDeposit(
  depositAmount: string,
  accountAddress: `0x${string}`,
  poolAddress: `0x${string}`
) {
  const { contracts, chainId } = chainConfig()
  const [notify, setNotify] = useState(false)
  const { registerDeposit } = useMixpanelAnalytics()

  const depositRule = ethers.BigNumber.isBigNumber(depositAmount) && BigNumber.from(depositAmount).gt(0)

  // Todo! Implement Referral
  const referral = '0x0000000000000000000000000000000000000000'

  const { config } = usePrepareStakeTogetherDepositPool({
    address: contracts.StakeTogether,
    args: [poolAddress, referral],
    overrides: {
      from: accountAddress,
      value: ethers.utils.parseEther(depositAmount),
      gasLimit: BigNumber.from('300000')
    },
    enabled: !depositRule
  })

  const tx = useStakeTogetherDepositPool(config)

  const deposit = () => {
    tx.write?.()
    setNotify(true)
  }

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: tx.data?.hash
  })

  const { t } = useTranslation()

  useEffect(() => {
    if (isSuccess && depositAmount !== '0') {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
      registerDeposit(accountAddress, chainId, poolAddress, depositAmount)
      if (notify) {
        notification.success({
          message: `${t('notifications.depositSuccess')}: ${depositAmount} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, chainId, depositAmount, isSuccess, notify, poolAddress, registerDeposit, t])

  useEffect(() => {
    if (isError) {
      apolloClient.refetchQueries({
        include: [queryAccount, queryPool]
      })
      if (notify) {
        notification.error({
          message: `${t('notifications.depositError')}: ${depositAmount} ${t('lsd.symbol')}`,
          placement: 'topRight'
        })
        setNotify(false)
      }
    }
  }, [accountAddress, depositAmount, isError, notify, poolAddress, t])

  return { deposit, isLoading, isSuccess }
}
