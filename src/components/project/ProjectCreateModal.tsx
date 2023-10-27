import React, { useEffect, useState } from 'react'
import Modal from '../shared/Modal'
import useCommunityCreateModal from '@/hooks/useCommunityCreateModal'
import styled from 'styled-components'
import { notification } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import ProjectRegisterInfo from './ProjectRegisterInfo'
import { useForm } from 'react-hook-form'
import { CreateCommunityForm } from '@/types/CommunityForm'
import ProjectRegisterMoreInfo from './ProjectRegisterMoreInfo'
import { useSignMessage } from 'wagmi'
import axios from 'axios'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import ProjectRegisteredCard from './ProjectRegisteredCard'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

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

  const { poolDetail } = useContentfulPoolDetails(account as `0x${string}`)
  const { t } = useLocaleTranslation()

  const {
    register,
    formState: { errors, isSubmitted },
    getValues,
    setValue,
    handleSubmit,
    setError,
    clearErrors
  } = useForm<CreateCommunityForm>()
  const formValues = getValues()

  useEffect(() => {
    if (account) {
      setValue('wallet', account.toLocaleLowerCase())
      setError('logo', { type: 'required', message: `${t('v2.createProject.formMessages.required')}` })
    }
  }, [account, setError, setValue, t])

  const nextStep = () => {
    setCurrent(current + 1)
  }

  const previewStep = () => {
    setCurrent(current - 1)
  }

  const message = `Create project - ${account} `
  const { isLoading, isSuccess, signMessage } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const createCommunityForm = getValues()
      const signatureMessage = { signature: data, message: message }

      await axios.post('/api/community/create', {
        form: createCommunityForm,
        signatureMessage
      })

      notification.success({
        message: `${t('v2.createProject.messages.success')}`,
        placement: 'topRight'
      })
    }
  })

  const onSubmit = async () => {
    await signMessage()
  }

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
          isLoading={isLoading}
          isSuccess={isSuccess}
          previewStep={previewStep}
          formValues={formValues}
          onSubmit={onSubmit}
        />
      )
    }
  ]
  const { isOpenCommunityCreateModal, setCommunityCreateModal } = useCommunityCreateModal()
  const hasProjectRegistered = !!poolDetail
  return (
    <Modal
      title={t('v2.createProject.title')}
      onClose={() => setCommunityCreateModal(false)}
      isOpen={isOpenCommunityCreateModal}
      width={'auto'}
    >
      <Container>
        {hasProjectRegistered ? (
          <ProjectRegisteredCard
            projectLogo={poolDetail?.logo?.url}
            projectName={poolDetail.name}
            projectStatus={poolDetail.status}
            projectWallet={poolDetail.wallet}
            createAt={poolDetail.sys.publishedAt}
          />
        ) : (
          <div>{steps[current].content}</div>
        )}
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
