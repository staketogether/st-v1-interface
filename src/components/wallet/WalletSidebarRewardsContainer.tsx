import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { SidebarAccountRewards } from '@/queries/subgraph/queryBackendAccountRewards'
import React from 'react'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import { stakingList } from '@/config/product/staking'
import { chainConfigByChainId } from '@/config/chain'
import { truncateTimestamp, truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import LottieAnimation from '@/components/shared/LottieAnimation'
import loadingAnimation from '@assets/animations/loading-animation.json'
interface WalletSidebarAssetContainerProps {
  accountRewards: SidebarAccountRewards[]
  accountRewardsLoading: boolean
}

export default function WalletSidebarRewardsContainer({ accountRewards, accountRewardsLoading }: WalletSidebarAssetContainerProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  return accountRewardsLoading ? (
    <LottieAnimation animationData={loadingAnimation} width={70} height={70} loop />
  ) : (
    <Container>
      <div>
        <Title>{t('rewards')}</Title>
        <ContainerList>
          {accountRewards.map(reward => {
            const { blockExplorer } = chainConfigByChainId(reward.chainId)
            const staking = stakingList.find(item => item.contracts.StakeTogether.toLowerCase() === reward.contractAddress.toLowerCase())

            if (!staking) return null

            return (
              <BalanceContainer href={`${blockExplorer.baseUrl}/tx/${reward.txHash}`} target='_blank' key={reward.txHash}>
                <div>
                  <div>
                    <AssetIcon image={staking.symbolImage ?? ''} size={24} altName={staking.asset.symbol} chain={staking.asset.chains[0]} />
                  </div>
                  <div>
                    <span> {t(`v2.products.${staking.id}`)}</span>
                    <span>{staking.asset.name}</span>
                  </div>
                </div>
                <div>
                  <span>
                    {truncateWei(reward.amount, 8)} {staking.symbol}
                  </span>
                  <span>{truncateTimestamp(reward.timestamp, locale ?? 'en')}</span>
                </div>
              </BalanceContainer>
            )
          })}
        </ContainerList>
      </div>
    </Container>
  )
}

const { Container, ContainerList, Title, BalanceContainer } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  ContainerList: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  Title: styled.h3`
    color: ${({ theme }) => theme.colorV2.blue[1]};
    font-size: ${({ theme }) => theme.font.size[13]};
    font-weight: 500;
    margin-left: ${({ theme }) => theme.size[8]};
  `,
  BalanceContainer: styled.a`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colorV2.background};
    }

    div {
      &:nth-child(1) {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};

        > div {
          display: flex;
          flex-direction: column;

          span {
            text-align: start;

            &:nth-child(1) {
              font-size: ${({ theme }) => theme.font.size[13]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
            }

            &:nth-child(2) {
              font-size: ${({ theme }) => theme.font.size[12]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
              opacity: 0.8;
            }
          }
        }
      }

      &:nth-child(2) {
        display: flex;
        flex-direction: column;

        span {
          text-align: end;

          &:nth-child(1) {
            font-size: ${({ theme }) => theme.font.size[13]};
            color: ${({ theme }) => theme.color.green[500]};
          }

          &:nth-child(2) {
            font-size: ${({ theme }) => theme.font.size[12]};
            color: ${({ theme }) => theme.colorV2.gray[1]};
            opacity: 0.8;
          }
        }
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.foreground};
    }
  `
}
