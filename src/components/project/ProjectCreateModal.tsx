import React, { useEffect, useState } from 'react'
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

  const { t } = useLocaleTranslation()

  const nextStep = (data: ProjectCreateInfo) => {
    setCurrent(current + 1)
    setProjectInfo(data)
  }

  const previewStep = () => {
    setCurrent(current - 1)
  }

  const message = `Register Stake Together - ${account} `
  const {
    isLoading,
    isSuccess,
    signMessage,
    reset: resetSignMessage
  } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const signatureMessage = { signature: data, message: message }

      await axios.post('/api/project/create', {
        form: createCommunityForm,
        signatureMessage
      })

      notification.success({
        message: `${t('v2.createProject.messages.success')}`,
        placement: 'topRight'
      })
      contentfulClient.refetchQueries({
        include: [queryContentfulPoolByAddress]
      })
    },
    onError: error => {
      const { cause } = error as { cause?: { message?: string } }
      notification.warning({
        message: `${cause?.message}`,
        placement: 'topRight'
      })
    }
  })

  const registerLinksToAnalyze = async (data: ProjectLinksToAnalyze) => {
    setCreateCommunityForm({
      ...projectInfo,
      ...data
    })
    await signMessage()
  }

  useEffect(() => {
    if (account) {
      resetSignMessage()
      setCurrent(0)
      setHasAgreeTerms(false)
      setFileList([])
    }
  }, [account, t, resetSignMessage])

  const steps = [
    {
      content: (
        <ProjectRegisterInfo
          nextStep={nextStep}
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
          isSuccess={isSuccess}
          previewStep={previewStep}
          current={current}
        />
      )
    }
  ]
  const { isOpenProjectCreateModal, setOpenProjectCreateModal } = useProjectCreateModal()

  useEffect(() => {
    if (poolDetail && !isSuccess) {
      setOpenProjectCreateModal(false)
    }
  }, [isSuccess, poolDetail, setOpenProjectCreateModal])

  const titleModal = current === 0 ? t('v2.createProject.title') : t('v2.createProject.linksToAnalyze')
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
    width: 420px;
  `
}
