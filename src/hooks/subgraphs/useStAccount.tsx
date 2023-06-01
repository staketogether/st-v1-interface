import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryAccount } from '../../queries/queryAccount'
import { Account } from '../../types/Account'

export default function useStAccount(address: `0x${string}`) {
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [accountIsLoading, setAccountIsLoading] = useState<boolean>(false)
  const [accountSentDelegationsCount, setAccountSentDelegationsCount] = useState<number>(0)

  const [accountRewardShares, setAccountRewardShares] = useState<string>('0')
  const [accountBalance, setAccountBalance] = useState<string>('0')

  const { data, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: address.toLowerCase() }
  })

  useEffect(() => {
    const account = data?.account
    setAccount(account)
    setAccountSentDelegationsCount(account?.sentDelegationsCount || 0)

    if (account) {
      setAccountBalance(account.shares.toString())
      setAccountRewardShares(account.rewardsShares.toString())
    }
  }, [data])

  useEffect(() => {
    setAccountIsLoading(loading)
  }, [loading, setAccountIsLoading])

  return {
    account,
    accountBalance,
    accountRewardShares,
    accountSentDelegationsCount,
    accountIsLoading
  }
}
