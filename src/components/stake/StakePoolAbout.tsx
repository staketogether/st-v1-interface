import usePoolDetailByAddress from '@/hooks/subgraphs/contentful/usePoolDetailByAddress'

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineGlobal
} from 'react-icons/ai'
import { FaDiscord } from 'react-icons/fa'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import chain from '@/config/chain'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import { truncateAddress } from '@/services/truncate'
interface StakePoolAboutProps {
  poolAddress: `0x${string}` | undefined
}

export default function StakePoolAbout({ poolAddress }: StakePoolAboutProps) {
  const { poolDetail, loading } = usePoolDetailByAddress(poolAddress)
  const videoId = poolDetail?.video ? poolDetail?.video.split('v=')[1] : null
  return (
    <Container>
      {loading ? <SkeletonLoading height={18} width={250} /> : <h1>{poolDetail?.name}</h1>}

      {!loading && videoId && (
        <iframe
          width='420'
          height='237'
          src={`https://www.youtube.com/embed/${videoId}`}
          title='community video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
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

      {!loading && (
        <SocialContainer>
          {poolDetail?.site && (
            <Social href={poolDetail.site} target='_blank'>
              <SiteIcon />
              <span>{poolDetail.site}</span>
            </Social>
          )}
          {poolDetail?.contract && (
            <Social href={`${chain().blockExplorer.baseUrl}/address/${poolDetail.contract}`} target='_blank'>
              <Image src={etherscan} alt='etherscan' width={24} height={24} />
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
              <span>{poolDetail.discord}</span>
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
    </Container>
  )
}

const {
  Container,
  Description,
  Social,
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
      border-radius: ${({ theme }) => theme.size[12]};
    }

    > h1 {
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: ${({ theme }) => theme.color.blackAlpha[600]};
    }
  `,
  Description: styled.p`
    max-width: 420px;
    font-size: ${({ theme }) => theme.font.size[14]};
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme }) => theme.color.blackAlpha[600]};
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
    background: ${({ theme }) => theme.color.whiteAlpha[500]};

    span {
      font-size: ${({ theme }) => theme.font.size[12]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      color: ${({ theme }) => theme.color.blackAlpha[600]};
    }

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }
  `,
  SiteIcon: styled(AiOutlineGlobal)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  FacebookIcon: styled(AiFillFacebook)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  InstagramIcon: styled(AiFillInstagram)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  LinkedinIcon: styled(AiFillLinkedin)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  TwitterIcon: styled(AiFillTwitterCircle)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  DiscordIcon: styled(FaDiscord)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `
}
