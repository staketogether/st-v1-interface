import { queryReportIncentives } from '@/queries/subgraph/queryIncentivesPerAccount'
import { ReportIncentive, Incentives } from '@/types/Incentives'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

export default function useIncentivesPerAccount(account?: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [incentivesPerAccount, setIncentivesPerAccount] = useState<ReportIncentive[]>([])
  useQuery<Incentives>(queryReportIncentives, {
    variables: { account: account?.toLowerCase() },
    onCompleted: data => {
      console.log(data)
      setIsLoading(false)
      setIncentivesPerAccount(data.reportIncentives)
    },
    onError: () => {
      setIsLoading(false)
    },
    skip: !account
  })

  return {
    isLoading,
    incentivesPerAccount
  }
}
