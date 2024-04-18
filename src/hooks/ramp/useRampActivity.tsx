import { ActivityRamp } from '@/types/ActivityRamp'
import { ProviderType } from '@/types/provider.type'
import useSWR from 'swr'

export default function useRampActivity(provider?: ProviderType, activityId?: string) {
  const url = `api/ramp/activity/${provider}/${activityId}`
  const { data, error } = useSWR<ActivityRamp>(provider && activityId ? url : null, { refreshInterval: 5000 })

  return {
    activity: data,
    isLoading: !error && !data,
    isError: error
  }
}
