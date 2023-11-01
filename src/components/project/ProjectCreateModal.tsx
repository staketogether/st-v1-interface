import React, { useEffect, useState } from 'react'
import Modal from '../shared/Modal'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'
import styled from 'styled-components'
import { notification } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import ProjectRegisterInfo from './ProjectRegisterInfo'
import { useForm } from 'react-hook-form'
import ProjectRegisterMoreInfo from './ProjectRegisterMoreInfo'
import { useSignMessage } from 'wagmi'
import axios from 'axios'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { CreateProjectForm } from '@/types/Project'

type CommunityCreateModalProps = {
  account?: `0x${string}`
}

export default function ProjectCreateModal({ account }: CommunityCreateModalProps) {
  const [current, setCurrent] = useState(0)
  const [hasAgreeTerms, setHasAgreeTerms] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const { t } = useLocaleTranslation()

  const {
    register,
    formState: { errors, isSubmitted },
    getValues,
    setValue,
    reset,
    handleSubmit,
    setError,
    clearErrors
  } = useForm<CreateProjectForm>()
  const formValues = getValues()

  const nextStep = () => {
    setCurrent(current + 1)
  }

  const previewStep = () => {
    setCurrent(current - 1)
  }

  const message = `Create project - ${account} `
  const {
    isLoading,
    isSuccess,
    signMessage,
    reset: resetSignMessage
  } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const createCommunityForm = getValues()
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

  const onSubmit = async () => {
    await signMessage()
  }

  useEffect(() => {
    if (account) {
      reset()
      resetSignMessage()
      setCurrent(0)
      setHasAgreeTerms(false)
      setFileList([])
      setValue('wallet', account.toLocaleLowerCase())
      setError('logo', { type: 'required', message: `${t('v2.createProject.formMessages.required')}` })
    }
  }, [account, setError, setValue, t, reset, resetSignMessage])

  const steps = [
    {
      content: (
        <ProjectRegisterInfo
          setValue={setValue}
          register={register}
          clearErrors={clearErrors}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitted={isSubmitted}
          nextStep={nextStep}
          account={account}
          formValues={formValues}
          hasAgreeTerms={hasAgreeTerms}
          previewOpen={previewOpen}
          previewImage={previewImage}
          previewTitle={previewTitle}
          fileList={fileList}
          setHasAgreeTerms={setHasAgreeTerms}
          setPreviewOpen={setPreviewOpen}
          setPreviewImage={setPreviewImage}
          setPreviewTitle={setPreviewTitle}
          setFileList={setFileList}
        />
      )
    },
    {
      content: (
        <ProjectRegisterMoreInfo
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
          previewStep={previewStep}
          formValues={formValues}
          onSubmit={onSubmit}
        />
      )
    }
  ]
  const { isOpenProjectCreateModal, setOpenProjectCreateModal } = useProjectCreateModal()

  const titleModal = current === 0 ? t('v2.createProject.title') : t('v2.createProject.linksToAnalyze')
  return (
    <Modal
      title={isLoading || isSuccess ? null : titleModal}
      showHeader={isLoading || isSuccess ? false : true}
      onClose={() => setOpenProjectCreateModal(false)}
      isOpen={isOpenProjectCreateModal}
      showCloseIcon={isLoading || isSuccess ? false : true}
      width={'auto'}
    >
      <Container>
        <div>{steps[current].content}</div>
      </Container>
    </Modal>
  )
}

const { Container } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    width: 450px;
  `
}
