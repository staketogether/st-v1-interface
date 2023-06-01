import { useQuery } from '@apollo/client'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { queryAccount } from '../../queries/queryAccount'
import { Account } from '../../types/Account'

export default function useStAccount(address: `0x${string}`) {
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [accountIsLoading, setAccountIsLoading] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accountTotalDelegations, setAccountTotalDelegations] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accountDelegationAmount, setAccountDelegationAmount] = useState<string>('0')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accountRewards, setAccountRewards] = useState<string>('0')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accountBalance, setAccountBalance] = useState<string>('0')

  const { data, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: address.toLowerCase() }
  })

  useEffect(() => {
    const account = data?.account
    setAccount(account)
    setAccountTotalDelegations(account?.sentDelegationsCount || 0)

    if (account) {
      let amount = BigNumber.from('0')
      account?.delegations.forEach(delegation => {
        amount = amount.add(delegation.delegated.delegatedShares)
      })
      setAccountDelegationAmount(amount.toString())
      setAccountBalance(account.shares.toString())
      setAccountRewards(account.rewardsShares.toString())
    }
  }, [data])

  useEffect(() => {
    setAccountIsLoading(loading)
  }, [loading, setAccountIsLoading])

  return {
    account,
    accountIsLoading
  }
}
