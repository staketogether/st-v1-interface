import usePooledEthByShares from '@/hooks/contracts/usePooledEthByShares'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { queryAccount } from '../../queries/queryAccount'
import { Account } from '../../types/Account'
import { Delegation } from '../../types/Delegation'

export default function useStAccount(address: `0x${string}`) {
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [accountIsLoading, setAccountIsLoading] = useState<boolean>(false)
  const [accountSentDelegationsCount, setAccountSentDelegationsCount] = useState<bigint>(0n)
  const [accountDelegations, setAccountDelegations] = useState<Delegation[]>([])
  const [accountBalance, setAccountBalance] = useState<bigint>(0n)
  const [accountRewardsBalance, setAccountRewardsBalance] = useState<bigint>(0n)

  const { data, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: address.toLowerCase() }
  })

  const { balance } = usePooledEthByShares(account?.shares || '0')

  useEffect(() => {
    const account = data?.account
    const originalBalance = BigInt(account?.originalBalance || 0n)
    const rewards = balance - originalBalance + 1n
    setAccount(account)
    setAccountDelegations(account?.delegations || [])
    setAccountSentDelegationsCount(BigInt(account?.sentDelegationsCount || 0n))
    setAccountBalance(balance)
    setAccountRewardsBalance(rewards)
  }, [balance, data])

  useEffect(() => {
    setAccountIsLoading(loading)
  }, [loading, setAccountIsLoading])

  return {
    account,
    accountBalance,
    accountRewardsBalance,
    accountDelegations,
    accountSentDelegationsCount,
    accountIsLoading
  }
}
