import { AssetsSwap } from '@/components/pages/assets/AssetsSwap'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { AssetActionType } from '@/types/AssetActionType'
import { useRouter } from 'next/router'
import { PiArrowDown, PiArrowUp, PiArrowsClockwise, PiCurrencyDollar, PiPlus } from 'react-icons/pi'
import styled from 'styled-components'
import NavActions from '../../shared/NavActions'
import AssetsRampControl from './AssetsRampControl'
import { AssetsReceive } from './AssetsReceive'
import { AssetsSend } from './AssetsSend'
import { TokenBalance } from '@/hooks/contracts/useBalanceOf'
import { Asset } from '@/types/Asset'
import { chainConfigByChainId } from '@/config/chain'

interface AssetsActionsControlProps {
  type: AssetActionType
  asset?: Asset
  chainId: number
  userTokenBalance: TokenBalance
  userTokenIsLoading: boolean
  userTokenRefetch: () => void
}

export default function AssetsActionsControl({
  type,
  chainId,
  asset,
  userTokenBalance,
  userTokenIsLoading,
  userTokenRefetch
}: AssetsActionsControlProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }
  const config = chainConfigByChainId(chainId)
  const assetUrlBase = `${currency}/${config.name.toLowerCase()}/product/assets/${asset?.networks.find(network => network.chainId === chainId)?.contractAddress}`

  const isActionsDisabled = config.type === 'bitcoin'

  const navActionsList = [
    { type: 'buy', label: t('buy'), url: assetUrlBase, disabled: false, icon: <PiPlus />, tooltipLabel: '' },
    {
      type: 'sell',
      label: t('sell'),
      url: `${assetUrlBase}/sell`,
      disabled: isActionsDisabled,
      icon: <PiCurrencyDollar />,
      tooltipLabel: isActionsDisabled ? t('soon') : ''
    },
    {
      type: 'swap',
      label: t('swap'),
      url: `${assetUrlBase}/swap`,
      disabled: isActionsDisabled,
      icon: <PiArrowsClockwise />,
      tooltipLabel: isActionsDisabled ? t('soon') : ''
    },
    {
      type: 'send',
      label: t('send'),
      url: `${assetUrlBase}/send`,
      disabled: isActionsDisabled,
      icon: <PiArrowUp />,
      tooltipLabel: isActionsDisabled ? t('soon') : ''
    },
    {
      type: 'receive',
      label: t('receive'),
      url: `${assetUrlBase}/receive`,
      disabled: isActionsDisabled,
      icon: <PiArrowDown />,
      tooltipLabel: isActionsDisabled ? t('soon') : ''
    }
  ]

  return (
    <EthereumContainer>
      <NavActions typeActive={type} navActionsList={navActionsList} />
      <div>
        {!!(type === 'buy' || type === 'sell') && (
          <AssetsRampControl
            chainId={chainId}
            type={type}
            asset={asset}
            userTokenBalance={userTokenBalance}
            userTokenIsLoading={userTokenIsLoading}
            userTokenRefetch={userTokenRefetch}
          />
        )}
        {type === 'swap' && <AssetsSwap chainId={chainId} asset={asset} />}
        {type === 'send' && <AssetsSend chainId={chainId} asset={asset} />}
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
