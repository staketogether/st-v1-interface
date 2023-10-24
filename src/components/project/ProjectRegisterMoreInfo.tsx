import { CreateCommunityForm } from '@/types/CommunityForm'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import GenericInput from '../shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PiArrowCircleLeftFill, PiPencilSimpleLine } from 'react-icons/pi'
import Button from '../shared/Button'
import ProjectCreateLoading from './ProjectCreateLoading'
import ProjectCreateSuccess from './ProjectCreateSuccess'

type ProjectRegisterInfoProps = {
  errors: FieldErrors<CreateCommunityForm>
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
  errors,
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
          <GenericInput
            title={'Site'}
            register={register('site')}
            type='text'
            error={errors.site ? t('v2.stakeProfileEdit.requiredField') : ''}
          />
          <GenericInput
            title={'Twitter'}
            register={register('twitter')}
            type='text'
            error={errors.twitter ? t('v2.stakeProfileEdit.requiredField') : ''}
          />
          <GenericInput
            title={'Instagram'}
            register={register('instagram')}
            type='text'
            error={errors.instagram ? t('v2.stakeProfileEdit.requiredField') : ''}
          />
          <GenericInput
            title={'Linkedin'}
            register={register('linkedin')}
            type='text'
            error={errors.linkedin ? t('v2.stakeProfileEdit.requiredField') : ''}
          />
          <GenericInput
            title={'Discord'}
            register={register('discord')}
            type='text'
            error={errors.discord ? t('v2.stakeProfileEdit.requiredField') : ''}
          />
          <GenericInput
            title={'Telegram'}
            register={register('telegram')}
            type='text'
            error={errors.telegram ? t('v2.stakeProfileEdit.requiredField') : ''}
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
            label={'Cadastrar'}
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
    gap: 24px;
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
