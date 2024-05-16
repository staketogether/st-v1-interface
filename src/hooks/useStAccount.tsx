import { getSubgraphClient } from '@/config/apollo'
import { queryAccount } from '@/queries/subgraph/queryAccount'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { Account } from '@/types/Account'
import { AccountActivity } from '@/types/AccountActivity'
import { AccountReward } from '@/types/AccountReward'
import { Delegation } from '@/types/Delegation'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

interface useStAccountProps {
  address?: `0x${string}`
  productName: 'eth-staking' | 'eth-restaking'
  chainId: number
}

export default function useStAccount({ address, productName }: useStAccountProps) {
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [accountActivities, setAccountActivities] = useState<AccountActivity[]>([])
  const [accountRewards, setAccountRewards] = useState<AccountReward[]>([])
  const [accountIsLoading, setAccountIsLoading] = useState<boolean>(false)
  const [accountActivitiesIsLoading, setAccountActivitiesIsLoading] = useState<boolean>(false)
  const [accountRewardIsLoading, setAccountRewardIsLoading] = useState<boolean>(false)
  const [accountSentDelegationsCount, setAccountSentDelegationsCount] = useState<bigint>(0n)
  const [accountDelegations, setAccountDelegations] = useState<Delegation[]>([])
  const [accountBalance, setAccountBalance] = useState<bigint>(0n)
  const [accountTotalRewards, setAccountTotalRewards] = useState<bigint>(0n)
  const [accountProfitPercentage, setAccountProfitPercentage] = useState<bigint>(0n)
  const [accountShare, setAccountShare] = useState<bigint>(0n)
  const client = getSubgraphClient({ stakingId: productName })

  const { data: accountData, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: address?.toLowerCase() },
    skip: !address,
    client
  })

  const { data: activitiesData, loading: activitiesLoading } = useQuery<{
    accountActivities: AccountActivity[]
  }>(queryAccountActivities, {
    variables: { accountAddress: address?.toLowerCase(), first: 10, skip: 0 },
    skip: !address,
    client
  })

  const { data: rewardsData, loading: rewardsLoading } = useQuery<{ accountRewards: AccountReward[] }>(queryAccountRewards, {
    client,
    skip: !address,
    variables: {
      accountAddress: address?.toLowerCase()
    }
  })

  useEffect(() => {
    if (accountData?.account) {
      const targetAccount = accountData.account
      setAccount(accountData.account)
      setAccountDelegations(targetAccount.delegations || [])
      setAccountSentDelegationsCount(targetAccount.sentDelegationsCount)
      setAccountBalance(targetAccount.balance)
      setAccountTotalRewards(targetAccount.totalRewards)
      setAccountProfitPercentage(targetAccount.profitPercentage)
      setAccountShare(targetAccount.shares)
    } else {
      setAccount(undefined)
      setAccountDelegations([])
      setAccountSentDelegationsCount(0n)
      setAccountBalance(0n)
      setAccountTotalRewards(0n)
      setAccountProfitPercentage(0n)
      setAccountShare(0n)
    }
  }, [accountData])

  useEffect(() => {
    if (activitiesData?.accountActivities) {
      setAccountActivities(activitiesData.accountActivities)
    }
  }, [activitiesData])

  useEffect(() => {
    if (rewardsData?.accountRewards) {
      setAccountRewards(rewardsData.accountRewards)
    }
  }, [rewardsData])

  useEffect(() => {
    setAccountIsLoading(loading)
  }, [loading, setAccountIsLoading])

  useEffect(() => {
    setAccountActivitiesIsLoading(activitiesLoading)
  }, [activitiesLoading, setAccountActivitiesIsLoading])

  useEffect(() => {
    setAccountRewardIsLoading(rewardsLoading)
  }, [rewardsLoading, setAccountRewardIsLoading])

  return {
    account,
    accountData: accountData?.account,
    accountActivities,
    accountRewards,
    accountBalance,
    accountTotalRewards,
    accountShare,
    accountDelegations,
    accountSentDelegationsCount,
    accountProfitPercentage,
    accountIsLoading,
    accountRewardIsLoading,
    accountActivitiesIsLoading
  }
}
