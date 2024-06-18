import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import React from 'react'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import { stakingList } from '@/config/product/staking'
import { chainConfigByChainId } from '@/config/chain'
import { truncateTimestamp, truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import { UserAccountHistory } from '@/queries/subgraph/queryUserAccountHistory'
import { assetsList } from '@/config/product/asset'

interface WalletSidebarAssetContainerProps {
  accountHistory: UserAccountHistory[]
  accountHistoryLoading: boolean
}

export default function WalletSidebarAccountHistoryContainer({ accountHistory, accountHistoryLoading }: WalletSidebarAssetContainerProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const typeMap = {
    ['buy-crypto']: t('buy'),
    ['sell-crypto']: t('sell'),
    ['swap']: t('swap'),
    ['deposit']: t('deposit'),
    ['withdraw']: t('withdraw')
  }

  return (
    <Container>
      <ContainerList>
        {accountHistory.map(history => {
          const { blockExplorer } = chainConfigByChainId(history.chainId)
          let staking = null
          if (history.assetType === 'staking') {
            staking = stakingList.find(item => item.contracts.StakeTogether.toLowerCase() === history.contractAddress.toLowerCase())
          }
          let asset = null
          if (history.assetType === 'asset') {
            asset = assetsList.find(item => item.contractAddress.toLowerCase() === history.contractAddress.toLowerCase())
          }

          return (
            <BalanceContainer href={`${blockExplorer.baseUrl}/tx/`} target='_blank' key={history.id}>
              <div>
                <div>
                  <AssetIcon
                    image={history.assetType === 'staking' && staking ? staking.symbolImage : asset?.symbolImage ?? ''}
                    size={24}
                    altName='Asset Icon'
                    chain={history.assetType === 'staking' && staking ? staking.asset.chains[0] : asset?.chains[0] ?? 1}
                  />
                </div>
                <div>
                  <span> {typeMap[history.type]}</span>
                  {truncateWei(history.amount, 8)} {history.assetType === 'staking' && staking ? staking.symbol : asset?.symbol ?? ''}
                </div>
              </div>
              <div>
                <span></span>
                <span>{truncateTimestamp(history.createdAt.getTime(), locale ?? 'en')}</span>
              </div>
            </BalanceContainer>
          )
        })}
      </ContainerList>
    </Container>
  )
}

const { Container, ContainerList, BalanceContainer } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  ContainerList: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
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
