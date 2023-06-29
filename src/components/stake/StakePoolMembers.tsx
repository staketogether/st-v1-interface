import { Delegation } from '@/types/Delegation'
import styled from 'styled-components'
import StakeReceivedDelegation from '@/components/stake/StakeReceivedDelegation'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import Loading from '@/components/shared/icons/Loading'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { t } from 'i18next'

interface StakeMembersProps {
  initialLoading: boolean
  loadMoreLoading: boolean
  delegations: Delegation[] | undefined
  totalDelegations: number
  onLoadMore: () => void
}

export default function StakePoolMembers({
  delegations,
  totalDelegations,
  loadMoreLoading,
  onLoadMore,
  initialLoading
}: StakeMembersProps) {
  return (
    <Container>
      {initialLoading && (
        <DelegationsContainer>
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
        </DelegationsContainer>
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
              {!loadMoreLoading && <AiOutlineUsergroupAdd />}
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
    border-radius: ${({ theme }) => theme.size[16]};
    gap: ${({ theme }) => theme.size[16]};
  `,
  DelegationsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[12]};

    > div:first-of-type {
      margin-bottom: ${({ theme }) => theme.size[8]};
    }
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
    border-radius: ${({ theme }) => theme.size[16]};
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
