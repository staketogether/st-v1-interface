import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import successAnimation from '@assets/animations/success-animation.json'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import LottieAnimation from '@/components/shared/LottieAnimation'

import Button from '@/components/shared/Button'
import { ContentfulPool } from '@/types/ContentfulPool'
import ProjectRegisteredCard from '../ProjectRegisteredCard'
import Modal from '@/components/shared/Modal'
import useProjectResultModal from '@/hooks/useProjectResultModal'
import axios from 'axios'
import { useRouter } from 'next/router'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'

type ProjectResultModalProps = {
  poolDetail: ContentfulPool
}

export default function ProjectResultModal({ poolDetail }: ProjectResultModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRedirect, setIsRedirect] = useState<boolean>(false)
  const { t } = useLocaleTranslation()
  const { categories } = useContentfulCategoryCollection()
  const { isOpenProjectResultModal, setProjectResultModal } = useProjectResultModal()
  const { setOpenProjectCreateModal } = useProjectCreateModal()
  const { query, push } = useRouter()
  const { currency, network } = query

  const isProjectHasPending = poolDetail.status === 'pending'
  const isProjectHasApproved = poolDetail.status === 'approved'
  const isProjectHasRejected = poolDetail.status === 'rejected'

  const setModalIsViewed = useCallback(async () => {
    if (!isLoading && !poolDetail.approvalModalViewed) {
      setIsLoading(true)
      await axios.post('/api/project/setApprovalModalViewed', {
        projectId: poolDetail.sys.id
      })
      setIsLoading(false)
    }
  }, [isLoading, poolDetail])

  const handleModalClose = async () => {
    await setModalIsViewed()
    setProjectResultModal(false)
  }

  const handleRedirectToPage = () => {
    setIsRedirect(true)
    handleModalClose()
    push(`/${network}/${currency}/invest/deposit/${poolDetail.wallet}`)
    setIsRedirect(false)
  }

  return (
    <Modal
      title={null}
      showHeader={false}
      onClose={() => setProjectResultModal(false)}
      isOpen={isOpenProjectResultModal}
      showCloseIcon={false}
      width={'auto'}
      noPadding
    >
      <Container className={`${isProjectHasPending && 'pending'}`}>
        {isProjectHasApproved && (
          <header>
            <LottieAnimation animationData={successAnimation} height={52} width={52} />
            <span className='approved'>{`${t('v2.resultModal.title.approved')}`}</span>
          </header>
        )}
        {isProjectHasRejected && (
          <header>
            <span>{`${t('v2.resultModal.title.rejected')}`}</span>
          </header>
        )}
        <ProjectRegisteredCard
          projectLogo={`${poolDetail.logo?.url}`}
          projectName={poolDetail.name}
          projectStatus={poolDetail.status}
          createAt={new Date().toISOString()}
          ProjectCategory={
            (categories?.length &&
              categories.find(category => category.name === poolDetail.category.name)?.name) ||
            'education'
          }
        />
        {isProjectHasPending && (
          <MessageContainer>{`${t('v2.createProject.successMessages.description')}`}</MessageContainer>
        )}
        <ActionContainer>
          {isProjectHasPending && (
            <CloseButton
              onClick={() => setProjectResultModal(false)}
              label={`${t('close')}`}
              icon={<></>}
              isLoading={isLoading}
            />
          )}
          {isProjectHasApproved && (
            <>
              <Button
                onClick={handleRedirectToPage}
                label={`${t('v2.resultModal.goToProjectPage')}`}
                icon={<></>}
                isLoading={isLoading && isRedirect}
              />
              <Button
                onClick={handleModalClose}
                label={`${t('close')}`}
                icon={<></>}
                ghost
                isLoading={isLoading}
              />
            </>
          )}
          {isProjectHasRejected && (
            <>
              <CloseButton onClick={handleModalClose} label={`${t('close')}`} icon={<></>} isLoading={false} />
              <Button
                onClick={() => {
                  setProjectResultModal(false)
                  setOpenProjectCreateModal(true)
                }}
                label={`${t('v2.resultModal.reapplyProject')}`}
                icon={<></>}
                ghost
                isLoading={false}
              />
            </>
          )}
        </ActionContainer>
      </Container>
    </Modal>
  )
}

const { Container, ActionContainer, MessageContainer, CloseButton } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding: 36px 34px 24px 34px;

    &.pending {
      padding: 24px;
    }

    gap: ${({ theme }) => theme.size[24]};

    > header {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
      span {
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        &.approved {
          color: ${({ theme }) => theme.color.green[500]};
        }
      }
    }
  `,
  ActionContainer: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  MessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    text-align: center;

    font-size: ${({ theme }) => theme.font.size[15]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
  `,
  CloseButton: styled(Button)`
    padding: 0px 48px;
  `
}
