import useTranslation from './useTranslation'

export default function usePoolTypeTranslation() {
  const { t } = useTranslation()
  const filterTypes = [
    {
      name: t('v2.pools.filter.all'),
      value: 'all'
    },
    {
      name: t('v2.pools.filter.art'),
      value: 'art'
    },
    {
      name: t('v2.pools.filter.education'),
      value: 'education'
    },
    {
      name: t('v2.pools.filter.socialImpact'),
      value: 'socialImpact'
    },
    {
      name: t('v2.pools.filter.innovation'),
      value: 'innovation'
    }
  ]
  function poolTypeTranslation(poolType: string) {
    return filterTypes.find(item => item.value === poolType)?.name || ''
  }

  return { poolTypeTranslation }
}
