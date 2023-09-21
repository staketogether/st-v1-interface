import Loading from '@/components/shared/icons/Loading'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import StakeReceivedDelegation from '@/components/stake/StakeReceivedDelegation'
import { Delegation } from '@/types/Delegation'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import StakeEmptyPoolInfo from './StakeEmptyPoolInfo'
import { PiUsers } from 'react-icons/pi'

interface StakeMembersProps {
  initialLoading: boolean
  delegations: Delegation[] | undefined
  totalDelegations: number
  loadMoreLoading: boolean
  onLoadMore: () => void
}

export default function StakePoolMembers({
  delegations,
  totalDelegations,
  loadMoreLoading,
  onLoadMore,
  initialLoading
}: StakeMembersProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container>
      {initialLoading && (
        <DelegationsContainer>
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
        </DelegationsContainer>
      )}
      {!initialLoading && !delegations && <StakeEmptyPoolInfo message={t('v2.stake.infoEmptyState')} />}
      {!initialLoading && delegations && !delegations.length && (
        <StakeEmptyPoolInfo message={t('v2.stake.infoEmptyState')} />
      )}

      {!initialLoading && delegations && delegations.length > 0 && (
        <header>
          <span>{t('rank')}</span>
          <span>{t('account')}</span>
          <span>{t('value')}</span>
        </header>
      )}

      {!initialLoading && delegations && delegations.length > 0 && (
        <DelegationsContainer>
          {delegations.map((delegation, index) => (
            <StakeReceivedDelegation
              key={delegation.delegate.address}
              delegation={delegation}
              rank={index + 1}
            />
          ))}
          {delegations.length < totalDelegations && (
            <LoadMoreButton onClick={onLoadMore}>
              {loadMoreLoading && <Loading />}
              {!loadMoreLoading && <PiUsers />}
              {t('loadMore')}
            </LoadMoreButton>
          )}
        </DelegationsContainer>
      )}
    </Container>
  )
}

const { Container, DelegationsContainer, LoadMoreButton } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    gap: ${({ theme }) => theme.size[16]};

    > header {
      display: grid;
      grid-template-columns: 0.4fr 1fr 0.7fr;
      padding: 0 8px;
      gap: 16px;

      > span {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }
    }
  `,
  DelegationsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
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
