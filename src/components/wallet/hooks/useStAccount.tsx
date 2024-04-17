import { getSubgraphClient } from '@/config/apollo'
import { chainConfigByChainId } from '@/config/chain'
import { queryAccountActivities } from '@/queries/subgraph/queryAccountActivities'
import { queryAccountRewards } from '@/queries/subgraph/queryAccountRewards'
import { AccountActivity } from '@/types/AccountActivity'
import { AccountReward } from '@/types/AccountReward'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryAccount } from '../../../queries/subgraph/queryAccount'
import { Account } from '../../../types/Account'
import { Delegation } from '../../../types/Delegation'

type useStAccountProps = {
  address?: `0x${string}`
  productName: string
  chainId: number
}

export default function useStAccount({ address, productName, chainId }: useStAccountProps) {
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
  const { isTestnet } = chainConfigByChainId(chainId)
  const client = getSubgraphClient({ productName: productName, isTestnet })

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

  const { data: rewardsData, loading: rewardsLoading } = useQuery<{ accountRewards: AccountReward[] }>(
    queryAccountRewards,
    {
      client,
      skip: !address,
      variables: {
        accountAddress: address?.toLowerCase()
      }
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
      setAccountProfitPercentage(account.profitPercentage)
      setAccountShare(account.shares)
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
