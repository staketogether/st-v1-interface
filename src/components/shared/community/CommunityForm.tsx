import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ContentfulPool } from '@/types/ContentfulPool'
import { useForm } from 'react-hook-form'
import { PiFloppyDiskLight } from 'react-icons/pi'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import Button from '../Button'
import GenericInput from '../GenericInput'
import CommunityLogo from './CommunityLogo'
import CommunityName from './CommunityName'
import axios from 'axios'
import { useSignMessage } from 'wagmi'
import { notification } from 'antd'
import GenericInputFile from '../GenericInputFile'
import { ProjectContentfulForm } from '@/types/CommunityForm'

type CommunityFormProps = {
  poolDetail?: ContentfulPool
  account: `0x${string}`
  accountIsConnected: boolean
}

export default function CommunityForm({ poolDetail, account }: CommunityFormProps) {
  const { categories } = useContentfulCategoryCollection()
  const { t } = useLocaleTranslation()

  const {
    register,
    formState: { errors, isValid },
    watch,
    getValues,
    setValue
  } = useForm<ProjectContentfulForm>({
    defaultValues: {
      ...poolDetail,
      logo: { base64: undefined, mimeType: undefined },
      cover: { base64: undefined, mimeType: undefined },
      wallet: account,
      category: poolDetail?.category?.sys?.id
    }
  })

  function getVideoIdFromUrl(url?: string): string | null {
    if (!url) return ''
    const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?v=([A-Za-z0-9_-]+)/
    const match = url.match(youtubeUrlPattern)

    if (match && match[4]) {
      return match[4]
    } else {
      return null
    }
  }

  const contentfulVideo = watch('video')
  const videoId = getVideoIdFromUrl(contentfulVideo)

  const opts = {
    height: '250',
    width: '100%',
    playerVars: {
      autoplay: 0
    }
  }

  const message = `Create community - ${account} `
  const { signMessage } = useSignMessage({
    message: message,
    onSuccess: async data => {
      const createCommunityForm = getValues()
      const signatureMessage = { signature: data, message: message }

      await axios.post('/api/community/create', {
        form: {
          ...createCommunityForm,
          wallet: account
        },
        signatureMessage
      })
      notification.success({
        message: `communidate criada com sucesso!`,
        placement: 'topRight'
      })
    }
  })

  const onSubmit = async () => {
    const createCommunityForm = getValues()
    console.log('form', createCommunityForm)
    await signMessage()
  }

  return (
    <Container>
      {poolDetail && (
        <header>
          <CommunityLogo size={32} src={poolDetail?.logo?.url} alt={poolDetail?.logo?.url} />
          <CommunityName $larger name={poolDetail?.name} />
        </header>
      )}
      <FormControl>
        <GenericInputFile setValue={setValue} fieldValue='logo' title={t('v2.stakeProfileEdit.logo')} />
        <GenericInput
          title={t('v2.stakeProfileEdit.communityName')}
          register={register('communityName', { required: true })}
          type='text'
          error={errors.communityName ? t('v2.stakeProfileEdit.requiredField') : ''}
        />
        {poolDetail && <ImageCover src={poolDetail.cover?.url} alt={poolDetail.cover?.fileName} />}
        <GenericInput title={t('v2.stakeProfileEdit.video')} register={register('video')} />
        {contentfulVideo && videoId && <YouTube videoId={videoId} opts={opts} />}
        <GenericInput
          title={t('v2.stakeProfileEdit.category')}
          register={register('category')}
          type='select'
          error={errors.category ? t('v2.stakeProfileEdit.requiredField') : ''}
          options={categories?.map(category => ({
            value: { label: category.name, value: category.sys.id },
            key: category.sys.id
          }))}
        />
        <GenericInput title={t('v2.stakeProfileEdit.site')} register={register('site')} />
        <GenericInput title={t('v2.stakeProfileEdit.linkedin')} register={register('linkedin')} />
        <GenericInput title={t('v2.stakeProfileEdit.youtube')} register={register('youtube')} />
        <GenericInput title={t('v2.stakeProfileEdit.twitter')} register={register('twitter')} />
        <GenericInput title={t('v2.stakeProfileEdit.instagram')} register={register('instagram')} />
        <GenericInput title={t('v2.stakeProfileEdit.facebook')} register={register('facebook')} />

        <GenericInput title={t('v2.stakeProfileEdit.discordName')} register={register('discordName')} />
        <GenericInput title={t('v2.stakeProfileEdit.discord')} register={register('discord')} />
        <GenericInput title={t('v2.stakeProfileEdit.gotas')} register={register('gotas')} />
        <GenericInput title={t('v2.stakeProfileEdit.lens')} register={register('lens')} />
        <GenericInput title={t('v2.stakeProfileEdit.telegram')} register={register('telegram')} />
        <GenericInputFile setValue={setValue} fieldValue='cover' title={t('v2.stakeProfileEdit.cover')} />
        <GenericInput
          title={t('v2.stakeProfileEdit.description')}
          register={register('description')}
          type='longText'
        />

        <Button
          label={t('v2.stakeProfileEdit.save')}
          onClick={onSubmit}
          isLoading={false}
          disabled={!isValid}
          icon={<SaveIcon />}
        />
      </FormControl>
    </Container>
  )
}

const { Container, FormControl, SaveIcon, ImageCover } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: 24px 24px;
    gap: ${({ theme }) => theme.size[32]};
    header {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  FormControl: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[16]};
  `,
  SaveIcon: styled(PiFloppyDiskLight)`
    font-size: 16px;
  `,
  ImageCover: styled.img`
    width: 100% !important;
    height: 237px !important;
    border-radius: ${({ theme }) => theme.size[8]};
    object-fit: cover;
  `
}
