import useProjectEditModal from '@/hooks/useProjectEditModal'
import React, { useEffect, useState } from 'react'
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
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import Tabs, { TabsItems } from '@/components/shared/Tabs'
import ProjectEditLinksForm from './ProjectEditLinksForm'

type ProjectEditModalProps = {
  poolDetailUs: ContentfulWithLocale
  account: `0x${string}` | undefined
}

export default function ProjectEditModal({ poolDetailUs, account }: ProjectEditModalProps) {
  const [activeTab, setActiveTab] = useState<string>('sobre')
  const [language, setLanguage] = useState<'pt' | 'en'>('pt')
  const { t } = useLocaleTranslation()
  const { isOpenProjectEditModal, setProjectEditModal } = useProjectEditModal()

  const poolDetailPt = useContentfulPoolDetails({
    poolAddress: poolDetailUs.wallet,
    fetchPolicy: 'network-only',
    locale: 'pt'
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    watch,
    getValues,
    reset,
    clearErrors
  } = useForm<ProjectContentfulForm>({
    defaultValues: {
      ...poolDetailUs,
      logo: { base64: undefined, mimeType: undefined },
      cover: { base64: undefined, mimeType: undefined },
      descriptionEn: poolDetailUs.description || '',
      descriptionPt: poolDetailPt.poolDetail?.description || '',
      videoEn: poolDetailUs.video || '',
      videoPt: poolDetailPt.poolDetail?.video || '',
      wallet: poolDetailUs.wallet,
      projectName: poolDetailUs.name,
      category: poolDetailUs?.category?.sys?.id
    }
  })
  const projectVideo = watch(language === 'pt' ? 'videoPt' : 'videoEn')

  const message = `Create project - ${poolDetailUs.wallet} `
  const { signMessage, reset: resetSignMessage } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const createCommunityForm = getValues()
      const signatureMessage = { signature: data, message: message }

      await axios.post('/api/project/update', {
        form: { ...createCommunityForm, projectId: poolDetailUs.sys.id },
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
          language={language}
          clearErrors={clearErrors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          projectVideo={projectVideo}
          isSubmitted={isSubmitted}
          poolDetail={poolDetailUs}
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

  useEffect(() => {
    if (account) {
      reset()
      resetSignMessage()
      setActiveTab('sobre')
    }
  }, [account, reset, resetSignMessage])

  return (
    <Modal
      title={
        <Title>
          <span>{`${t('v2.editProject.title')}`}</span>
          <div>
            <LanguageButton className={`${language === 'pt' && 'active'}`} onClick={() => setLanguage('pt')}>
              PT
            </LanguageButton>
            <LanguageButton className={`${language === 'en' && 'active'}`} onClick={() => setLanguage('en')}>
              EN
            </LanguageButton>
          </div>
        </Title>
      }
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

const { Container, Title, LanguageButton } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    width: 450px;
  `,
  Title: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: ${({ theme }) => theme.size[8]};
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  LanguageButton: styled.div`
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.gray[2]};

    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    color: ${({ theme }) => theme.colorV2.gray[1]};

    display: grid;
    place-items: center;

    font-size: 13px;
    font-weight: 400;

    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colorV2.blue[1]};
      color: ${({ theme }) => theme.colorV2.white};
    }
    &.active {
      background: ${({ theme }) => theme.colorV2.blue[1]};
      color: ${({ theme }) => theme.colorV2.white};
    }
  `
}
