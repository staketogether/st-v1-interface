import PoolFilterIcon from '@/components/invest/PoolFilterIcon'
import Button from '@/components/shared/Button'
import GenericTransactionLoading from '@/components/shared/GenericTransactionLoading'
import Modal from '@/components/shared/Modal'
import CommunityLogo from '@/components/shared/community/CommunityLogo'
import CommunityName from '@/components/shared/community/CommunityName'
import { contentfulClient } from '@/config/apollo'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import useProjectDetailModal from '@/hooks/useProjectDetailModal'
import { queryContentfulPoolsListByStatus } from '@/queries/contentful/queryContentfulPoolsListByStatus'
import { ContentfulPool } from '@/types/ContentfulPool'
import { notification } from 'antd'
import axios from 'axios'
import errorAnimation from '@assets/animations/error-animation.json'
import React, { useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import {
  PiDiscordLogo,
  PiGlobeSimple,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiTelegramLogo,
  PiTwitterLogo,
  PiYoutubeLogo
} from 'react-icons/pi'
import styled from 'styled-components'
import { useSignMessage } from 'wagmi'
import LottieAnimation from '@/components/shared/LottieAnimation'
import successAnimation from '@assets/animations/success-animation.json'
import useAddPool from '@/hooks/contracts/useAddPool'

type ProjectDetailModalProps = {
  project: ContentfulPool
  isContractPublished?: boolean
  showRejectOptionWhenContractIsNotPublished?: boolean
}

export default function ProjectDetailModal({
  project,
  isContractPublished,
  showRejectOptionWhenContractIsNotPublished
}: ProjectDetailModalProps) {
  const [isApproved, setIsApproved] = useState<boolean>(false)
  const [isRejected, setIsRejected] = useState<boolean>(false)
  const { isOpenProjectDetailModal, setProjectDetailModal } = useProjectDetailModal()
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const { t } = useLocaleTranslation()

  const {
    isLoading: isLoadingTransaction,
    isSuccess,
    addPool,
    resetState,
    prepareTransactionIsError,
    awaitWalletAction
  } = useAddPool(project.wallet)

  function copyToClipboard() {
    navigator.clipboard.writeText(project.wallet)
    notification.success({
      message: `${t('addressCopiedToClipboard')}`,
      placement: 'topRight'
    })
  }

  const handleProjectSite = () => {
    if (project.site?.startsWith('https://') || project.site?.startsWith('http://')) {
      return project.site
    }
    return `https://${project.site}`
  }

  const handleCloseModal = async () => {
    if (isApproved || isRejected) {
      await contentfulClient.refetchQueries({
        include: [queryContentfulPoolsListByStatus]
      })
    }
    resetState()
    setIsApproved(false)
    setIsRejected(false)
    setProjectDetailModal(false)
  }

  const approveMessage = `Stake Together Approve Project - ${project.wallet} `
  const { isLoading: approveIsLoading, signMessage } = useSignMessage({
    message: approveMessage,
    onSuccess: async data => {
      const signatureMessage = { signature: data, message: approveMessage }
      await axios.post('/api/project/status', {
        projectId: project.sys.id,
        status: 'approved',
        signatureMessage
      })
      notification.success({
        message: `${t('v2.panelProject.messages.projectApproved')}`,
        placement: 'topRight'
      })
      setIsApproved(true)
    },
    onError: error => {
      const { cause } = error as { cause?: { message?: string } }
      notification.warning({
        message: `${cause?.message}`,
        placement: 'topRight'
      })
    }
  })

  const rejectMessage = `Stake Together Rejected Project - ${project.wallet} `
  const { isLoading: rejectedIsLoading, signMessage: rejectedSignMessage } = useSignMessage({
    message: rejectMessage,
    onSuccess: async data => {
      const signatureMessage = { signature: data, message: rejectMessage }

      await axios.post('/api/project/status', {
        projectId: project.sys.id,
        status: 'rejected',
        signatureMessage
      })

      notification.success({
        message: `${t('v2.panelProject.messages.projectRejected')}`,
        placement: 'topRight'
      })

      setIsRejected(true)
    },
    onError: error => {
      const { cause } = error as { cause?: { message?: string } }
      notification.warning({
        message: `${cause?.message}`,
        placement: 'topRight'
      })
    }
  })

  const isLoading = approveIsLoading || rejectedIsLoading || isLoadingTransaction || awaitWalletAction

  const handleTransactionTitle = () => {
    if (approveIsLoading) {
      return `${t('v2.panelProject.modal.signProjectApproval')}`
    } else if (rejectedIsLoading) {
      return `${t('v2.panelProject.modal.signProjectReject')}`
    } else {
      return `${t('v2.panelProject.modal.publishInContract')}`
    }
  }

  return (
    <Modal
      title={isLoading ? null : t('v2.panelProject.modal.title')}
      onClose={handleCloseModal}
      isOpen={isOpenProjectDetailModal}
      showCloseIcon={isLoading ? false : true}
      showHeader={isLoading ? false : true}
      noPadding={isLoading ? true : false}
    >
      {isLoading && (
        <GenericTransactionLoading
          title={handleTransactionTitle()}
          bodyComponent={
            <ProjectContainer>
              <GapContainer>
                <CommunityLogo
                  size={32}
                  src={project?.logo.url}
                  alt={project?.logo.fileName || ''}
                  loading={false}
                />
                <CommunityName name={project.name} loading={false} $bold />
              </GapContainer>
              <GapContainer>
                {PoolFilterIcon({ iconSize: 16, value: project.category.name })}
                <span>{`${poolTypeTranslation(project.category.name)}`}</span>
              </GapContainer>
            </ProjectContainer>
          }
        />
      )}
      {!isLoading && (
        <Container>
          {isApproved && (
            <RejectedContainer>
              <LottieAnimation animationData={successAnimation} height={50} />
              <span>
                {isSuccess
                  ? t('v2.panelProject.modal.projectApprovedAndPublished')
                  : t('v2.panelProject.modal.projectApproved')}
              </span>
            </RejectedContainer>
          )}
          {isRejected && (
            <RejectedContainer>
              <LottieAnimation animationData={errorAnimation} height={50} />
              <span>{t('v2.panelProject.modal.projectRejected')}</span>
            </RejectedContainer>
          )}
          <ProjectContainer>
            <GapContainer>
              <CommunityLogo
                size={24}
                src={project?.logo.url}
                alt={project?.logo.fileName || ''}
                loading={false}
              />
              <CommunityName name={project.name} loading={false} />
            </GapContainer>
            <GapContainer>
              {PoolFilterIcon({ iconSize: 16, value: project.category.name })}
              <span>{`${poolTypeTranslation(project.category.name)}`}</span>
            </GapContainer>
          </ProjectContainer>
          <GapContainer onClick={copyToClipboard}>
            <span>{project.wallet}</span>
            <CopyIcon />
          </GapContainer>
          <span>{project.email}</span>
          <AboutProject>{project.aboutProject}</AboutProject>
          <GapContainer>
            {project.site && (
              <a href={handleProjectSite()} target='_blank'>
                <SiteIcon />
              </a>
            )}
            {project.instagram && (
              <a href={`https://www.instagram.com/${project.instagram}`} target='_blank'>
                <InstagramIcon />
              </a>
            )}
            {project.linkedin && (
              <a href={`https://www.linkedin.com/in/${project.linkedin}`} target='_blank'>
                <LinkedinIcon />
              </a>
            )}
            {project.twitter && (
              <a href={`https://twitter.com/${project.twitter}`} target='_blank'>
                <TwitterIcon />
              </a>
            )}
            {project.telegram && (
              <a href={project.telegram} target='_blank'>
                <TelegramIcon />
              </a>
            )}
            {project.discord && (
              <a href={project.discord} target='_blank'>
                <DiscordIcon />
              </a>
            )}
            {project.youtube && (
              <a href={`https://www.youtube.com/${project.youtube}`} target='_blank'>
                <YoutubeIcon />
              </a>
            )}
          </GapContainer>
          {(isApproved || project.status === 'approved') && !isSuccess && (
            <FooterContainer
              className={`${showRejectOptionWhenContractIsNotPublished && 'contractIsNotPublished'}`}
            >
              <Button
                label={t('v2.panelProject.modal.publishInContract')}
                block
                disabled={prepareTransactionIsError || isLoadingTransaction || prepareTransactionIsError}
                isLoading={isLoadingTransaction || awaitWalletAction}
                onClick={addPool}
              />
              {!isContractPublished && showRejectOptionWhenContractIsNotPublished && (
                <Button
                  label={t('v2.panelProject.modal.reject')}
                  block
                  color='red'
                  ghost
                  isLoading={rejectedIsLoading}
                  onClick={() => rejectedSignMessage()}
                />
              )}
            </FooterContainer>
          )}
          {!isApproved && !isRejected && project.status !== 'approved' && (
            <FooterContainer>
              <Button
                label={t('v2.panelProject.modal.approve')}
                block
                color='green'
                isLoading={approveIsLoading}
                onClick={() => signMessage()}
              />
              <Button
                label={t('v2.panelProject.modal.reject')}
                block
                color='red'
                isLoading={rejectedIsLoading}
                onClick={() => rejectedSignMessage()}
              />
            </FooterContainer>
          )}
          {(isRejected || isSuccess) && <Button label={t('close')} block onClick={handleCloseModal} />}
        </Container>
      )}
    </Modal>
  )
}

const {
  Container,
  ProjectContainer,
  GapContainer,
  CopyIcon,
  AboutProject,
  SiteIcon,
  InstagramIcon,
  RejectedContainer,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  YoutubeIcon,
  TelegramIcon,
  FooterContainer
} = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    > span {
      font-size: ${({ theme }) => theme.font.size[13]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  RejectedContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};
    > span {
      font-size: 18px;
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.blue[1]};
      text-align: center;
    }
  `,
  ProjectContainer: styled.header`
    min-width: 273px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[12]};
    background: ${({ theme }) => theme.colorV2.gray[2]};

    max-height: 300px;
    overflow-y: auto;
  `,
  GapContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  CopyIcon: styled(FiCopy)`
    font-size: 13px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }
  `,
  AboutProject: styled.span`
    white-space: pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
  `,
  SiteIcon: styled(PiGlobeSimple)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  InstagramIcon: styled(PiInstagramLogo)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  LinkedinIcon: styled(PiLinkedinLogo)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  TwitterIcon: styled(PiTwitterLogo)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  DiscordIcon: styled(PiDiscordLogo)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  YoutubeIcon: styled(PiYoutubeLogo)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  TelegramIcon: styled(PiTelegramLogo)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.primary};
  `,
  FooterContainer: styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    &.contractIsNotPublished {
      flex-direction: column;
    }
  `
}
