import chain from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateAddress } from '@/services/truncate'
import { ContentfulPool } from '@/types/ContentfulPool'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import { BsDiscord, BsFacebook, BsGlobe2, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { styled } from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeEmptyPoolInfo from './StakeEmptyPoolInfo'

interface StakePoolAboutProps {
  poolDetail: ContentfulPool | null
  loading: boolean
}

export default function StakePoolAbout({ poolDetail, loading }: StakePoolAboutProps) {
  const videoId = poolDetail?.video ? poolDetail?.video.split('v=')[1] : null
  const { t } = useLocaleTranslation()
  return (
    <Container>
      {!loading && videoId && (
        <iframe
          width='100%'
          height='237'
          src={`https://www.youtube.com/embed/${videoId}`}
          title='community video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      )}
      {!loading && !videoId && poolDetail && poolDetail.cover?.url && (
        <ImageCover src={poolDetail.cover.url} alt={poolDetail.cover.fileName} />
      )}
      {loading && <SkeletonLoading height={237} width={420} />}

      {!loading && poolDetail?.description && <Description>{poolDetail.description}</Description>}
      {loading && (
        <DescriptionLoading>
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
          <SkeletonLoading height={14} />
        </DescriptionLoading>
      )}

      {!loading && poolDetail && (
        <SocialContainer>
          {poolDetail?.site && (
            <Social href={poolDetail.site} target='_blank'>
              <SiteIcon />
              <span>{poolDetail.site}</span>
            </Social>
          )}
          {poolDetail?.contract && (
            <Social href={`${chain().blockExplorer.baseUrl}/address/${poolDetail.contract}`} target='_blank'>
              <Image src={etherscan} alt='etherscan' width={20} height={20} />
              <span>{truncateAddress(poolDetail.contract)}</span>
            </Social>
          )}
          {poolDetail?.twitter && (
            <Social href={`https://twitter.com/${poolDetail.twitter}`} target='_blank'>
              <TwitterIcon />
              <span>{poolDetail.twitter}</span>
            </Social>
          )}
          {poolDetail?.discord && (
            <Social href={`https://discord.com/invite/${poolDetail.discord}`} target='_blank'>
              <DiscordIcon />
              <span>Discord</span>
            </Social>
          )}
          {poolDetail?.instagram && (
            <Social href={`https://www.instagram.com/${poolDetail.instagram}`} target='_blank'>
              <InstagramIcon />
              <span>{poolDetail.instagram}</span>
            </Social>
          )}
          {poolDetail?.facebook && (
            <Social href={`https://www.facebook.com/${poolDetail.facebook}`} target='_blank'>
              <FacebookIcon />
              <span>{poolDetail.facebook}</span>
            </Social>
          )}

          {poolDetail?.linkedin && (
            <Social href={`https://www.linkedin.com/in/${poolDetail.linkedin}`} target='_blank'>
              <LinkedinIcon />
              <span>{poolDetail.linkedin}</span>
            </Social>
          )}
        </SocialContainer>
      )}
      {loading && (
        <SocialContainer>
          <SkeletonLoading height={40} />
          <SkeletonLoading height={40} />
          <SkeletonLoading height={40} />
        </SocialContainer>
      )}

      {!loading && !poolDetail && <StakeEmptyPoolInfo message={t('v2.stake.infoEmptyState')} />}
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
  DiscordIcon
} = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    > iframe {
      border-radius: ${({ theme }) => theme.size[8]};
    }
    > h1 {
      font-size: 18px;

      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
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
    line-height: ${({ theme }) => theme.font.size[18]};
  `,
  DescriptionLoading: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
  `,
  SocialContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
  `,
  Social: styled.a`
    cursor: pointer;
    padding: ${({ theme }) => theme.size[8]};

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.blackAlpha[50]};

    span {
      font-size: ${({ theme }) => theme.font.size[12]};

      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }

    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[100]};
    }
  `,
  SiteIcon: styled(BsGlobe2)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  FacebookIcon: styled(BsFacebook)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  InstagramIcon: styled(BsInstagram)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  LinkedinIcon: styled(BsLinkedin)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  TwitterIcon: styled(BsTwitter)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `,
  DiscordIcon: styled(BsDiscord)`
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.color.primary};
  `
}
