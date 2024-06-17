import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { SidebarAccountRewards } from '@/queries/subgraph/queryBackendAccountRewards'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

interface WalletSidebarAssetContainerProps {
  accountRewards: SidebarAccountRewards[]
  accountRewardsLoading: boolean
}

export default function WalletSidebarRewardsContainer({ accountRewards }: WalletSidebarAssetContainerProps) {
  console.log('aq', accountRewards)
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <div>
        <Title>{t('rewards')}</Title>
        <ContainerList>
          <BalanceContainer href={`#`} target='_blank'>
            <div>
              <div>
                <div>asset</div>
                {/* <AssetIcon image={imageSrc} size={24} altName={asset.symbol} chain={asset.chainId} /> */}
              </div>
              <div>
                <span>Stake Eth</span>
                <span>Ethereum</span>
              </div>
            </div>
            <div>
              <span>0.0001 stpETH</span>
              <span>10 days ago</span>
            </div>
          </BalanceContainer>
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
