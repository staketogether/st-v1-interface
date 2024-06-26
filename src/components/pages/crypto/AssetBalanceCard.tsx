import React from 'react'
import styled from 'styled-components'
import AssetIcon from '../../shared/AssetIcon'

import { TokenBalance } from '@/hooks/contracts/useBalanceOf'
import SkeletonLoading from '../../shared/icons/SkeletonLoading'
import { truncateDecimal } from '@/services/truncate'
import Button from '../../shared/Button'
import { PiTrendUp } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useRouter } from 'next/router'
import { stakingList } from '@/config/product/staking'
import { Asset } from '@/types/Asset'

interface AssetBalanceCardProps {
  asset?: Asset
  chainId: number
  userWalletAddress: `0x${string}`
  userTokenBalance: TokenBalance
  assetIsLoading: boolean
  userTokenIsLoading: boolean
}

export default function AssetBalanceCard({ asset, assetIsLoading, chainId, userTokenBalance, userTokenIsLoading }: AssetBalanceCardProps) {
  const { t } = useLocaleTranslation()
  const { query, push } = useRouter()
  const { currency } = query as { currency: string }
  const isPossibleToInvest = stakingList.find(
    staking => {
      const stakingNetwork = asset?.networks.find(network => network.chainId === chainId)
      return !!stakingNetwork && staking.contracts.StakeTogether === stakingNetwork.contractAddress
    }
  )

  return (
    <Container>
      <header>
        <span>{t('balance')}</span>
        <ContainerImage>
          {assetIsLoading ? (
            <SkeletonLoading width={24} height={24} $borderRadius={'99px'} />
          ) : (
            <AssetIcon image={asset?.imageUrl} size={24} altName={asset?.name} chain={chainId} />
          )}

          {userTokenIsLoading || assetIsLoading ? (
            <SkeletonLoading width={80} height={16} />
          ) : (
            <span>{truncateDecimal(userTokenBalance.balance, asset?.decimals)}</span>
          )}
        </ContainerImage>
      </header>
      {isPossibleToInvest && (
        <InvestContainer>
          <span>{t('v2.ethereumStaking.balanceCardMessage')}</span>
          <Button
            onClick={() => push(`${isPossibleToInvest.url.replace('currency', currency)}`)}
            label={t('v2.ethereumStaking.actions.invest')}
            color={'green'}
            icon={<PiTrendUp />}
          />
        </InvestContainer>
      )}
    </Container>
  )
}

const { Container, ContainerImage, InvestContainer } = {
  Container: styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colorV2.white};

    padding: ${({ theme }) => theme.size[24]};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};

    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 500;
    }
  `,
  ContainerImage: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  InvestContainer: styled.div`
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    gap: ${({ theme }) => theme.size[4]};

    padding: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.colorV2.background};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};

    span {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }
  `
}
