import { AssetsSwap } from '@/components/assets/AssetsSwap'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { AssetActionType } from '@/types/AssetActionType'
import { useRouter } from 'next/router'
import { PiArrowDown, PiArrowUp, PiArrowsClockwise, PiCurrencyDollar, PiPlus } from 'react-icons/pi'
import styled from 'styled-components'
import NavActions from '../shared/NavActions'
import AssetsRampControl from './AssetsRampControl'
import { AssetsReceive } from './AssetsReceive'
import { AssetsSend } from './AssetsSend'
import { TokenBalance } from '@/hooks/contracts/useBalanceOf'
import AssetsBitcoinRampControl from '@/components/assets/AssetsBitcoinRampControl'

interface AssetsActionsControlProps {
  type: AssetActionType
  asset: Asset
  userTokenBalance: TokenBalance
  userTokenIsLoading: boolean
  userTokenRefetch: () => void
}

export default function AssetsActionsControl({
  type,
  asset,
  userTokenBalance,
  userTokenIsLoading,
  userTokenRefetch
}: AssetsActionsControlProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  const navActionsList = [
    { type: 'buy', label: t('buy'), url: asset.url.replace('currency', currency), disabled: false, icon: <PiPlus />, tooltipLabel: '' },
    {
      type: 'sell',
      label: t('sell'),
      url: `${asset.url.replace('currency', currency)}/sell`,
      disabled: asset?.disableActions?.sell,
      icon: <PiCurrencyDollar />,
      tooltipLabel: asset?.disableActions?.sell ? t('soon') : ''
    },
    {
      type: 'swap',
      label: t('swap'),
      url: `${asset.url.replace('currency', currency)}/swap`,
      disabled: asset?.disableActions?.swap,
      icon: <PiArrowsClockwise />,
      tooltipLabel: asset?.disableActions?.swap ? t('soon') : ''
    },
    {
      type: 'send',
      label: t('send'),
      url: `${asset.url.replace('currency', currency)}/send`,
      disabled: asset?.disableActions?.send,
      icon: <PiArrowUp />,
      tooltipLabel: asset?.disableActions?.send ? t('soon') : ''
    },
    {
      type: 'receive',
      label: t('receive'),
      url: `${asset.url.replace('currency', currency)}/receive`,
      disabled: asset?.disableActions?.receive,
      icon: <PiArrowDown />,
      tooltipLabel: asset?.disableActions?.receive ? t('soon') : ''
    }
  ]

  return (
    <EthereumContainer>
      <NavActions typeActive={type} navActionsList={navActionsList} />
      <div>
        {asset.type === 'bitcoin' && type === 'buy' && (
          <AssetsBitcoinRampControl asset={asset} type={type} />
        )}
        {asset.type !== 'bitcoin' && (type === 'buy' || type === 'sell') && (
          <AssetsRampControl
            type={type}
            asset={asset}
            userTokenBalance={userTokenBalance}
            userTokenIsLoading={userTokenIsLoading}
            userTokenRefetch={userTokenRefetch}
          />
        )}
        {type === 'swap' && <AssetsSwap asset={asset} />}
        {type === 'send' && <AssetsSend asset={asset} />}
        {type === 'receive' && <AssetsReceive />}
      </div>
    </EthereumContainer>
  )
}

const { EthereumContainer } = {
  EthereumContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `
}
