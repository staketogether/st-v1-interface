import { queryReportIncentivesPerAccount } from '@/queries/subgraph/queryReportIncentivesPerAccount'
import { ReportIncentive, Incentives } from '@/types/Incentives'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

export default function useIncentivesPerAccount(account?: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [incentivesPerAccount, setIncentivesPerAccount] = useState<ReportIncentive[]>([])
  useQuery<Incentives>(queryReportIncentivesPerAccount, {
    variables: { account: account?.toLowerCase() },
    onCompleted: data => {
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
