import { analyticsClient } from '@/config/apollo'
import chainConfig from '@/config/chain'
import { queryAnalytics } from '@/queries/subgraph/analytics/queryAnalytics'
import { Analytics, AnalyticsData, ValidatorsData } from '@/types/Analytics'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

export default function useAnalyticsData() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [validators, setValidators] = useState<ValidatorsData[]>([])
  const { chainId } = chainConfig()
  useQuery<Analytics>(queryAnalytics, {
    variables: { chainId: chainId },
    onCompleted: data => {
      setIsLoading(false)
      setAnalytics(data.analytics.stakeTogether)
      setValidators(data.analytics.validators)
    },
    onError: error => {
      console.log(error)
      setIsLoading(false)
    },
    client: analyticsClient
  })

  return {
    isLoading,
    analytics,
    validators
  }
}
