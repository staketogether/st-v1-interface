import { CreateProjectForm } from '@/types/Project'
import React from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
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
  errors: FieldErrors<CreateProjectForm>
  register: UseFormRegister<CreateProjectForm>
  handleSubmit: UseFormHandleSubmit<CreateProjectForm, undefined>
  previewStep: () => void
  onSubmit: () => void
}

export default function ProjectRegisterMoreInfo({
  register,
  isSuccess,
  isLoading,
  errors,
  previewStep,
  formValues,
  handleSubmit,
  onSubmit
}: ProjectRegisterInfoProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      {!isLoading && isSuccess && <ProjectCreateSuccess formValues={formValues} />}
      {isLoading && !isSuccess && <ProjectCreateLoading />}
      {!isLoading && !isSuccess && (
        <FormContainer>
          <GenericInput
            title={t('v2.createProject.form.site')}
            register={register('site', {
              pattern: {
                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
                message: `${t('v2.createProject.formMessages.site')}`
              },
              maxLength: { value: 120, message: `${t('v2.createProject.formMessages.maxLength')} ${120}` }
            })}
            type='text'
            placeholder={t('v2.createProject.placeholder.site')}
            error={errors.site?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.twitter')}
            register={register('twitter', {
              pattern: {
                value: /^[a-zA-Z_][a-zA-Z0-9_]{0,14}$/,
                message: `${t('v2.createProject.formMessages.twitter')}`
              },
              maxLength: { value: 15, message: `${t('v2.createProject.formMessages.maxLength')} ${15}` }
            })}
            type='text'
            placeholder={t('v2.createProject.placeholder.twitter')}
            error={errors.twitter?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.instagram')}
            register={register('instagram', {
              pattern: {
                value: /^[a-zA-Z0-9._]{1,30}$/,
                message: `${t('v2.createProject.formMessages.instagram')}`
              },
              maxLength: { value: 30, message: `${t('v2.createProject.formMessages.maxLength')} ${30}` }
            })}
            type='text'
            placeholder={t('v2.createProject.placeholder.instagram')}
            error={errors.instagram?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.linkedin')}
            register={register('linkedin')}
            type='text'
            placeholder={t('v2.createProject.placeholder.linkedin')}
            error={errors.linkedin?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.discordLink')}
            register={register('discord', {
              pattern: {
                value: /^https:\/\/discord\.com\/invite\/[a-zA-Z0-9\-_]+$/,
                message: `${t('v2.createProject.formMessages.discord')}`
              }
            })}
            type='text'
            placeholder={t('v2.createProject.placeholder.discordLink')}
            error={errors.discord?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.telegram')}
            register={register('telegram', {
              pattern: {
                value: /^https:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/,
                message: `${t('v2.createProject.formMessages.telegram')}`
              }
            })}
            type='text'
            placeholder={t('v2.createProject.placeholder.telegram')}
            error={errors.telegram?.message}
          />
        </FormContainer>
      )}
      {!isSuccess && !isLoading && (
        <FooterContainer>
          <Button
            block
            icon={<CreateProjectIcon />}
            type='submit'
            label={t('v2.createProject.form.register')}
          />
          <Button onClick={previewStep} ghost label={t('goToBack')} icon={<PreviewStepIcon />} block />
        </FooterContainer>
      )}
    </Container>
  )
}
const { Container, FormContainer, PreviewStepIcon, FooterContainer, CreateProjectIcon } = {
  Container: styled.form`
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
    max-height: 450px;
    overflow: auto;
    padding-right: 12px;
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
