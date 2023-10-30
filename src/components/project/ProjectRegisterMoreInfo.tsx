import { CreateProjectForm } from '@/types/Project'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import GenericInput from '../shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PiArrowLeft, PiPencilSimpleLine } from 'react-icons/pi'
import Button from '../shared/Button'
import ProjectCreateLoading from './ProjectCreateLoading'
import ProjectCreateSuccess from './ProjectCreateSuccess'

type ProjectRegisterInfoProps = {
  formValues: CreateProjectForm
  isLoading: boolean
  isSuccess: boolean
  register: UseFormRegister<CreateProjectForm>
  previewStep: () => void
  onSubmit: () => void
}

export default function ProjectRegisterMoreInfo({
  register,
  isSuccess,
  isLoading,
  previewStep,
  formValues,
  onSubmit
}: ProjectRegisterInfoProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container>
      {!isLoading && isSuccess && <ProjectCreateSuccess formValues={formValues} />}
      {isLoading && !isSuccess && <ProjectCreateLoading />}
      {!isLoading && !isSuccess && (
        <FormContainer>
          <GenericInput
            title={t('v2.createProject.form.site')}
            register={register('site')}
            type='text'
            placeholder={t('v2.createProject.placeholder.site')}
          />
          <GenericInput
            title={t('v2.createProject.form.twitter')}
            register={register('twitter')}
            type='text'
            placeholder={t('v2.createProject.placeholder.twitter')}
          />
          <GenericInput
            title={t('v2.createProject.form.instagram')}
            register={register('instagram')}
            type='text'
            placeholder={t('v2.createProject.placeholder.instagram')}
          />
          <GenericInput
            title={t('v2.createProject.form.linkedin')}
            register={register('linkedin')}
            type='text'
            placeholder={t('v2.createProject.placeholder.linkedin')}
          />
          <GenericInput
            title={t('v2.createProject.form.discordLink')}
            register={register('discord')}
            type='text'
            placeholder={t('v2.createProject.placeholder.discordLink')}
          />
          <GenericInput
            title={t('v2.createProject.form.telegram')}
            register={register('telegram')}
            type='text'
            placeholder={t('v2.createProject.placeholder.telegram')}
          />
        </FormContainer>
      )}
      {!isSuccess && !isLoading && (
        <FooterContainer>
          <Button
            block
            icon={<CreateProjectIcon />}
            onClick={onSubmit}
            label={t('v2.createProject.form.register')}
          />
          <Button onClick={previewStep} ghost label={t('goToBack')} icon={<PreviewStepIcon />} block />
        </FooterContainer>
      )}
    </Container>
  )
}
const { Container, FormContainer, PreviewStepIcon, FooterContainer, CreateProjectIcon } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 6px;
  `,
  FooterContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  `,
  PreviewStepIcon: styled(PiArrowLeft)`
    font-size: 18px;
    color: ${({ theme }) => theme.colorV2.white[1]};
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `
}
