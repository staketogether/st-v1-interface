import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { Gift } from '@/types/Gift'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { styled } from 'styled-components'
import CommunityLogo from '../shared/community/CommunityLogo'

type GiftHistoryCardProps = {
  gift: Gift
}

export default function GiftHistoryCard({ gift }: GiftHistoryCardProps) {
  const { poolDetail, loading: poolDetailLoading } = useContentfulPoolDetails({ poolAddress: gift.address })
  const router = useRouter()
  const { t } = useLocaleTranslation()

  function getDateFromTimestamp(timestamp: number) {
    const dateTime = DateTime.fromMillis(timestamp)
      .setLocale(router.locale ? (router.locale === 'en' ? 'en-US' : router.locale) : 'en')
      .toLocaleString(DateTime.DATE_SHORT)

    return dateTime.toString()
  }

  return (
    <Container>
      {poolDetail && (
        <CommunityLogo
          size={22}
          src={poolDetail ? poolDetail?.logo?.url : ''}
          alt={poolDetail ? poolDetail?.logo?.url : ''}
          loading={poolDetailLoading}
        />
      )}
      <Detail>
        <div>
          <span>{`${poolDetail && poolDetail?.name} ${t('v2.gifts.sent')} ${t(`v2.gifts.${gift.type}`)}`}</span>
          <Tag className={`${gift.claimed ? 'primary' : 'lost'}`}>
            {gift.claimed ? t('v2.gifts.claimed') : t('v2.gifts.lost')}
          </Tag>
        </div>
        <div>
          <div className='green'>{`${truncateWei(gift.amount, 4)} ${t('lsd.symbol')}`}</div>
          <div>{getDateFromTimestamp(gift.data)}</div>
        </div>
      </Detail>
    </Container>
  )
}

const { Container, Detail, Tag } = {
  Container: styled.div`
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.gray[2]};

    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    padding: ${({ theme }) => theme.size[8]};
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[100]};
    }
  `,
  Detail: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: ${({ theme }) => theme.font.size[14]};

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;
        &.green {
          color: ${({ theme }) => theme.color.green[700]};
        }
      }
      span {
        line-height: normal;
      }
    }
  `,
  Tag: styled.div`
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.font.size[12]};
    padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[4]};
    &.primary {
      background: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.white};
    }
    &.lost {
      background: ${({ theme }) => theme.color.red[700]};
      color: ${({ theme }) => theme.color.white};
    }
  `
}
