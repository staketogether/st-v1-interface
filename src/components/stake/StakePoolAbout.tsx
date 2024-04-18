import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { getVideoIdFromUrl } from '@/services/format'
import { truncateAddress } from '@/services/truncate'
import { ContentfulPool } from '@/types/ContentfulPool'
import etherscan from '@assets/icons/etherscan.svg'
import { Tooltip } from 'antd'
import Image from 'next/image'
import {
  PiDiscordLogo,
  PiFacebookLogo,
  PiGlobeSimple,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiTelegramLogo,
  PiTwitterLogo,
  PiWhatsappLogo,
  PiYoutubeLogo
} from 'react-icons/pi'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeEmptyPoolInfo from './StakeEmptyPoolInfo'

interface StakePoolAboutProps {
  poolDetail: ContentfulPool | null
  loading: boolean
  isStakeTogetherPool: boolean
}

export default function StakePoolAbout({ poolDetail, loading, isStakeTogetherPool }: StakePoolAboutProps) {
  const videoId = getVideoIdFromUrl(poolDetail?.video)

  const { t } = useLocaleTranslation()
  const isEmpty = !poolDetail || (!poolDetail?.description && !poolDetail?.cover && !videoId)
  const opts = {
    height: '237',
    width: '100%',
    style: {
      borderRadius: '8px'
    },
    playerVars: {
      autoplay: 0
    }
  }
  const handleProjectSite = () => {
    if (poolDetail && (poolDetail.site?.startsWith('https://') || poolDetail.site?.startsWith('http://'))) {
      return poolDetail.site
    }
    return `https://${poolDetail?.site}`
  }
  return (
    <Container>
      {!loading && videoId && <YouTube videoId={videoId} opts={opts} />}
      {!loading && !videoId && poolDetail && poolDetail.cover?.url && (
        <ImageCover src={poolDetail.cover.url} alt={poolDetail.cover.fileName} />
      )}
      {loading && <SkeletonLoading height={237} width={420} />}
      {!loading && poolDetail && !isStakeTogetherPool && (
        <SocialRowContainer>
          {poolDetail?.site && (
            <Tooltip title={handleProjectSite()}>
              <Social href={handleProjectSite()} target='_blank'>
                <SiteIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.contract && (
            <Tooltip title={truncateAddress(poolDetail.contract)}>
              <Social href={handleProjectSite()} target='_blank'>
                <Image src={etherscan} alt='etherscan' width={20} height={20} />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.linkedin && (
            <Tooltip title={poolDetail.linkedin}>
              <Social href={`https://www.linkedin.com/in/${poolDetail.linkedin}`} target='_blank'>
                <LinkedinIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.instagram && (
            <Tooltip title={poolDetail.instagram}>
              <Social href={`https://www.instagram.com/${poolDetail.instagram}`} target='_blank'>
                <InstagramIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.facebook && (
            <Tooltip title={poolDetail.facebook}>
              <Social href={`https://www.facebook.com/${poolDetail.facebook}`} target='_blank'>
                <FacebookIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.twitter && (
            <Tooltip title={poolDetail.twitter}>
              <Social href={`https://twitter.com/${poolDetail.twitter}`} target='_blank'>
                <TwitterIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.youtube && (
            <Tooltip title={poolDetail.youtube}>
              <Social href={`https://www.youtube.com/${poolDetail.youtube}`} target='_blank'>
                <YoutubeIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.discord && (
            <Tooltip title={poolDetail.discordName || poolDetail.discord}>
              <Social href={`https://discord.com/invite/${poolDetail.discord}`} target='_blank'>
                <DiscordIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.telegram && (
            <Tooltip title={poolDetail.name}>
              <Social href={`https://t.me/joinchat/${poolDetail.telegram}`} target='_blank'>
                <TelegramIcon />
              </Social>
            </Tooltip>
          )}
          {poolDetail?.whatsapp && (
            <Tooltip title={poolDetail.name}>
              <Social href={`https://chat.whatsapp.com/${poolDetail.whatsapp}`} target='_blank'>
                <WhatsAppIcon />
              </Social>
            </Tooltip>
          )}
        </SocialRowContainer>
      )}
      {!loading && poolDetail?.description && <Description>{poolDetail.description}</Description>}
      {loading && (
        <DescriptionLoading>
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
        </DescriptionLoading>
      )}

      {loading && (
        <SocialContainer>
          <SkeletonLoading height={40} />
          <SkeletonLoading height={40} />
          <SkeletonLoading height={40} />
        </SocialContainer>
      )}

      {!loading && isEmpty && <StakeEmptyPoolInfo message={t('v2.stake.infoEmptyState')} />}
    </Container>
  )
}

const {
  Container,
  Description,
  Social,
  ImageCover,
  SocialContainer,
  SiteIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  DescriptionLoading,
  DiscordIcon,
  YoutubeIcon,
  TelegramIcon,
  WhatsAppIcon,
  SocialRowContainer
} = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    iframe {
      border-radius: ${({ theme }) => theme.size[8]};
    }
    > h1 {
      font-size: 18px;

      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  SocialRowContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};
  `,
  ImageCover: styled.img`
    width: 100% !important;
    height: 237px !important;
    border-radius: ${({ theme }) => theme.size[8]};
    object-fit: cover;
  `,

  Description: styled.p`
    max-width: 420px;
    font-size: ${({ theme }) => theme.font.size[14]};

    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    line-height: ${({ theme }) => theme.font.size[16]};
    padding: 8px 0;

    word-break: break-word;
    white-space: pre-wrap;
  `,
  DescriptionLoading: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
  `,
  SocialContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
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
  SiteIcon: styled(PiGlobeSimple)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  FacebookIcon: styled(PiFacebookLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  InstagramIcon: styled(PiInstagramLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  LinkedinIcon: styled(PiLinkedinLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
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
  `,
  YoutubeIcon: styled(PiYoutubeLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  TelegramIcon: styled(PiTelegramLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  WhatsAppIcon: styled(PiWhatsappLogo)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `
}
