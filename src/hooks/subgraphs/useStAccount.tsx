import { useQuery } from '@apollo/client'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { queryAccount } from '../../queries/queryAccount'
import { Account } from '../../types/Account'

export default function useStAccount(address: `0x${string}`) {
  const [account, setAccount] = useState<Account | undefined>(undefined)
  const [accountIsLoading, setAccountIsLoading] = useState<boolean>(false)
  const [accountTotalDelegates, setAccountTotalDelegates] = useState<number>(0)
  const [accountDelegatedAmount, setAccountDelegatedAmount] = useState<string>('0')

  const { data, loading } = useQuery<{ account: Account }>(queryAccount, {
    variables: { id: address.toLowerCase() }
  })

  useEffect(() => {
    const account = data?.account
    setAccount(account)
    setAccountTotalDelegates(account?.delegates.length || 0)

    if (data?.account) {
      let amount = BigNumber.from('0')

      account?.delegates.forEach(delegate => {
        amount = amount.add(delegate.delegated.delegatedAmount)
      })

      setAccountDelegatedAmount(amount.toString())
    }
  }, [data])

  useEffect(() => {
    setAccountIsLoading(loading)
  }, [loading, setAccountIsLoading])

  return { account, accountDelegatedAmount, accountTotalDelegates, accountIsLoading }
}
