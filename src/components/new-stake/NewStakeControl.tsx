import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { capitalize } from '@/services/truncate'
import loadingAnimation from '@assets/animations/loading-animation.json'
import { Tooltip, notification } from 'antd'
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
import ProductInfo from './ProductInfo'
import { Staking } from '@/types/Staking'
import { chainConfigByChainId } from '@/config/chain'
import { AssetStats } from '@/types/AssetStats'
import StakingBalanceCard from './StakingBalanceCard'
import useLsdBalance from '@/hooks/subgraphs/useLsdBalance'

const EthereumFormControl = dynamic(() => import('./ethereum/EthereumFormControl'), {
  ssr: false,
  loading: () => (
    <LoadingContainer>
      <LottieAnimation animationData={loadingAnimation} height={70} loop />
    </LoadingContainer>
  ),
  suspense: true
})

interface NewStakeControlProps {
  type: 'deposit' | 'withdraw'
  staking: Staking
  assetData: AssetStats
  chainId: number
}

export default function NewStakeControl({ staking, type, assetData, chainId }: NewStakeControlProps) {
  const [userWalletAddress, setUserWalletAddress] = useState<`0x${string}` | undefined>(undefined)
  const { t } = useLocaleTranslation()

  const { query } = useRouter()
  const { currency } = query

  const { chain: walletChainId, connector, address } = useAccount()
  useEffect(() => {
    if (address) {
      setUserWalletAddress(address)
    }
  }, [address])
  const isWrongNetwork = chainId !== walletChainId?.id
  const { switchChain } = useSwitchChain()
  const config = chainConfigByChainId(chainId)

  useEffect(() => {
    if (isWrongNetwork && connector && connector.name === 'Web3Auth') {
      switchChain({ chainId })
    }
  }, [chainId, connector, isWrongNetwork, switchChain])

  const { accountBalance: stpETHBalance, isLoading: stpETHBalanceLoading } = useLsdBalance({
    walletAddress: userWalletAddress,
    product: staking,
    chainId: chainId
  })

  const copyToClipboard = async () => {
    const url = `${window.location.href}`

    await navigator.clipboard.writeText(url)

    notification.info({
      message: `${t('copyClipboard')}`,
      placement: 'topRight'
    })
  }
  useFacebookPixel(`pageview:staking_${staking.id}`)

  return (
    <Container>
      <header>
        <HeaderBackAction href={`/${currency as string}/staking`}>
          <PiArrowLeft />
          <span>{t('goToBack')}</span>
        </HeaderBackAction>
        <HeaderProductMobile>
          <div>
            <AssetIcon image={staking.symbolImage} size={36} chain={chainId} altName={staking.id} />
            {t(`v2.products.${staking.id}`)}
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
        <RewardsPointsContainer>
          <span>{t('v2.ethereumStaking.myRewardsPoints')}</span>
          {staking.points.elPoints && (
            <Tooltip title={t('v2.ethereumStaking.eigenPointTooltip')}>
              <TagPointsContainer>
                Eigen
                <div>0.0</div>
              </TagPointsContainer>
            </Tooltip>
          )}
          {staking.points.stPoints && (
            <Tooltip title={t('v2.ethereumStaking.togetherPoints')}>
              <TagPointsContainer className='purple'>
                Together
                <div>0.0</div>
              </TagPointsContainer>
            </Tooltip>
          )}
        </RewardsPointsContainer>
      </header>

      <div>
        <ProductInfo product={staking} assetData={assetData} chainId={chainId} />
        <ActionContainer>
          <ActionStakingContainer>
            <EthereumFormControl
              stpETHBalance={stpETHBalance}
              stpETHBalanceLoading={stpETHBalanceLoading}
              product={staking}
              type={type}
              chainId={chainId}
            />
          </ActionStakingContainer>
          {userWalletAddress && (
            <StakingBalanceCard
              stpETHBalance={stpETHBalance}
              stpETHBalanceLoading={stpETHBalanceLoading}
              staking={staking}
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
  ActionContainer,
  ActionStakingContainer,
  RewardsPointsContainer,
  HeaderBackAction,
  LoadingContainer,
  TagPointsContainer,
  HeaderProductMobile,
  ShareButton
} = {
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
  TagPointsContainer: styled.div`
    height: 20px;
    padding: 0px 2px 0px 12px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    font-size: ${({ theme }) => theme.font.size[13]};
    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.white};
    background: #5c626b;
    border-radius: 99px;

    &.purple {
      background: ${({ theme }) => theme.colorV2.purple[1]};
    }

    > div {
      height: 16px;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
      padding: 0px 6px;
      color: ${({ theme }) => theme.colorV2.white};
      border-radius: 99px;
      background: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  RewardsPointsContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};

    > span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.6;
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;

      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
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

    display: flex;
    align-items: start;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  ActionStakingContainer: styled.div`
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
  LoadingContainer: styled.div`
    width: 100%;
    min-height: 453px;

    display: grid;
    place-items: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-height: 524px;
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
