import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryAccount } from '../../queries/subgraph/queryAccount'
import { Account } from '../../types/Account'
import { Delegation } from '../../types/Delegation'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { AccountActivity } from '@/types/AccountActivity'
import { AccountReward } from '@/types/AccountReward'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'

export default function useStAccount(address: `0x${string}`) {
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

  const { data: accountData, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: address.toLowerCase() }
  })

  const { data: activitiesData, loading: activitiesLoading } = useQuery<{
    accountActivities: AccountActivity[]
  }>(queryAccountActivities, {
    variables: { accountAddress: address.toLowerCase() }
  })

  const { data: rewardsData, loading: rewardsLoading } = useQuery<{ accountRewards: AccountReward[] }>(
    queryAccountRewards,
    {
      variables: { accountAddress: address.toLowerCase() }
    }
  )

  useEffect(() => {
    if (accountData && accountData.account) {
      const account = accountData.account
      setAccount(accountData.account)
      setAccountDelegations(account.delegations || [])
      setAccountSentDelegationsCount(account.sentDelegationsCount)
      setAccountBalance(account.balance)
      setAccountTotalRewards(account.totalRewards)
    }
  }, [accountData])

  useEffect(() => {
    if (activitiesData && activitiesData.accountActivities) {
      setAccountActivities(activitiesData.accountActivities)
    }
  }, [activitiesData])

  useEffect(() => {
    if (rewardsData && rewardsData.accountRewards) {
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
    accountActivities,
    accountRewards,
    accountBalance,
    accountTotalRewards,
    accountDelegations,
    accountSentDelegationsCount,
    accountIsLoading,
    accountRewardIsLoading,
    accountActivitiesIsLoading
  }
}
