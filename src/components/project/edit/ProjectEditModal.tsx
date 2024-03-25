import GenericTransactionLoading from '@/components/shared/GenericTransactionLoading'
import Tabs, { TabsItems } from '@/components/shared/Tabs'
import { contentfulClient } from '@/config/apollo'
import chainConfig from '@/config/chain'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useProjectEditModal from '@/hooks/useProjectEditModal'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { ContentfulWithLocale } from '@/types/ContentfulPool'
import { EditProjectForm } from '@/types/Project'
import { notification } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useNetwork, useSignMessage, useSwitchNetwork } from 'wagmi'
import Modal from '../../shared/Modal'
import ProjectEditForm from './ProjectEditForm'
import ProjectEditLinksForm from './ProjectEditLinksForm'

type ProjectEditModalProps = {
  poolDetailUs: ContentfulWithLocale
  account: `0x${string}` | undefined
}

export enum EditFormTabs {
  ABOUT = 'about',
  LINKS = 'links'
}

export default function ProjectEditModal({ poolDetailUs, account }: ProjectEditModalProps) {
  const [activeTab, setActiveTab] = useState<string>(EditFormTabs.ABOUT)
  const [language, setLanguage] = useState<'pt' | 'en'>('pt')
  const { t } = useLocaleTranslation()
  const { isOpenProjectEditModal, setProjectEditModal } = useProjectEditModal()

  const userIsOwner = account?.toLocaleLowerCase() === poolDetailUs.wallet.toLocaleLowerCase()

  const router = useRouter()
  const { asPath } = router

  const poolDetailPt = useContentfulPoolDetails({
    poolAddress: poolDetailUs.wallet,
    fetchPolicy: 'network-only',
    locale: 'pt'
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, submitCount },
    setValue,
    watch,
    setError,
    getValues,
    trigger,
    reset,
    clearErrors
  } = useForm<EditProjectForm>({
    defaultValues: {
      ...poolDetailUs,
      logo: { base64: undefined, mimeType: undefined },
      cover: { base64: undefined, mimeType: undefined },
      headerCover: { base64: undefined, mimeType: undefined },
      descriptionEn: poolDetailUs.description || '',
      descriptionPt: poolDetailPt.poolDetail?.description || '',
      videoEn: poolDetailUs.video || '',
      videoPt: poolDetailPt.poolDetail?.video || '',
      wallet: poolDetailUs.wallet,
      projectName: poolDetailUs.name,
      category: poolDetailUs?.category?.sys?.id
    }
  })

  useEffect(() => {
    if (!userIsOwner) {
      setProjectEditModal(false)
      reset()
    }
  }, [account, poolDetailUs.wallet, reset, setProjectEditModal, userIsOwner])

  useEffect(() => {
    if (poolDetailPt.poolDetail && poolDetailPt.poolDetail?.description) {
      setValue('descriptionPt', poolDetailPt.poolDetail?.description)
    }
    if (poolDetailPt.poolDetail && poolDetailPt.poolDetail?.video) {
      setValue('videoPt', poolDetailPt.poolDetail?.video)
    }
  }, [poolDetailPt.poolDetail, setValue])

  const projectVideo = watch(language === 'pt' ? 'videoPt' : 'videoEn')
  const projectName = watch('projectName')
  const projectCover = watch('cover')
  const projectHeaderCover = watch('headerCover')
  const projectDescription = watch(language === 'pt' ? 'descriptionPt' : 'descriptionEn')

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const { chainId } = chain
  const isWrongNetwork = chainId !== walletChainId?.id

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    return t('save')
  }

  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: chainId
  })

  const message = `Stake Together Update - ${poolDetailUs.wallet} `
  const {
    signMessage,
    reset: resetSignMessage,
    isLoading,
    isSuccess
  } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const createCommunityForm = getValues()
      const signatureMessage = { signature: data, message: message }

      await axios.post('/api/project/update', {
        form: { ...createCommunityForm, projectId: poolDetailUs.sys.id },
        signatureMessage
      })

      notification.success({
        message: `${t('v2.editProject.messages.success')}`,
        placement: 'topRight'
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

  const handleReset = async () => {
    await contentfulClient.refetchQueries({
      include: [queryContentfulPoolByAddress]
    })

    resetSignMessage()
    setActiveTab(EditFormTabs.ABOUT)
    reset()

    if (asPath.includes('deposit') || (asPath.includes('withdraw') && userIsOwner)) {
      router.reload()
    }
    setProjectEditModal(false)
  }

  useEffect(() => {
    if (account) {
      resetSignMessage()
      setActiveTab(EditFormTabs.ABOUT)
      reset()
    }
  }, [account, reset, resetSignMessage])

  const onSubmit = async () => {
    if (isWrongNetwork && switchNetworkAsync) {
      switchNetworkAsync()
      return
    }
    await signMessage()
  }

  const tabsItems: TabsItems[] = [
    {
      key: EditFormTabs.ABOUT,
      label: t('v2.editProject.formTabs.about.title'),
      children: (
        <ProjectEditForm
          setValue={setValue}
          register={register}
          setError={setError}
          projectHeaderCover={projectHeaderCover}
          projectCover={projectCover}
          language={language}
          projectDescription={projectDescription}
          clearErrors={clearErrors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          projectName={projectName}
          trigger={trigger}
          errors={errors}
          projectVideo={projectVideo}
          isSubmitted={isSubmitted}
          submitCount={submitCount}
          poolDetail={poolDetailUs}
          labelButton={handleLabelButton()}
        />
      )
    },
    {
      key: EditFormTabs.LINKS,
      label: t('v2.editProject.formTabs.links.title'),
      children: (
        <ProjectEditLinksForm
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          trigger={trigger}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          labelButton={handleLabelButton()}
        />
      )
    }
  ]

  return (
    <Modal
      title={
        isLoading || isSuccess ? null : (
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
        )
      }
      showHeader={isLoading || isSuccess ? false : true}
      onClose={() => setProjectEditModal(false)}
      isOpen={isOpenProjectEditModal}
      showCloseIcon={isLoading || isSuccess ? false : true}
      width={'auto'}
      noPadding
    >
      <Container>
        {(isLoading || isSuccess) && (
          <GenericTransactionLoading
            title={
              isSuccess ? `${t('v2.editProject.messages.success')}` : `${t('v2.editProject.messages.loading')}`
            }
            isLoading={isLoading}
            isSuccess={isSuccess}
            successButtonLabel={t('close')}
            chainId={1}
            onSuccessAction={() => {
              handleReset()
            }}
          />
        )}
        {!isLoading && !isSuccess && (
          <Tabs
            items={tabsItems}
            defaultActiveKey={activeTab}
            onChangeActiveTab={value => setActiveTab(value as string)}
          />
        )}
      </Container>
    </Modal>
  )
}

const { Container, Title, LanguageButton } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    width: 100%;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 420px;
    }
  `,
  Title: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: ${({ theme }) => theme.size[16]};
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
