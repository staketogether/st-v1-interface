import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateAddress, truncateTimestamp, truncateWei } from '@/services/truncate'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiLink, PiListDashes } from 'react-icons/pi'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeEmptyPoolInfo from './StakeEmptyPoolInfo'
import { PoolRewards } from '@/types/RewardsPool'
import Loading from '../shared/icons/Loading'

type StakeRewardsPoolProps = {
  rewardsPool: PoolRewards[]
  poolRewardLoading: boolean
  poolRewardsFetchMoreLoading: boolean
  loadMoreRewardsItems: () => void
  rewardsCount: string
}

export default function StakeRewardsPool({
  rewardsPool,
  poolRewardLoading,
  poolRewardsFetchMoreLoading,
  loadMoreRewardsItems,
  rewardsCount
}: StakeRewardsPoolProps) {
  const { locale } = useRouter()
  const { t } = useLocaleTranslation()
  const { blockExplorer } = chainConfig()
  const hasRewards = rewardsPool.length > 0

  if (poolRewardLoading) {
    return (
      <Container>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <SkeletonLoading key={index} height={32} $borderRadius='8px' />
          ))}
      </Container>
    )
  }

  const getLocale = () => {
    return locale === 'en' ? 'en-US' : 'pt-BR'
  }

  console.log(rewardsPool)

  return (
    <Container>
      {hasRewards && (
        <header>
          <span>{t('tx')}</span>
          <span>{t('time')}</span>
          <span>{t('account')}</span>
          <span>{t('value')}</span>
        </header>
      )}
      <List>
        {hasRewards ? (
          rewardsPool.map((reward, i) => {
            return (
              <Row
                key={`reward-row-${i + 1}`}
                href={`${blockExplorer.baseUrl}/tx/${reward.txHash}`}
                target='_blank'
              >
                <span>
                  <ExternalLink />
                </span>
                <span>{truncateTimestamp(reward.timestamp, getLocale())}</span>
                <span>{truncateAddress(reward.account?.address, 4)}</span>
                <span className={`${reward.amount > 1n && 'green'} ${reward.amount < 0 && 'red'}`}>
                  {`${truncateWei(reward.amount, 4)} ${t('eth.symbol')}`}
                </span>
              </Row>
            )
          })
        ) : (
          <StakeEmptyPoolInfo message={t('v2.stake.infoEmptyState')} />
        )}
      </List>

      {rewardsPool.length < Number(rewardsCount) && (
        <LoadMoreButton onClick={loadMoreRewardsItems}>
          {poolRewardsFetchMoreLoading && <Loading />}
          {!poolRewardsFetchMoreLoading && <PiListDashes />}
          {t('loadMore')}
        </LoadMoreButton>
      )}
    </Container>
  )
}

const { Container, Row, ExternalLink, List, LoadMoreButton } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    > header {
      display: grid;
      grid-template-columns: 50px 1fr 1fr 1fr;
      padding: 0 8px;
      text-align: center;
      @media (min-width: 768px) {
        text-align: justify;
      }

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.colorV2.gray[1]};

        &:last-child {
          text-align: end;
        }
      }
    }
  `,
  List: styled.div`
    display: grid;
    gap: 4px;
    max-height: 480px;
    overflow-y: auto;
  `,
  Row: styled(Link)`
    cursor: pointer;

    display: grid;
    grid-template-columns: 50px 1fr 1fr 1fr;
    align-items: center;
    padding: ${({ theme }) => theme.size[8]} 0;
    text-align: center;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: ${({ theme }) => theme.size[8]};
      text-align: justify;
    }

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 8px;
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    span {
      color: ${({ theme }) => theme.color.primary};
      font-size: ${({ theme }) => theme.font.size[14]};

      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }

      &.red {
        color: ${({ theme }) => theme.color.red[500]};
      }

      &:last-child {
        text-align: end;
      }
    }
  `,
  ExternalLink: styled(PiLink)`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.colorV2.blue[1]};
  `,
  LoadMoreButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    justify-content: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
