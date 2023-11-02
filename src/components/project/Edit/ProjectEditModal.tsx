import useProjectEditModal from '@/hooks/useProjectEditModal'
import React, { useState } from 'react'
import Modal from '../../shared/Modal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import styled from 'styled-components'
import { ContentfulWithLocale } from '@/types/ContentfulPool'
import { ProjectContentfulForm } from '@/types/Project'
import { useForm } from 'react-hook-form'
import ProjectEditForm from './ProjectEditForm'
import { useSignMessage } from 'wagmi'
import axios from 'axios'
import { notification } from 'antd'
import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { useRouter } from 'next/router'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import Tabs, { TabsItems } from '@/components/shared/Tabs'
import ProjectEditLinksForm from './ProjectEditLinksForm'

type ProjectEditModalProps = {
  poolDetail: ContentfulWithLocale
}

export default function ProjectEditModal({ poolDetail }: ProjectEditModalProps) {
  const [activeTab, setActiveTab] = useState<string>('sobre')
  const { t } = useLocaleTranslation()
  const { isOpenProjectEditModal, setProjectEditModal } = useProjectEditModal()
  const router = useRouter()
  const otherLocale = router.locale === 'en' ? 'pt' : 'en-US'
  const otherLocaleContentful = useContentfulPoolDetails({
    poolAddress: poolDetail.wallet,
    locale: otherLocale
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    watch,
    getValues,
    clearErrors
  } = useForm<ProjectContentfulForm>({
    defaultValues: {
      ...poolDetail,
      logo: { base64: undefined, mimeType: undefined },
      cover: { base64: undefined, mimeType: undefined },
      descriptionEn:
        poolDetail.locale === 'en-Us'
          ? poolDetail.description || otherLocaleContentful.poolDetail?.locale === 'en-US'
            ? otherLocaleContentful.poolDetail?.description || ''
            : ''
          : '',
      descriptionPt:
        poolDetail.locale === 'pt'
          ? poolDetail.description || otherLocaleContentful.poolDetail?.locale === 'pt'
            ? otherLocaleContentful.poolDetail?.description || ''
            : ''
          : '',
      wallet: poolDetail.wallet,
      projectName: poolDetail.name,
      category: poolDetail?.category?.sys?.id
    }
  })
  const projectVideo = watch('video')

  const message = `Create project - ${poolDetail.wallet} `
  const { signMessage } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const createCommunityForm = getValues()
      const signatureMessage = { signature: data, message: message }

      await axios.post('/api/project/update', {
        form: { ...createCommunityForm, projectId: poolDetail.sys.id },
        signatureMessage
      })

      notification.success({
        message: `${t('v2.createProject.messages.success')}`,
        placement: 'topRight'
      })
      contentfulClient.refetchQueries({
        include: [queryContentfulPoolByAddress]
      })
    }
  })

  const onSubmit = async () => {
    await signMessage()
  }

  const tabsItems: TabsItems[] = [
    {
      key: 'sobre',
      label: 'sobre',
      children: (
        <ProjectEditForm
          setValue={setValue}
          register={register}
          clearErrors={clearErrors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          projectVideo={projectVideo}
          isSubmitted={isSubmitted}
          poolDetail={poolDetail}
        />
      )
    },
    {
      key: 'links',
      label: 'links',
      children: (
        <ProjectEditLinksForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      )
    }
  ]

  return (
    <Modal
      title={t('v2.editProject.title')}
      onClose={() => setProjectEditModal(false)}
      isOpen={isOpenProjectEditModal}
      width={'auto'}
      noPadding
    >
      <Container>
        <Tabs
          items={tabsItems}
          defaultActiveKey={activeTab}
          onChangeActiveTab={value => setActiveTab(value as string)}
        />
      </Container>
    </Modal>
  )
}

const { Container } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    width: 450px;
  `
}
