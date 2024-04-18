import React, { useCallback, useEffect, useState } from 'react'
import Modal from '../shared/Modal'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'
import styled from 'styled-components'
import { notification } from 'antd'
import { ProjectCreateInfo, ProjectLinksToAnalyze } from '@/types/Project'
import type { UploadFile } from 'antd/es/upload/interface'
import ProjectRegisterInfo from './ProjectRegisterInfo'

import ProjectRegisterMoreInfo from './ProjectRegisterMoreInfo'
import { useSignMessage } from 'wagmi'
import axios from 'axios'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { ContentfulWithLocale } from '@/types/ContentfulPool'

type CommunityCreateModalProps = {
  account?: `0x${string}`
  poolDetail: ContentfulWithLocale | null
}

export default function ProjectCreateModal({ account, poolDetail }: CommunityCreateModalProps) {
  const [current, setCurrent] = useState(0)
  const [projectInfo, setProjectInfo] = useState<ProjectCreateInfo | null>(null)
  const [createCommunityForm, setCreateCommunityForm] = useState<ProjectCreateInfo | null>(null)
  const [hasAgreeTerms, setHasAgreeTerms] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const isReappliedProject = (poolDetail && poolDetail.status === 'rejected') || false

  useEffect(() => {
    if (poolDetail && poolDetail.logo.url && isReappliedProject) {
      setFileList([
        {
          uid: '1',
          name: poolDetail?.logo.fileName,
          status: 'done',
          url: poolDetail?.logo?.url
        }
      ])
    }
  }, [poolDetail, isReappliedProject])

  const { t } = useLocaleTranslation()

  const nextStep = (data: ProjectCreateInfo) => {
    setCurrent(current + 1)
    setProjectInfo(data)
  }

  const previewStep = () => {
    setCurrent(current - 1)
  }

  const reapplyProject = useCallback(
    async (signatureMessage: { signature: `0x${string}`; message: string }, projectId: string) => {
      await axios.post('/api/project/reapply', {
        form: { ...createCommunityForm, projectId },
        signatureMessage
      })
    },
    [createCommunityForm]
  )

  const message = `Stake Together Register - ${account} `
  const { isPending: isLoading, isSuccess, signMessage, data, isError, error, reset: resetSignMessage } = useSignMessage()

  useEffect(() => {
    const executeMessage = async () => {
      if (isSuccess && data) {
        const signatureMessage = { signature: data, message: message }

        if (poolDetail && isReappliedProject) {
          await reapplyProject(signatureMessage, poolDetail.sys.id)
          notification.success({
            message: `${t('v2.createProject.messages.reapplySuccess')}`,
            placement: 'topRight'
          })
        } else {
          await axios.post('/api/project/create', {
            form: createCommunityForm,
            signatureMessage
          })
          contentfulClient.refetchQueries({
            include: [queryContentfulPoolByAddress]
          })
          notification.success({
            message: `${t('v2.createProject.messages.success')}`,
            placement: 'topRight'
          })
        }
      }
    }
    executeMessage()
  }, [createCommunityForm, data, isReappliedProject, isSuccess, message, poolDetail, reapplyProject, t])

  useEffect(() => {
    if (isError && error) {
      const { cause } = error as { cause?: { message?: string } }
      notification.warning({
        message: `${cause?.message}`,
        placement: 'topRight'
      })
    }
  }, [error, isError])

  const registerLinksToAnalyze = async (data: ProjectLinksToAnalyze) => {
    setCreateCommunityForm({
      ...projectInfo,
      ...data
    })
    await signMessage({ message: message })
  }

  useEffect(() => {
    if (!poolDetail) {
      resetSignMessage()
      setCurrent(0)
      setHasAgreeTerms(false)
      setFileList([])
    }
  }, [account, t, resetSignMessage, poolDetail])

  const steps = [
    {
      content: (
        <ProjectRegisterInfo
          nextStep={nextStep}
          poolDetail={poolDetail}
          account={account}
          current={current}
          hasAgreeTerms={hasAgreeTerms}
          fileList={fileList}
          setHasAgreeTerms={setHasAgreeTerms}
          setFileList={setFileList}
        />
      )
    },
    {
      content: (
        <ProjectRegisterMoreInfo
          registerLinksToAnalyze={registerLinksToAnalyze}
          isLoading={isLoading}
          projectInfo={projectInfo}
          isSuccess={isSuccess}
          poolDetail={poolDetail}
          previewStep={previewStep}
          current={current}
        />
      )
    }
  ]
  const { isOpenProjectCreateModal, setOpenProjectCreateModal } = useProjectCreateModal()

  useEffect(() => {
    if (poolDetail && !isReappliedProject && !isSuccess) {
      setOpenProjectCreateModal(false)
    }
  }, [isSuccess, poolDetail, isReappliedProject, setOpenProjectCreateModal])

  const createTitleModal = current === 0 ? t('v2.createProject.title') : t('v2.createProject.linksToAnalyze')
  const titleModal = isReappliedProject ? t('v2.createProject.reapplyTitle') : createTitleModal
  return (
    <Modal
      title={isLoading || isSuccess ? null : titleModal}
      showHeader={isLoading || isSuccess ? false : true}
      onClose={() => setOpenProjectCreateModal(false)}
      isOpen={isOpenProjectCreateModal}
      showCloseIcon={isLoading || isSuccess ? false : true}
      width={'auto'}
      noPadding
    >
      <Container>
        <div>{steps[0].content}</div>
        <div>{steps[1].content}</div>
      </Container>
    </Modal>
  )
}

const { Container } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    width: 100%;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      width: 420px;
    }
  `
}
