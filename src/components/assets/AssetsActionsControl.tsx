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
  asset: Asset
}

export default function AssetsActionsControl({ type, asset }: AssetsActionsControlProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  const navActionsList = [
    { type: 'buy', label: t('buy'), url: asset.url.replace('currency', currency), disabled: false, icon: <PiPlus />, tooltipLabel: '' },
    {
      type: 'sell',
      label: t('sell'),
      url: `${asset.url.replace('currency', currency)}/withdraw`,
      disabled: true,
      icon: <PiCurrencyDollar />,
      tooltipLabel: t('soon')
    },
    {
      type: 'swap',
      label: t('swap'),
      url: `${asset.url.replace('currency', currency)}/swap`,
      disabled: true,
      icon: <PiArrowsClockwise />,
      tooltipLabel: t('soon')
    },
    {
      type: 'send',
      label: t('send'),
      url: `${asset.url.replace('currency', currency)}/send`,
      disabled: false,
      icon: <PiArrowUp />,
      tooltipLabel: ''
    },
    {
      type: 'receive',
      label: t('receive'),
      url: `${asset.url.replace('currency', currency)}/receive`,
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
            <AssetsBuyControl type={type} asset={asset} />
          </BuyAssetContainer>
        )}
        {type === 'sell' && (
          <BuyAssetContainer>
            <AssetsBuyControl type={type} asset={asset} />
          </BuyAssetContainer>
        )}
        {type === 'send' && <AssetsSend asset={asset} />}
        {type === 'receive' && <AssetsReceive />}
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
