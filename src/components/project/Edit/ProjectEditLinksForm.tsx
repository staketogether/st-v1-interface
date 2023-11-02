import Button from '@/components/shared/Button'
import GenericInput from '@/components/shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProjectContentfulForm } from '@/types/Project'
import React from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'

type ProjectEditLinksFormProps = {
  register: UseFormRegister<ProjectContentfulForm>
  handleSubmit: UseFormHandleSubmit<ProjectContentfulForm, undefined>
  onSubmit: () => Promise<void>
  errors: FieldErrors<ProjectContentfulForm>
}

export default function ProjectEditLinksForm({
  register,
  handleSubmit,
  onSubmit,
  errors
}: ProjectEditLinksFormProps) {
  const { t } = useLocaleTranslation()

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
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
            title={t('v2.createProject.form.youtube')}
            register={register('youtube', {
              pattern: {
                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
                message: `${t('v2.createProject.formMessages.site')}`
              },
              maxLength: { value: 120, message: `${t('v2.createProject.formMessages.maxLength')} ${120}` }
            })}
            type='text'
            placeholder={t('v2.createProject.placeholder.youtube')}
            error={errors.youtube?.message}
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
            title={t('v2.createProject.form.discordName')}
            register={register('discordName', {
              maxLength: { value: 30, message: `${t('v2.createProject.formMessages.maxLength')} ${30}` }
            })}
            type='text'
            placeholder={t('v2.createProject.placeholder.discordName')}
            error={errors.discordName?.message}
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
        <Divider />
        <footer>
          <Button block icon={<CreateProjectIcon />} type='submit' label={`${t('save')}`} />
        </footer>
      </Container>
    </Form>
  )
}

const { Container, CreateProjectIcon, Divider, Form, FormContainer } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
    > footer {
      padding: 0px 24px 24px 24px;
    }
  `,
  Form: styled.form``,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 500px;
    overflow: auto;
    padding: 24px 16px 0px 24px;

    iframe {
      border-radius: ${({ theme }) => theme.size[8]};
    }
  `,
  Divider: styled.div`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.2));
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `
}
