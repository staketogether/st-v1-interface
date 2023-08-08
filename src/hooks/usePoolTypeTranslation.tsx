import { PoolsType } from '@/types/Pool'
import useTranslation from './useTranslation'

export default function usePoolTypeTranslation() {
  const { t } = useTranslation()
  const filterTypes = [
    {
      name: t('v2.pools.filter.all'),
      value: PoolsType.all
    },
    {
      name: t('v2.pools.filter.art'),
      value: PoolsType.art
    },
    {
      name: t('v2.pools.filter.education'),
      value: PoolsType.education
    },
    {
      name: t('v2.pools.filter.socialImpact'),
      value: PoolsType.socialImpact
    },
    {
      name: t('v2.pools.filter.innovation'),
      value: PoolsType.innovation
    }
  ]
  function poolTypeTranslation(poolType: PoolsType) {
    return filterTypes.find(item => item.value === poolType)?.name || ''
  }

  return { poolTypeTranslation }
}
