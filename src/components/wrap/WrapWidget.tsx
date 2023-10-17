import { Tabs } from '@/components/shared/Tabs'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { WrapWidgetContainer } from './WrapWidgetContainer'
import { useRouter } from 'next/router'

import stSymbol from '@assets/st-symbol.svg'
import wstpSymbol from '@assets/wstp-symbol.svg'
import useStAccount from '@/hooks/subgraphs/useStAccount'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import chainConfig from '@/config/chain'

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
  const isUnwraping = router.query.slug?.includes('unwrap') || false

  const { account } = useConnectedAccount()
  const { accountBalance, accountIsLoading } = useStAccount(account)
  const { contracts } = chainConfig()

  const token1: WrapWidgetToken = {
    address: contracts.StakeTogether,
    icon: stSymbol,
    symbol: t('lsd.symbol'),
    balance: accountBalance || BigInt(0),
    loading: accountIsLoading,
    allowance: BigInt(0) // get token 2 allowance
  }

  const token2: WrapWidgetToken = {
    address: contracts.StakeTogether, // must be changed
    icon: wstpSymbol,
    symbol: t('wstp.symbol'),
    balance: BigInt(0), // must be changed
    loading: false, // must be changed
    allowance: BigInt(0) // get token 1 allowance
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
        children: <WrapWidgetContainer tokens={tokens} isUnwraping={isUnwraping} />
      }))}
      defaultActiveKey={isUnwraping ? 'unwrap' : 'wrap'}
      onChangeActiveTab={handleOnChangeActiveTab}
    />
  )
}

export default WrapWidget
