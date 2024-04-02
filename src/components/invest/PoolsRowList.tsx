import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { truncateWei } from '@/services/truncate'
import { Pool } from '@/types/Pool'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { formatNumberByLocale } from '../../services/format'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import { PiDiscordLogo, PiGlobeSimple, PiInstagramLogo, PiTwitterLogo, PiYoutubeLogo } from 'react-icons/pi'
import { Tooltip } from 'antd'

type PoolsRowListProps = {
  pool: Pool
  loading: boolean
}

export default function PoolsRowList({ pool, loading }: PoolsRowListProps) {
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()
  const handleProjectSite = () => {
    if (pool && (pool.site?.startsWith('https://') || pool.site?.startsWith('http://'))) {
      return pool.site
    }
    return `https://${pool?.site}`
  }
  return (
    <Row>
      {pool && (
        <>
          <Name>
            {pool.logo.url && (
              <CommunityLogo size={24} src={pool.logo.url} alt={pool.logo.fileName} loading={loading} />
            )}
            {!pool.logo.url && (
              <CommunityLogo size={24} src={pool.logo.url} alt={pool.logo.fileName} loading={true} />
            )}
            {pool.name && <CommunityName name={pool.name} loading={loading} />}
            {!pool.name && <CommunityName name={pool.name} loading={true} />}
          </Name>
          <TypeContainer>
            {!pool.type && <SkeletonLoading width={100} height={15} />}
            {pool.type && PoolFilterIcon({ iconSize: 16, value: pool.type })}
            <Text>{`${pool.type && poolTypeTranslation(pool.type)}`}</Text>
          </TypeContainer>
          <Text>{formatNumberByLocale(pool.receivedDelegationsCount.toString(), locale)}</Text>
          <Text className='blue'>
            {formatNumberByLocale(truncateWei(pool.poolBalance, 6), locale)}
            <Text className='blue'>{t('eth.symbol')}</Text>
          </Text>
          <Social>
            {pool?.instagram && (
              <Tooltip title={pool.instagram}>
                <Social href={`https://www.instagram.com/${pool.instagram}`} target='_blank'>
                  <InstagramIcon />
                </Social>
              </Tooltip>
            )}
            {pool?.youtube && (
              <Tooltip title={pool.youtube}>
                <Social href={`https://www.youtube.com/${pool.youtube}`} target='_blank'>
                  <YoutubeIcon />
                </Social>
              </Tooltip>
            )}
            {pool?.site && (
              <Tooltip title={handleProjectSite()}>
                <Social href={handleProjectSite()} target='_blank'>
                  <SiteIcon />
                </Social>
              </Tooltip>
            )}
            {pool?.twitter && (
              <Tooltip title={pool.twitter}>
                <Social href={`https://twitter.com/${pool.twitter}`} target='_blank'>
                  <TwitterIcon />
                </Social>
              </Tooltip>
            )}
            {pool?.discord && (
              <Tooltip title={pool.discordName || pool.discord}>
                <Social href={`https://discord.com/invite/${pool.discord}`} target='_blank'>
                  <DiscordIcon />
                </Social>
              </Tooltip>
            )}
          </Social>
        </>
      )}
    </Row>
  )
}

const {
  Row,
  Name,
  TypeContainer,
  Text,
  Social,
  YoutubeIcon,
  DiscordIcon,
  TwitterIcon,
  SiteIcon,
  InstagramIcon
} = {
  Row: styled.div`
    display: none;
    height: 48px;
    grid-template-columns: 0.7fr 0.5fr 0.5fr 0.4fr 0.4fr;
    gap: 8px;
    align-items: center;
    background: ${({ theme }) => theme.color.white};
    padding: 8px 16px;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: 8px;

    border: 1px solid ${({ theme }) => theme.colorV2.white};

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      * {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }

      > div > span {
        color: ${({ theme }) => theme.colorV2.purple[1]} !important;
      }

      > button {
        background-color: ${({ theme }) => theme.color.secondary};
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: grid;
    }
  `,
  Name: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    font-weight: 500;
  `,
  TypeContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.colorV2.gray[1]};

    span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Text: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.colorV2.gray[1]};

    display: flex;
    gap: ${({ theme }) => theme.size[4]};

    &.blue {
      color: ${({ theme }) => theme.colorV2.blue[3]};
    }
    &.green {
      color: ${({ theme }) => theme.color.green[500]};
    }
  `,
  InstagramIcon: styled(PiInstagramLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  SiteIcon: styled(PiGlobeSimple)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  YoutubeIcon: styled(PiYoutubeLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  Social: styled.a`
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      line-height: 13px;

      color: ${({ theme }) => theme.colorV2.gray[1]};
    }

    &:hover {
      svg {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }
  `,
  TwitterIcon: styled(PiTwitterLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  DiscordIcon: styled(PiDiscordLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `
}
