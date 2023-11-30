import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useProjectEditModal from '@/hooks/useProjectEditModal'
import useProjectResultModal from '@/hooks/useProjectResultModal'
import { ContentfulPool } from '@/types/ContentfulPool'
import clockYellow from '@assets/icons/clock-yellow.svg'
import { Tooltip } from 'antd'
import Image from 'next/image'
import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import ProjectResultModal from './result-modal/ProjectResultModal'
import { ProjectEditModal } from './edit/ProjectEditModal'

type ProjectCreateButtonProps = {
  poolDetail: ContentfulPool
  account: `0x${string}` | undefined
  isMobile?: boolean
}

export function ProjectButton({ poolDetail, account, isMobile }: ProjectCreateButtonProps) {
  const { t } = useLocaleTranslation()
  const { setProjectEditModal, isOpenProjectEditModal } = useProjectEditModal()
  const { setProjectResultModal, isOpenProjectResultModal } = useProjectResultModal()

  const isProjectPending = poolDetail.status === 'pending'
  const isProjectApproved = poolDetail.status === 'approved'
  const isProjectRejected = poolDetail.status === 'rejected'

  useEffect(() => {
    if ((isProjectApproved || isProjectRejected) && !poolDetail.approvalModalViewed) {
      setProjectResultModal(true)
    }
  }, [isProjectApproved, isProjectRejected, poolDetail, setProjectResultModal])

  return (
    <>
      {isProjectPending && (
        <Tooltip title={t('v2.createProject.status.pending')}>
          <Button className={`${isMobile && 'isMobile'} 'pending'`} onClick={() => setProjectResultModal(true)}>
            <div>
              <CommunityLogo size={24} src={poolDetail.logo.url} alt={poolDetail.logo.fileName} />
              <ClockIcon src={clockYellow} width={12} height={12} alt='clock' />
            </div>
            <CommunityName $bold name={poolDetail.name} />
          </Button>
        </Tooltip>
      )}
      {isProjectApproved && (
        <>
          <Button onClick={() => setProjectEditModal(true)} className={`${isMobile && 'isMobile'}`}>
            <CommunityLogo size={24} src={poolDetail.logo.url} alt={poolDetail.logo.fileName} />
            <CommunityName $bold name={poolDetail.name} />
            <Divider className={`${isMobile && 'isMobile'}`} />
            <CreateProjectIcon />
          </Button>
          {isOpenProjectEditModal && <ProjectEditModal poolDetailUs={poolDetail} account={account} />}
        </>
      )}
      {isProjectRejected && (
        <Tooltip title={t('v2.createProject.status.rejected')}>
          <Button className={`${isMobile && 'isMobile'}`} onClick={() => setProjectResultModal(true)}>
            <div>
              <CommunityLogo size={24} src={poolDetail.logo.url} alt={poolDetail.logo.fileName} />
              <ReprovedIcon />
            </div>
            <CommunityName $bold name={poolDetail.name} />
          </Button>
        </Tooltip>
      )}
      {isOpenProjectResultModal && <ProjectResultModal poolDetail={poolDetail} />}
    </>
  )
}

const { Button, ClockIcon, ReprovedIcon, Divider, CreateProjectIcon } = {
  Button: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background: ${({ theme }) => theme.colorV2.gray[2]};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0px 8px 0px 8px;
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[200]};

    &:hover {
      background-color: ${({ theme }) => theme.colorV2.foreground};
    }

    &.pending {
      padding: 0px 16px 0px 8px;
    }

    &.isMobile {
      background: transparent;
      box-shadow: none;
    }

    > div {
      margin-top: 3px;
      position: relative;
    }
  `,
  Divider: styled.span`
    height: 100%;
    width: 1px;
    background: rgba(0, 0, 0, 0.2);

    &.isMobile {
      display: none;
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
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 16px;
    color: ${({ theme }) => theme.colorV2.blue[1]};
  `
}
