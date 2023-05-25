import { useRouter } from 'next/router'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import { Community } from '../../types/Community'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

type ExploreCardProps = {
  community: Community
}

export default function ExploreCard({ community }: ExploreCardProps) {
  const router = useRouter()
  const { ceth } = globalConfig

  const { t } = useTranslation()

  return (
    <Card onClick={() => router.push(`/stake/deposit/${community.address}`)}>
      <CardHeader>
        <EnsAvatar large address={community.address} />
        <EnsName large address={community.address} />
      </CardHeader>
      <CardInfo>
        <div>
          <div>{t('rewards')}</div>
          <div>
            {truncateEther(community.rewardsAmount.toString())}
            <span>{ceth.symbol}</span>
          </div>
        </div>
        <div>
          <div>{t('delegated')}</div>
          <div>
            {truncateEther(community.delegatedAmount.toString())}
            <span>{ceth.symbol}</span>
          </div>
        </div>
        <div>
          <div>{t('members')}</div>
          <div>{community.delegates.length}</div>
        </div>
      </CardInfo>
    </Card>
  )
}

const { Card, CardInfo, CardHeader } = {
  Card: styled.div`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[700]};
    }

    &.active {
      background-color: ${({ theme }) => theme.color.whiteAlpha[700]};
      color: ${({ theme }) => theme.color.secondary};
    }

    cursor: pointer;
  `,
  CardHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: end;
      justify-content: flex-end;
    }
  `,
  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[4]};

      > div:first-child {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.color.primary};
      }
      > div:last-child {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.color.primary};

        span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `
}
