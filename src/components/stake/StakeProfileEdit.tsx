import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ContentfulPool } from '@/types/ContentfulPool'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { PiFloppyDiskLight } from 'react-icons/pi'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import Button from '../shared/Button'
import GenericInput from '../shared/GenericInput'
import GenericInputFile from '../shared/GenericInputFile'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'

export default function StakeProfileEdit({
  poolDetail,
  poolDetailLoading
}: {
  poolDetail: ContentfulPool
  poolDetailLoading: boolean
}) {
  const { categories } = useContentfulCategoryCollection()
  const { t } = useLocaleTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      ...poolDetail,
      category: poolDetail.category
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
  const formData = new FormData()
  const onSubmit = async (data: object) => {
    console.log(data)
    formData.append('cover', data.cover[0]);
    formData.append('contract', data.contract);
    const response = await axios.post('/api/profile', formData)
    // console.log('formData', formData)
  }
  return (
    <Container>
      <header>
        <CommunityLogo
          size={32}
          src={poolDetail?.logo?.url}
          alt={poolDetail?.logo?.url}
          loading={poolDetailLoading}
        />
        {poolDetail && <CommunityName $larger name={poolDetail?.name} loading={poolDetailLoading} />}
      </header>
      <FormControl onSubmit={handleSubmit(onSubmit)} action='/api/profile' method='post'  >
        <GenericInput title={t('v2.stakeProfileEdit.logo')} type='file' register={register('logo.url')} />
        <GenericInput
          title={t('v2.stakeProfileEdit.communityName')}
          register={register('name', { required: true })}
          type='text'
          error={errors.name ? t('v2.stakeProfileEdit.requiredField') : ''}
        />
        <input type='file' {...register('cover')} />
        <GenericInputFile name={t('v2.stakeProfileEdit.cover')} title="Cover" form={formData} />
        {poolDetail && <ImageCover src={poolDetail.cover?.url} alt={poolDetail.cover?.fileName} />}
        <GenericInput title={t('v2.stakeProfileEdit.video')} register={register('video')} />
        {contentfulVideo && videoId && <YouTube videoId={videoId} opts={opts} />}
        <GenericInput
          title={t('v2.stakeProfileEdit.category')}
          register={register('category.name')}
          type='select'
          options={categories?.map(category => ({ value: category.name, key: category.name }))}
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
        <GenericInput
          title={t('v2.stakeProfileEdit.description')}
          register={register('description')}
          type='longText'
        />

        <Button label={t('v2.stakeProfileEdit.save')} isLoading={false} type='submit' icon={<SaveIcon />} />
      </FormControl>
    </Container >
  )
}

const { Container, FormControl, SaveIcon, ImageCover, InputFile } = {
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
  FormControl: styled.form`
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
  `,
  InputFile: styled.input`
    display: block;
  `
}
