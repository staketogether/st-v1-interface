import Button from '@/components/shared/Button'
import Input from '@/components/shared/inputs/Input'
import { projectRegexFields, projectRegexOnKeyDown } from '@/components/shared/regex'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { EditProjectForm } from '@/types/Project'
import React, { useEffect, useRef } from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'

type ProjectEditLinksFormProps = {
  register: UseFormRegister<EditProjectForm>
  handleSubmit: UseFormHandleSubmit<EditProjectForm, undefined>
  trigger: UseFormTrigger<EditProjectForm>
  onSubmit: () => Promise<void>
  labelButton: string
  errors: FieldErrors<EditProjectForm>
  isSubmitted: boolean
}

export default function ProjectEditLinksForm({
  register,
  handleSubmit,
  onSubmit,
  trigger,
  labelButton,
  isSubmitted,
  errors
}: ProjectEditLinksFormProps) {
  const { t } = useLocaleTranslation()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSubmitted && errors && modalRef.current && (errors.site || errors.youtube || errors.twitter)) {
      modalRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [errors, isSubmitted, modalRef])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <FormContainer ref={modalRef}>
          <Input
            title={t('v2.createProject.form.site')}
            register={register('site', {
              pattern: {
                value: projectRegexFields.site,
                message: `${t('v2.createProject.formMessages.site')}`
              },
              onBlur: () => trigger('site')
            })}
            onKeyDown={e => {
              const validUrlCharsRegex = projectRegexOnKeyDown.url
              if (!validUrlCharsRegex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                e.preventDefault()
              }
            }}
            maxLength={120}
            type='text'
            placeholder={t('v2.createProject.placeholder.site')}
            error={errors.site?.message}
          />
          <Input
            title={t('v2.createProject.form.youtube')}
            register={register('youtube', {
              pattern: {
                value: projectRegexFields.youtubeChanel,
                message: `${t('v2.createProject.formMessages.youtubeChanel')}`
              },
              onBlur: () => trigger('youtube')
            })}
            maxLength={120}
            onKeyDown={e => {
              const validUrlCharsRegex = projectRegexOnKeyDown.youtubeChanel
              if (
                !validUrlCharsRegex.test(e.key) &&
                e.key !== 'Backspace' &&
                e.key !== 'Enter' &&
                e.key !== 'Tab'
              ) {
                e.preventDefault()
              }
            }}
            placeholder={t('v2.createProject.placeholder.youtube')}
            error={errors.youtube?.message}
          />
          <Input
            title={t('v2.createProject.form.twitter')}
            register={register('twitter', {
              pattern: {
                value: projectRegexFields.socialMedia,
                message: `${t('v2.createProject.formMessages.twitter')}`
              },
              onBlur: () => trigger('twitter')
            })}
            type='text'
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key.length === 1 && !e.key.match(projectRegexOnKeyDown.socialMedia)) {
                e.preventDefault()
              }
            }}
            maxLength={15}
            placeholder={t('v2.createProject.placeholder.twitter')}
            error={errors.twitter?.message}
          />
          <Input
            title={t('v2.createProject.form.instagram')}
            register={register('instagram', {
              pattern: {
                value: projectRegexFields.socialMedia,
                message: `${t('v2.createProject.formMessages.instagram')}`
              },
              onBlur: () => trigger('instagram')
            })}
            type='text'
            maxLength={30}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key.length === 1 && !e.key.match(projectRegexOnKeyDown.socialMedia)) {
                e.preventDefault()
              }
            }}
            placeholder={t('v2.createProject.placeholder.instagram')}
            error={errors.instagram?.message}
          />
          <Input
            title={t('v2.createProject.form.linkedin')}
            register={register('linkedin')}
            type='text'
            placeholder={t('v2.createProject.placeholder.linkedin')}
            error={errors.linkedin?.message}
          />
          <Input
            title={t('v2.createProject.form.discordName')}
            register={register('discordName')}
            type='text'
            maxLength={100}
            placeholder={t('v2.createProject.placeholder.discordName')}
            error={errors.discordName?.message}
          />
          <Input
            title={t('v2.createProject.form.discordLink')}
            register={register('discord', {
              pattern: {
                value: projectRegexFields.discordInvite,
                message: `${t('v2.createProject.formMessages.discord')}`
              },
              onBlur: () => trigger('discord')
            })}
            onKeyDown={e => {
              const validUrlCharsRegex = projectRegexOnKeyDown.url
              if (!validUrlCharsRegex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                e.preventDefault()
              }
            }}
            type='text'
            max={32}
            placeholder={t('v2.createProject.placeholder.discordLink')}
            error={errors.discord?.message}
          />
          <Input
            title={t('v2.createProject.form.telegram')}
            register={register('telegram', {
              pattern: {
                value: projectRegexFields.telegramInvite,
                message: `${t('v2.createProject.formMessages.telegram')}`
              },
              onBlur: () => trigger('telegram')
            })}
            type='text'
            onKeyDown={e => {
              const validUrlCharsRegex = projectRegexOnKeyDown.url
              if (!validUrlCharsRegex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                e.preventDefault()
              }
            }}
            maxLength={50}
            placeholder={t('v2.createProject.placeholder.telegram')}
            error={errors.telegram?.message}
          />
        </FormContainer>
        <Divider />
        <footer>
          <Button block icon={<CreateProjectIcon />} type='submit' label={labelButton} />
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
    padding: 0px 2px;
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
    > footer {
      padding: 0px 22px 24px 24px;
    }
  `,
  Form: styled.form``,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 500px;
    overflow: auto;
    padding: 24px 14px 0px 24px;

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
