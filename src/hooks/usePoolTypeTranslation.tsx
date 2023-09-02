import useLocaleTranslation from './useLocaleTranslation'

export default function usePoolTypeTranslation() {
  const { t } = useLocaleTranslation()
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
      name: t('v2.pools.filter.social'),
      value: 'socialImpact'
    },
    {
      name: t('v2.pools.filter.technology'),
      value: 'technology'
    }
  ]
  function poolTypeTranslation(poolType: string) {
    return filterTypes.find(item => item.value === poolType)?.name || ''
  }

  return { poolTypeTranslation }
}
