import { CreateCommunityForm } from '@/types/CommunityForm'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import GenericInput from '../shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PiArrowCircleLeftFill, PiPencilSimpleLine } from 'react-icons/pi'
import Button from '../shared/Button'
import ProjectCreateLoading from './ProjectCreateLoading'
import ProjectCreateSuccess from './ProjectCreateSuccess'

type ProjectRegisterInfoProps = {
  formValues: CreateCommunityForm
  isLoading: boolean
  isSuccess: boolean
  register: UseFormRegister<CreateCommunityForm>
  previewStep: () => void
  onSubmit: () => void
}

export default function ProjectRegisterMoreInfo({
  register,
  isSuccess,
  isLoading,
  previewStep,
  onSubmit
}: ProjectRegisterInfoProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container>
      {!isLoading && isSuccess && <ProjectCreateSuccess />}
      {isLoading && !isSuccess && <ProjectCreateLoading />}
      {!isLoading && !isSuccess && (
        <FormContainer>
          <GenericInput title={t('v2.createProject.form.site')} register={register('site')} type='text' />
          <GenericInput title={t('v2.createProject.form.twitter')} register={register('twitter')} type='text' />
          <GenericInput
            title={t('v2.createProject.form.instagram')}
            register={register('instagram')}
            type='text'
          />
          <GenericInput
            title={t('v2.createProject.form.linkedin')}
            register={register('linkedin')}
            type='text'
          />
          <GenericInput title={t('v2.createProject.form.discord')} register={register('discord')} type='text' />
          <GenericInput
            title={t('v2.createProject.form.telegram')}
            register={register('telegram')}
            type='text'
          />
        </FormContainer>
      )}
      {!isSuccess && (
        <FooterContainer>
          <PreviewStepIcon
            onClick={() => !isLoading && previewStep()}
            className={`${isLoading ? 'disabled' : ''}`}
          />
          <Button
            onClick={onSubmit}
            label={t('v2.createProject.form.register')}
            disabled={isLoading}
            isLoading={isLoading}
            icon={<CreateProjectIcon />}
          />
        </FooterContainer>
      )}
    </Container>
  )
}
const { Container, FormContainer, PreviewStepIcon, FooterContainer, CreateProjectIcon } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
  `,
  FooterContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  PreviewStepIcon: styled(PiArrowCircleLeftFill)`
    font-size: 52px;
    cursor: pointer;
    color: ${({ theme }) => theme.colorV2.blue[1]};
    &.disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.color.blackAlpha[600]};
    }
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `
}
