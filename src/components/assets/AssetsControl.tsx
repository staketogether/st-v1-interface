import { chainConfigByChainId } from '@/config/chain'
import { currentAssetNameVar } from '@/hooks/ramp/useControlModal'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { capitalize } from '@/services/truncate'
import { Asset } from '@/types/Asset'
import { MobulaMarketAsset } from '@/types/MobulaMarketAsset'
import { notification } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PiArrowLeft, PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount, useSwitchChain } from 'wagmi'
import AssetIcon from '../shared/AssetIcon'
import NetworkIcons from '../shared/NetworkIcons'
import AssetsActionsControl from './AssetsActionsControl'
import AssetsProductInfo from './AssetsProductInfo'

interface AssetsControlProps {
  product: Asset
  assetData: MobulaMarketAsset
  chainId: number
  type: 'buy' | 'sell' | 'swap'
}

export default function AssetsControl({ product, assetData, chainId, type }: AssetsControlProps) {
  const { t } = useLocaleTranslation()
  currentAssetNameVar(product.id)
  const { query } = useRouter()
  const { currency } = query
  const { chain: walletChainId, connector } = useAccount()

  const isWrongNetwork = chainId !== walletChainId?.id
  const { switchChain } = useSwitchChain()
  const config = chainConfigByChainId(chainId)

  useEffect(() => {
    if (isWrongNetwork && connector && connector.name === 'Web3Auth') {
      switchChain({ chainId })
    }
  }, [chainId, connector, isWrongNetwork, switchChain])

  const copyToClipboard = async () => {
    const url = `${window.location.href}`

    await navigator.clipboard.writeText(url)

    notification.info({
      message: `${t('copyClipboard')}`,
      placement: 'topRight'
    })
  }
  useFacebookPixel(`pageview:asset_${product.id}`)

  return (
    <Container>
      <header>
        <HeaderBackAction href={`/${currency as string}/crypto`}>
          <PiArrowLeft />
          <span>{t('goToBack')}</span>
        </HeaderBackAction>
        <HeaderProductMobile>
          <div>
            <AssetIcon image={product.symbolImage} size={36} altName={product.id} chain={chainId} />
            {t(`v2.products.${product.id}`)}
            <ShareButton onClick={copyToClipboard}>
              <PiShareNetwork />
              <span>{t('share')}</span>
            </ShareButton>
          </div>
          <div>
            <span>{t('v2.ethereumStaking.networkAvailable')}</span>
            <NetworkIcons network={config.name.toLowerCase()} size={16} />
            <span>{capitalize(config.name.toLowerCase().replaceAll('-', ' '))}</span>
          </div>
        </HeaderProductMobile>
      </header>

      <div>
        <AssetsProductInfo product={product} assetData={assetData} />
        <ActionContainer>
          <AssetsActionsControl type={type} product={product} />
        </ActionContainer>
      </div>
    </Container>
  )
}

const { Container, ActionContainer, HeaderBackAction, HeaderProductMobile, ShareButton } = {
  Container: styled.div`
    position: relative;
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    > div {
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: ${({ theme }) => theme.size[24]};

      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        display: grid;
        grid-template-columns: 1fr minmax(320px, 400px);
        gap: ${({ theme }) => theme.size[24]};
        align-items: start;
      }
    }
    > header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  HeaderProductMobile: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.size[8]};

    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      &:nth-child(1) {
        font-size: ${({ theme }) => theme.font.size[22]};
        font-style: normal;
        font-weight: 500;
      }

      &:nth-child(2) {
        span {
          font-size: ${({ theme }) => theme.font.size[13]};
          font-style: normal;
          font-weight: 500;
          opacity: 0.6;
        }
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  `,
  ActionContainer: styled.div`
    width: 100%;
    max-width: 400px;
    padding: ${({ theme }) => theme.size[24]};
    background-color: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `,
  HeaderBackAction: styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[15]};

    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.6;
    cursor: pointer;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      position: absolute;
      margin-top: -39px;
    }
  `,
  ShareButton: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    padding: 0px 8px;
    cursor: pointer;
    height: 24px;
    background: ${({ theme }) => theme.colorV2.white};

    box-shadow: ${({ theme }) => theme.shadow[100]};

    color: ${({ theme }) => theme.colorV2.purple[1]};
    font-weight: 400;
    border-radius: ${({ theme }) => theme.size[8]};
    font-size: ${({ theme }) => theme.font.size[13]};
    svg {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
