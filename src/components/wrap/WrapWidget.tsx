import { Tabs } from '@/components/shared/Tabs'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { WrapWidgetContainer } from './WrapWidgetContainer'
import { useRouter } from 'next/router'
import useWrap from '@/hooks/useWrap'
import { useMemo } from 'react'

export type WrapWidgetToken = {
  address: `0x${string}`
  symbol: string
  icon: string
  balance: bigint
  loading?: boolean
  allowance: bigint
}

export const WrapWidget = () => {
  const { t } = useLocaleTranslation()
  const router = useRouter()
  const isUnwraping = useMemo(() => router.asPath.includes('unwrap'), [router.asPath])
  const { tokens } = useWrap({ isUnwraping })

  const handleOnChangeActiveTab = (activeTab: string | number) => {
    if (activeTab === 'unwrap') {
      if (router.asPath.includes('unwrap')) return
      router.replace(`${router.asPath}/unwrap`)
    } else {
      if (!router.asPath.includes('unwrap')) return
      router.replace(router.asPath.replace('/unwrap', ''))
    }
  }

  return (
    <Tabs
      items={[
        {
          key: 'wrap',
          label: t('wrap')
        },
        {
          key: 'unwrap',
          label: t('unwrap')
        }
      ].map(item => ({
        ...item,
        children: <WrapWidgetContainer tokens={tokens} isUnwraping={isUnwraping} />
      }))}
      defaultActiveKey={isUnwraping ? 'unwrap' : 'wrap'}
      onChangeActiveTab={handleOnChangeActiveTab}
    />
  )
}

export default WrapWidget
