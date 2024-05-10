import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { AssetActionType } from '@/types/AssetActionType'
import { PiArrowDown, PiArrowUp, PiArrowsClockwise, PiCurrencyDollar, PiPlus } from 'react-icons/pi'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import AssetsBuyControl from './AssetsBuyControl'
import { AssetsReceive } from './AssetsReceive'
import { AssetsSend } from './AssetsSend'
import NavActions from '../shared/NavActions'

interface AssetsActionsControlProps {
  type: AssetActionType
  product: Asset
}

export default function AssetsActionsControl({ type, product }: AssetsActionsControlProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  const navActionsList = [
    { type: 'buy', label: t('buy'), url: product.url.replace('currency', currency), disabled: false, icon: <PiPlus />, tooltipLabel: '' },
    {
      type: 'sell',
      label: t('sell'),
      url: `${product.url.replace('currency', currency)}/withdraw`,
      disabled: false,
      icon: <PiCurrencyDollar />,
      tooltipLabel: ''
    },
    {
      type: 'swap',
      label: t('swap'),
      url: `${product.url.replace('currency', currency)}/swap`,
      disabled: true,
      icon: <PiArrowsClockwise />,
      tooltipLabel: t('soon')
    },
    {
      type: 'send',
      label: t('send'),
      url: `${product.url.replace('currency', currency)}/send`,
      disabled: false,
      icon: <PiArrowUp />,
      tooltipLabel: ''
    },
    {
      type: 'receive',
      label: t('receive'),
      url: `${product.url.replace('currency', currency)}/receive`,
      disabled: false,
      icon: <PiArrowDown />,
      tooltipLabel: ''
    }
  ]

  return (
    <EthereumContainer>
      <NavActions typeActive={type} navActionsList={navActionsList} />
      <div>
        {type === 'buy' && (
          <BuyAssetContainer>
            <AssetsBuyControl type={type} asset={product} />
          </BuyAssetContainer>
        )}
        {type === 'sell' && (
          <BuyAssetContainer>
            <AssetsBuyControl type={type} asset={product} />
          </BuyAssetContainer>
        )}
        {type === 'send' && <AssetsSend asset={product} />}
        {type === 'receive' && <AssetsReceive asset={product} />}
      </div>
    </EthereumContainer>
  )
}

const { EthereumContainer, BuyAssetContainer } = {
  EthereumContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  BuyAssetContainer: styled.div``
}
