import React, { useEffect, useState } from 'react'
import Modal from '../shared/Modal'
import useCommunityCreateModal from '@/hooks/useCommunityCreateModal'
import styled from 'styled-components'
import { Steps, UploadFile, notification } from 'antd'
import { PiArrowLineRight, PiNotePencil } from 'react-icons/pi'
import ProjectLogin from './ProjectLogin'
import ProjectRegisterInfo from './ProjectRegisterInfo'
import { useForm } from 'react-hook-form'
import { CreateCommunityForm } from '@/types/CommunityForm'
import ProjectRegisterMoreInfo from './ProjectRegisterMoreInfo'
import { useSignMessage } from 'wagmi'
import axios from 'axios'

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

  const {
    register,
    formState: { errors, isValid },
    getValues,
    setValue
  } = useForm<CreateCommunityForm>()

  const formValues = getValues()

  useEffect(() => {
    if (account) {
      setValue('wallet', account.toLocaleLowerCase())
      setCurrent(1)
    } else {
      setCurrent(0)
    }
  }, [account, setValue])

  const nextStep = () => {
    setCurrent(current + 1)
  }

  const previewStep = () => {
    setCurrent(current - 1)
  }

  const message = `Create community - ${account} `
  const { isLoading, isSuccess, signMessage, isError } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const createCommunityForm = getValues()
      const signatureMessage = { signature: data, message: message }

      await axios.post('/api/community/create', {
        form: createCommunityForm,
        signatureMessage
      })
      notification.success({
        message: `communidate criada com sucesso!`,
        placement: 'topRight'
      })
    }
  })

  const onSubmit = async () => {
    await signMessage()
  }

  const steps = [
    {
      title: 'Login',
      content: <ProjectLogin />,
      icon: <PiArrowLineRight fontSize={14} />
    },
    {
      title: 'Registrar informações',
      content: (
        <ProjectRegisterInfo
          setValue={setValue}
          register={register}
          errors={errors}
          nextStep={nextStep}
          formValues={formValues}
          hasAgreeTerms={hasAgreeTerms}
          previewOpen={previewOpen}
          previewImage={previewImage}
          previewTitle={previewTitle}
          fileList={fileList}
          isFormValid={isValid}
          setHasAgreeTerms={setHasAgreeTerms}
          setPreviewOpen={setPreviewOpen}
          setPreviewImage={setPreviewImage}
          setPreviewTitle={setPreviewTitle}
          setFileList={setFileList}
        />
      ),
      icon: <PiNotePencil fontSize={14} />
    },
    {
      title: 'Informações Adicionais',
      content: (
        <ProjectRegisterMoreInfo
          register={register}
          errors={errors}
          isLoading={isLoading}
          isSuccess={isSuccess}
          previewStep={previewStep}
          formValues={formValues}
          onSubmit={onSubmit}
        />
      ),
      icon: <PiNotePencil fontSize={14} />
    }
  ]
  const { isOpenCommunityCreateModal, setCommunityCreateModal } = useCommunityCreateModal()
  const items = steps.map(item => ({ key: item.title, title: item.title, icon: item.icon }))

  return (
    <Modal
      title='Create Community'
      onClose={() => setCommunityCreateModal(false)}
      isOpen={isOpenCommunityCreateModal}
      width={'auto'}
    >
      <Container>
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
      </Container>
    </Modal>
  )
}

const { Container } = {
  Container: styled.div`
    width: 900px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  `
}
