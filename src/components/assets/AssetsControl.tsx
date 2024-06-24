import { chainConfigByChainId } from '@/config/chain'
import useBalanceOf from '@/hooks/contracts/useBalanceOf'
import { clearRampVars } from '@/hooks/ramp/useRampControlModal'
import useAsset from '@/hooks/useAsset'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { capitalize } from '@/services/truncate'
import { AssetActionType } from '@/types/AssetActionType'
import loadingAnimation from '@assets/animations/loading-animation.json'
import { notification } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PiArrowLeft, PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount, useSwitchChain } from 'wagmi'
import AssetIcon from '../shared/AssetIcon'
import LottieAnimation from '../shared/LottieAnimation'
import NetworkIcons from '../shared/NetworkIcons'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import AssetsProductInfo from './AssetsProductInfo'

interface AssetsControlProps {
  assetId: string
  chainId: number
  type: AssetActionType
}

const AssetBalanceCard = dynamic(() => import('../cryptoPage/AssetBalanceCard'), {
  ssr: false,
  loading: () => (
    <LoadingContainer>
      <LottieAnimation animationData={loadingAnimation} height={20} loop />
    </LoadingContainer>
  ),
  suspense: true
})

const AssetPrice = dynamic(() => import('../shared/AssetPrice'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} />,
  suspense: true
})

const AssetsActionsControl = dynamic(() => import('./AssetsActionsControl'), {
  ssr: false,
  loading: () => (
    <LoadingContainer>
      <LottieAnimation animationData={loadingAnimation} height={20} loop />
    </LoadingContainer>
  ),
  suspense: true
})

export default function AssetsControl({ assetId, chainId, type }: AssetsControlProps) {
  const [userWalletAddress, setUserWalletAddress] = useState<`0x${string}` | undefined>(undefined)
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query
  const { chain: walletChainId, connector, address } = useAccount()
  const { asset } = useAsset({ chainId, assetId })
  console.log(asset)

  useEffect(() => {
    if (address) {
      setUserWalletAddress(address)
    }
  }, [address])

  const isWrongNetwork = chainId !== walletChainId?.id
  const { switchChain } = useSwitchChain()
  const config = chainConfigByChainId(chainId)

  const {
    tokenBalance: userTokenBalance,
    isLoading: userTokenIsLoading,
    refetch: userTokenRefetch
  } = useBalanceOf({
    contractAddress: asset?.networks.find(network => network.chainId === chainId)?.contractAddress,
    chainId,
    type: asset?.type ?? 'erc20',
    walletAddress: userWalletAddress,
    decimals: asset?.decimals
  })

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
  useFacebookPixel(`pageview:asset_${assetId}`)

  useEffect(() => {
    return () => {
      if (type === 'buy' || type === 'sell') clearRampVars(type)
    }
  }, [type])

  return (
    <Container>
      <header>
        <HeaderBackAction href={`/${currency as string}/crypto`}>
          <PiArrowLeft />
          <span>{t('goToBack')}</span>
        </HeaderBackAction>
        <HeaderProductMobile>
          <div>
            <AssetIcon image={asset?.imageUrl} size={36} altName={asset?.name} chain={chainId} />
            <span>{asset?.name}</span>
            <ShareButton onClick={copyToClipboard}>
              <PiShareNetwork />
              <span>{t('share')}</span>
            </ShareButton>
          </div>
          <div>
            <div>
              <span>{asset?.symbol.toLocaleUpperCase()}</span>
              <AssetPrice chainId={chainId} contractAddress={assetId} />
            </div>
            <AvailableNetwork>
              <span>{t('v2.ethereumStaking.networkAvailable')}</span>
              <NetworkIcons network={config.name.toLowerCase()} size={16} />
              <span>{capitalize(config.name.toLowerCase().replaceAll('-', ' '))}</span>
            </AvailableNetwork>
          </div>
        </HeaderProductMobile>
      </header>

      <div>
        <AssetsProductInfo asset={asset} assetId={assetId} chainId={chainId}/>
        <ActionContainer>
          <ActionContainerControlCard>
            <AssetsActionsControl
              type={type}
              asset={asset}
              userTokenBalance={userTokenBalance}
              userTokenIsLoading={userTokenIsLoading}
              userTokenRefetch={userTokenRefetch} chainId={chainId}
            />
          </ActionContainerControlCard>
          {userWalletAddress && (
            <AssetBalanceCard
              userTokenBalance={userTokenBalance}
              userTokenIsLoading={userTokenIsLoading}
              asset={asset}
              chainId={chainId}
              userWalletAddress={userWalletAddress}
            />
          )}
        </ActionContainer>
      </div>
    </Container>
  )
}

const {
  Container,
  ActionContainerControlCard,
  LoadingContainer,
  ActionContainer,
  HeaderBackAction,
  HeaderProductMobile,
  ShareButton,
  AvailableNetwork
} = {
  Container: styled.div`
    position: relative;
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: 0;
    }

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
      gap: ${({ theme }) => theme.size[12]};
    }
  `,
  LoadingContainer: styled.div`
    width: 100%;
    min-height: 453px;

    display: grid;
    place-items: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-height: 524px;
    }
  `,
  HeaderProductMobile: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.size[12]};

    > div {
      display: flex;

      &:nth-child(1) {
        width: 100%;
        font-size: ${({ theme }) => theme.font.size[22]};
        font-style: normal;
        font-weight: 500;
        gap: ${({ theme }) => theme.size[12]};

        > span {
          width: 100%;
        }
      }

      &:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[12]};

        div:nth-child(1) {
          display: flex;
          align-items: center;
          gap: ${({ theme }) => theme.size[4]};

          span:nth-child(1) {
            color: ${({ theme }) => theme.colorV2.gray[1]};
            font-size: ${({ theme }) => theme.font.size[22]};
            font-weight: 500;
          }

          span:nth-child(2) {
            color: ${({ theme }) => theme.colorV2.blue[1]};
            font-size: ${({ theme }) => theme.font.size[22]};
            font-weight: 500;
          }
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

    display: flex;
    align-items: start;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  ActionContainerControlCard: styled.div`
    width: 100%;
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
  `,
  AvailableNetwork: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-style: normal;
      font-weight: 500;
      opacity: 0.6;
    }
  `
}
