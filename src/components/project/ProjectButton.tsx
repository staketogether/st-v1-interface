import { ContentfulPool } from '@/types/ContentfulPool'
import React from 'react'
import styled from 'styled-components'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clockYellow from '@assets/icons/clock-yellow.svg'
import Image from 'next/image'
import { Tooltip } from 'antd'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { AiOutlineClose } from 'react-icons/ai'

type ProjectCreateButtonProps = {
  poolDetail: ContentfulPool
}

export default function ProjectButton({ poolDetail }: ProjectCreateButtonProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency, network } = query

  return (
    <>
      {poolDetail.status === 'pending' && (
        <Tooltip title={t('v2.createProject.status.pending')}>
          <Button>
            <div>
              <CommunityLogo size={24} src={poolDetail.logo.url} alt={poolDetail.logo.fileName} />
              <ClockIcon src={clockYellow} width={12} height={12} alt='clock' />
            </div>
            <CommunityName name={poolDetail.name} />
          </Button>
        </Tooltip>
      )}
      {poolDetail.status === 'approved' && (
        <Link href={`/${network}/${currency}/invest/deposit/${poolDetail.wallet}`}>
          <Button>
            <CommunityLogo size={24} src={poolDetail.logo.url} alt={poolDetail.logo.fileName} />
            <CommunityName name={poolDetail.name} />
          </Button>
        </Link>
      )}
      {poolDetail.status === 'reproved' && (
        <Tooltip title={t('v2.createProject.status.reproved')}>
          <Button>
            <div>
              <CommunityLogo size={24} src={poolDetail.logo.url} alt={poolDetail.logo.fileName} />
              <ReprovedIcon />
            </div>
            <CommunityName name={poolDetail.name} />
          </Button>
        </Tooltip>
      )}
    </>
  )
}

const { Button, ClockIcon, ReprovedIcon } = {
  Button: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0px 9px 0px ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[200]};

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.foreground};
    }

    > div {
      position: relative;
      > img {
      }
    }
  `,
  ClockIcon: styled(Image)`
    font-size: 12px;
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    bottom: 0px;
    right: -2px;
  `,
  ReprovedIcon: styled(AiOutlineClose)`
    font-size: 12px;
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    bottom: 0px;
    right: -2px;
    color: ${({ theme }) => theme.colorV2.white};
    background: ${({ theme }) => theme.color.red[500]};
    border-radius: 50%;
    padding: 1px;
    border: 1px solid ${({ theme }) => theme.colorV2.white};
  `
}
