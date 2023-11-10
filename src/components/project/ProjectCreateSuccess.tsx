import React from 'react'
import styled from 'styled-components'
import successAnimation from '@assets/animations/success-animation.json'
import LottieAnimation from '../shared/LottieAnimation'
import { CreateProjectForm } from '@/types/Project'
import ProjectRegisteredCard from './ProjectRegisteredCard'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import useProjectCreateModal from '@/hooks/useProjectCreateModal'
import Button from '../shared/Button'

type ProjectCreateSuccessProps = {
  formValues: CreateProjectForm
}

export default function ProjectCreateSuccess({ formValues }: ProjectCreateSuccessProps) {
  const { t } = useLocaleTranslation()
  const { categories } = useContentfulCategoryCollection()
  const { setOpenProjectCreateModal: setCommunityCreateModal } = useProjectCreateModal()

  return (
    <Container>
      <header>
        <LottieAnimation animationData={successAnimation} height={52} width={52} />
        <span>{`${t('v2.createProject.successMessages.title')}`}</span>
      </header>
      <ProjectRegisteredCard
        projectLogo={`data:${formValues.logo?.mimeType};base64,${formValues.logo?.base64}`}
        projectName={formValues.projectName}
        projectStatus={'pending'}
        createAt={new Date().toISOString()}
        ProjectCategory={
          (categories?.length && categories.find(category => category.sys.id === formValues.category)?.name) ||
          'education'
        }
      />
      <MessageContainer>{`${t('v2.createProject.successMessages.description')}`}</MessageContainer>
      <SuccessButton
        onClick={() => setCommunityCreateModal(false)}
        label={`${t('close')}`}
        icon={<></>}
        isLoading={false}
      />
    </Container>
  )
}

const { Container, MessageContainer, SuccessButton } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding: 24px;
    gap: ${({ theme }) => theme.size[24]};

    > header {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
      margin-bottom: -10px;
      color: ${({ theme }) => theme.color.green[500]};
      span {
        color: ${({ theme }) => theme.color.green[500]}!important;
        text-align: center;
        font-size: ${({ theme }) => theme.font.size[18]};
        font-weight: 500;
      }
    }
  `,
  SuccessButton: styled(Button)`
    padding: 0px 48px;
  `,
  MessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    text-align: center;

    font-size: ${({ theme }) => theme.font.size[15]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
  `
}
