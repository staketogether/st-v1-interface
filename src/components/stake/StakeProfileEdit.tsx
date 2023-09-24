import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ContentfulPool } from '@/types/ContentfulPool'
import { useForm } from 'react-hook-form'
import { PiFloppyDiskLight } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '../shared/Button'
import GenericInput from '../shared/GenericInput'
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
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...poolDetail,
      category: poolDetail.category
    }
  })
  const onSubmit = (data: object) => console.log(data)
  return (
    <Container>
      {poolDetail && <CommunityName $larger name={poolDetail?.name} loading={poolDetailLoading} />}
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <GenericInput
          title={t('v2.stakeProfileEdit.communityName')}
          register={register('name', { required: true })}
          type='text'
          error={errors.name ? t('v2.stakeProfileEdit.requiredField') : ''}
        />
        <GenericInput title={t('v2.stakeProfileEdit.cover')} register={register('cover.url')} />
        <GenericInput title={t('v2.stakeProfileEdit.video')} register={register('video')} />
        <GenericInput
          title={t('v2.stakeProfileEdit.category')}
          register={register('category.name')}
          type='select'
          options={categories?.map(category => ({ value: category.name, key: category.name }))}
        />
        <GenericInput title={t('v2.stakeProfileEdit.logo')} register={register('logo.url')} />
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
    </Container>
  )
}

const { Container, FormControl, SaveIcon } = {
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
  `,
  FormControl: styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[16]};
  `,
  SaveIcon: styled(PiFloppyDiskLight)`
    font-size: 16px;
  `
}
