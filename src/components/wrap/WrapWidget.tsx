import { Tabs, TabsItems } from '@/components/shared/Tabs'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

export const WrapWidget = () => {
  const { t } = useLocaleTranslation()

  const tabsItems: TabsItems[] = [
    {
      key: 'wrap',
      label: t('wrap'),
      children: <div>1</div>
    },
    {
      key: 'unwrap',
      label: t('unwrap'),
      children: <div>2</div>
    }
  ]

  return <Tabs items={tabsItems} defaultActiveKey='deposit' />
}

export default WrapWidget
