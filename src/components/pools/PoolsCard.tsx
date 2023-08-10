import { truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import { AiOutlineCheck } from 'react-icons/ai'
import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'
import { PoolSubgraph } from '../../types/Pool'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

type PoolsCardProps = {
  pool: PoolSubgraph
}

export default function PoolsCard({ pool }: PoolsCardProps) {
  const router = useRouter()

  const { t } = useTranslation()

  return (
    <Card onClick={() => router.push(`stake/deposit/${pool.address}`)}>
      <CardHeader>
        <EnsAvatar size={26} address={pool.address} />
        <Verified>
          <AiOutlineCheck fontSize={14} />
          <EnsName large address={pool.address} />
        </Verified>
      </CardHeader>
      <CardInfo>
        <div>
          <div>{t('staked')}</div>
          <div>
            {truncateWei(pool.poolBalance, 6)}
            <span>{t('lsd.symbol')}</span>
          </div>
        </div>

        <div>
          <div>{t('members')}</div>
          <div>{pool.receivedDelegationsCount.toString()}</div>
        </div>
      </CardInfo>
    </Card>
  )
}

const { Card, CardInfo, CardHeader, Verified } = {
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
      align-items: center;
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
  `,
  Verified: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.color.whatsapp[600]};
  `
}
