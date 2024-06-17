import { ActivityRamp } from '@/types/ActivityRamp'
import { RampProviderType } from '@/types/rampProviderType'
import useSWR from 'swr'

export default function useRampActivity(provider?: RampProviderType, activityId?: string) {
  const url = `api/ramp/activity/${provider}/${activityId}`
  const { data, error } = useSWR<ActivityRamp>(provider && activityId ? url : null, { refreshInterval: 5000 })

  return {
    activity: data,
    isLoading: !error && !data,
    isError: error
  }
}
