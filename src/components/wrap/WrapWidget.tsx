import { Tabs, TabsItems } from '@/components/shared/Tabs'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { WrapWidgetContainer } from './WrapWidgetContainer'
import { useRouter } from 'next/router'
import { ZeroAddress } from 'ethers'

import stSymbol from '@assets/st-symbol.svg'

export const WrapWidget = () => {
  const { t } = useLocaleTranslation()
  const router = useRouter()
  const isUnwraping = router.query.slug?.includes('unwrap')

  const token1 = {
    address: ZeroAddress,
    symbol: t('lsd.symbol'),
    icon: stSymbol
  }

  const token2 = {
    address: ZeroAddress,
    symbol: t('wst.symbol'),
    icon: stSymbol
  }

  const tokens = (isUnwraping ? [token2, token1] : [token1, token2]).map(item => ({
    ...item,
    decimals: 18
  }))

  const tabsItems: TabsItems[] = [
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
    children: <WrapWidgetContainer details={{ tokens, isUnwraping }} />
  }))

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
      items={tabsItems}
      defaultActiveKey={isUnwraping ? 'unwrap' : 'wrap'}
      onChangeActiveTab={handleOnChangeActiveTab}
    />
  )
}

export default WrapWidget
