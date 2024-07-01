import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import React from 'react'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import { stakingList } from '@/config/product/staking'
import { truncateDecimal, truncateTimestamp, truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import { UserAccountHistory } from '@/queries/subgraph/queryUserAccountHistory'
import { assetsList } from '@/config/product/asset'
import LottieAnimation from '@/components/shared/LottieAnimation'
import loadingAnimation from '@assets/animations/loading-animation.json'
import { Staking } from '@/types/Staking'
interface WalletSidebarAssetContainerProps {
  accountHistory: UserAccountHistory[]
  accountHistoryLoading: boolean
}

export default function WalletSidebarAccountHistoryContainer({ accountHistory, accountHistoryLoading }: WalletSidebarAssetContainerProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const typeMap = {
    ['buy-crypto']: t('deposited'),
    ['sell-crypto']: t('v2.activities.withdraw'),
    ['swap']: t('exchanged'),
    ['deposit']: t('invested'),
    ['withdraw']: t('rescued')
  }

  return accountHistoryLoading ? (
    <LottieAnimation animationData={loadingAnimation} width={70} height={70} loop />
  ) : (
    <Container>
      <ContainerList>
        {accountHistory.map((history, i) => {
          let staking: Staking | null | undefined = null
          if (history.assetType === 'staking') {
            staking = stakingList.find(item => item.contracts.StakeTogether.toLowerCase() === history.token.toLowerCase())
          }
          let asset = null
          if (history.assetType === 'asset') {
            asset = assetsList.find(item => item.type !== 'bitcoin' && item.contractAddress.toLowerCase() === history.token.toLowerCase())
          }

          function getOneInfo() {
            if (history.assetType === 'staking' && staking) {
              return truncateWei(history.amount, 8)
            } else if (history.assetType === 'asset' && history.type === 'swap') {
              return truncateDecimal(Number(history.amount).toString(), 8)
            }
            return truncateDecimal(Number(history.amount).toString(), 8)
          }

          function getSecondInfo() {
            if (history.assetType === 'staking' && staking) {
              return truncateWei(history.amount, 8)
            } else if (history.assetType === 'asset' && history.type === 'swap') {
              return truncateDecimal(history.additionalData.amountTo, 8)
            }

            return truncateDecimal((Number(history.additionalData.amountFiat) / 100).toString(), 8)
          }

          function getSecondSymbol() {
            if (history.assetType === 'staking' && staking) {
              return staking.asset.symbol
            } else if (history.assetType === 'asset' && history.type === 'swap') {
              const assetTo = assetsList.find(item => item.type !== 'bitcoin' && item.contractAddress.toLowerCase() === history.additionalData.tokenTo.toLowerCase())
              if (assetTo) return assetTo.symbol
            }

            return 'BRL'
          }

          return (
            <BalanceContainer key={`${i}-${history.createdAt.toString()}`}>
              <div>
                <div>
                  <AssetIcon
                    image={history.assetType === 'staking' && staking ? staking.symbolImage : asset?.symbolImage ?? ''}
                    size={24}
                    altName='Asset Icon'
                    chain={history.assetType === 'staking' && staking ? staking.asset.chains[0] : history.chainId}
                  />
                </div>
                <div>
                  <span> {typeMap[history.type]}</span>
                  {getOneInfo()} {history.assetType === 'staking' && staking ? staking.symbol : asset?.symbol ?? ''}
                  {' > '}
                  {`${getSecondInfo()} ${getSecondSymbol()}`}
                </div>
              </div>
              <div>
                <span></span>
                <span>{truncateTimestamp(Math.floor(new Date(history.createdAt).getTime() / 1000), locale ?? 'en')}</span>
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
  BalanceContainer: styled.div`
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
