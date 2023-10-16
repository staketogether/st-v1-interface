import { Tabs } from '@/components/shared/Tabs'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { WrapWidgetContainer } from './WrapWidgetContainer'
import { useRouter } from 'next/router'
import { ZeroAddress } from 'ethers'

import stSymbol from '@assets/st-symbol.svg'
import wstpSymbol from '@assets/wstp-symbol.svg'

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
    symbol: t('wstp.symbol'),
    icon: wstpSymbol
  }

  const tokens = isUnwraping ? [token2, token1] : [token1, token2]

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
        children: (
          <WrapWidgetContainer
            detailsProps={{
              tokens,
              isUnwraping
            }}
            formProps={{
              inputProps: {
                fromToken: tokens[0],
                toToken: tokens[1]
              }
            }}
          />
        )
      }))}
      defaultActiveKey={isUnwraping ? 'unwrap' : 'wrap'}
      onChangeActiveTab={handleOnChangeActiveTab}
    />
  )
}

export default WrapWidget
