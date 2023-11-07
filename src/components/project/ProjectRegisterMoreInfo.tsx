import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProjectCreateInfo, ProjectLinksToAnalyze } from '@/types/Project'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PiArrowLeft, PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import Button from '../shared/Button'
import Input from '../shared/inputs/Input'
import ProjectCreateLoading from './ProjectCreateLoading'
import ProjectCreateSuccess from './ProjectCreateSuccess'

type ProjectRegisterMoreInfoProps = {
  isLoading: boolean
  isSuccess: boolean
  current: number
  account?: `0x${string}`
  projectInfo: ProjectCreateInfo | null
  registerLinksToAnalyze: (data: ProjectLinksToAnalyze) => void
  previewStep: () => void
}

export default function ProjectRegisterMoreInfo({
  isSuccess,
  isLoading,
  projectInfo,
  account,
  current,
  previewStep,
  registerLinksToAnalyze
}: ProjectRegisterMoreInfoProps) {
  const { t } = useLocaleTranslation()

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const { chainId } = chain
  const isWrongNetwork = chainId !== walletChainId?.id
  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    return t('v2.createProject.form.register')
  }

  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: chainId
  })

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    trigger,
    reset
  } = useForm<ProjectLinksToAnalyze>()
  const formValues = getValues()

  useEffect(() => {
    reset()
  }, [account, t, reset])

  const onSubmit: SubmitHandler<ProjectLinksToAnalyze> = data => {
    if (isWrongNetwork && switchNetworkAsync) {
      switchNetworkAsync()
      return
    }
    registerLinksToAnalyze(data)
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)} className={current === 1 ? 'active' : ''}>
      {!isLoading && isSuccess && (
        <ProjectCreateSuccess
          formValues={{
            ...formValues,
            logo: { mimeType: projectInfo?.logo?.mimeType, base64: projectInfo?.logo?.base64 || '' }
          }}
        />
      )}
      {isLoading && !isSuccess && <ProjectCreateLoading />}
      {!isLoading && !isSuccess && (
        <FormContainer>
          <Input
            title={t('v2.createProject.form.site')}
            register={register('site', {
              pattern: {
                value: /[(https)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&=]*)/gi,
                message: `${t('v2.createProject.formMessages.site')}`
              },
              onBlur: () => trigger('site')
            })}
            onKeyDown={e => {
              const validUrlCharsRegex = /[a-zA-Z0-9-._~:/?#[\]@!$&'()*+;=]/
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
            title={t('v2.createProject.form.twitter')}
            register={register('twitter', {
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: `${t('v2.createProject.formMessages.twitter')}`
              },
              onBlur: () => trigger('twitter')
            })}
            type='text'
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key.length === 1 && !e.key.match(/^[a-zA-Z0-9_]$/)) {
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
                value: /^[a-zA-Z0-9_]+$/,
                message: `${t('v2.createProject.formMessages.instagram')}`
              },
              onBlur: () => trigger('instagram')
            })}
            type='text'
            maxLength={30}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key.length === 1 && !e.key.match(/^[a-zA-Z0-9_]$/)) {
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
            maxLength={35}
            placeholder={t('v2.createProject.placeholder.linkedin')}
            error={errors.linkedin?.message}
          />
          <Input
            title={t('v2.createProject.form.discordLink')}
            register={register('discord', {
              pattern: {
                value: /^https:\/\/discord\.com\/invite\/[a-zA-Z0-9\-_]+$/,
                message: `${t('v2.createProject.formMessages.discord')}`
              },
              onBlur: () => trigger('discord')
            })}
            onKeyDown={e => {
              const validUrlCharsRegex = /[a-zA-Z0-9-._~:/?#[\]@!$&'()*+;=]/
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
                value: /^https:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/,
                message: `${t('v2.createProject.formMessages.telegram')}`
              },
              onBlur: () => trigger('telegram')
            })}
            type='text'
            onKeyDown={e => {
              const validUrlCharsRegex = /[a-zA-Z0-9-._~:/?#[\]@!$&'()*+;=]/
              if (!validUrlCharsRegex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                e.preventDefault()
              }
            }}
            maxLength={50}
            placeholder={t('v2.createProject.placeholder.telegram')}
            error={errors.telegram?.message}
          />
        </FormContainer>
      )}
      {!isSuccess && !isLoading && (
        <FooterContainer>
          <Button block icon={<CreateProjectIcon />} label={handleLabelButton()} type='submit' />
          <Button
            type='button'
            onClick={previewStep}
            ghost
            label={t('goToBack')}
            icon={<PreviewStepIcon />}
            block
          />
        </FooterContainer>
      )}
    </Container>
  )
}
const { Container, FormContainer, PreviewStepIcon, FooterContainer, CreateProjectIcon } = {
  Container: styled.form`
    display: none;
    padding: 0px 2px;
    &.active {
      display: grid;
      flex-direction: column;
      span {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }
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
    padding: 0px 22px;
  `,
  FooterContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding: 0px 29px 12px 22px;
  `,
  PreviewStepIcon: styled(PiArrowLeft)`
    font-size: 18px;
    color: ${({ theme }) => theme.colorV2.white[1]};
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `
}
