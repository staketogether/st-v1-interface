import React from 'react'
import styled from 'styled-components'
import successAnimation from '@assets/animations/success-animation.json'
import LottieAnimation from '../shared/LottieAnimation'
import { CreateCommunityForm } from '@/types/CommunityForm'
import ProjectRegisteredCard from './ProjectRegisteredCard'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

type ProjectCreateSuccessProps = {
  formValues: CreateCommunityForm
}

export default function ProjectCreateSuccess({ formValues }: ProjectCreateSuccessProps) {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <div>
        <LottieAnimation animationData={successAnimation} height={60} />
        <MessageContainer>
          <h2>{`${t('v2.createProject.successMessages.title')}`}</h2>
          <span>{`${t('v2.createProject.successMessages.description')}`}</span>
        </MessageContainer>
      </div>
      <ProjectRegisteredCard
        projectLogo={`data:${formValues.logo?.mimeType};base64,${formValues.logo?.base64}`}
        projectName={formValues.projectName}
        projectStatus={'pending'}
        projectWallet={formValues.wallet as `0x${string}`}
        createAt={new Date().toISOString()}
      />
    </Container>
  )
}

const { Container, MessageContainer } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding-bottom: 24px;

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
    }
  `,
  MessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    text-align: center;
    h2 {
      font-size: ${({ theme }) => theme.font.size[18]};
      color: ${({ theme }) => theme.color.primary};
      font-weight: 500;
    }
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.secondary};
      font-weight: 500;
    }
  `
}
