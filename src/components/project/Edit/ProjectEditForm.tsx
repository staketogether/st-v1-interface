import Button from '@/components/shared/Button'
import GenericInput from '@/components/shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProjectContentfulForm } from '@/types/Project'
import { Modal, Upload, notification } from 'antd'
import React, { useState } from 'react'
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'
import { PiCloudArrowUp, PiPencilSimpleLine } from 'react-icons/pi'
import styled from 'styled-components'
import type { UploadFile, RcFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { getBase64 } from '@/services/format'
import Image from 'next/image'
import YouTube from 'react-youtube'
import { ContentfulPool } from '@/types/ContentfulPool'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'

type ProjectAboutFormProps = {
  register: UseFormRegister<ProjectContentfulForm>
  handleSubmit: UseFormHandleSubmit<ProjectContentfulForm, undefined>
  setValue: UseFormSetValue<ProjectContentfulForm>
  clearErrors: UseFormClearErrors<ProjectContentfulForm>
  onSubmit: () => Promise<void>
  isSubmitted: boolean
  errors: FieldErrors<ProjectContentfulForm>
  projectVideo: string | undefined
  poolDetail: ContentfulPool
}

export default function ProjectEditForm({
  register,
  handleSubmit,
  setValue,
  clearErrors,
  onSubmit,
  errors,
  projectVideo: ProjectVideo,
  isSubmitted,
  poolDetail
}: ProjectAboutFormProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(poolDetail.logo.url ? poolDetail?.logo?.url : '')
  const [previewTitle, setPreviewTitle] = useState(poolDetail.logo.fileName ? poolDetail.logo.fileName : '')
  const [fileList, setFileList] = useState<UploadFile[]>(
    poolDetail.logo.url
      ? [
          {
            uid: '1',
            name: poolDetail?.logo.fileName,
            status: 'done',
            url: poolDetail?.logo?.url
          }
        ]
      : []
  )
  const { t } = useLocaleTranslation()
  const { categories } = useContentfulCategoryCollection()

  const beforeUpload: UploadProps['beforeUpload'] = file => {
    const maxSize = 1 * 1024 * 1024
    if (file.size > maxSize) {
      notification.warning({
        message: `${t('v2.createProject.formMessages.sizeImage')}`,
        placement: 'topRight'
      })
      return false || Upload.LIST_IGNORE
    }
    return true
  }

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList)

    if (info.file.status === 'done') {
      const file = await getBase64(info.fileList[0].originFileObj as RcFile)
      if (file) {
        const [imageType, imageBase64] = file.split(',')
        const mimeType = imageType.split(':')[1].split(';')[0]
        setValue('logo', { base64: imageBase64, mimeType })
        clearErrors('logo')
      }
    }
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

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

  const videoId = getVideoIdFromUrl(ProjectVideo)

  const opts = {
    height: '250',
    width: '100%',
    style: {
      borderRadius: '8px'
    },
    playerVars: {
      autoplay: 0
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <FormContainer>
          <LogoContainer className={`${errors.logo && isSubmitted && 'error'} `}>
            <span>{t('v2.createProject.form.logo')}</span>
            <Upload
              listType='picture-circle'
              maxCount={1}
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <UploadIcon />
                  <div style={{ opacity: '0.4' }}>{t('v2.createProject.form.upload')}</div>
                </div>
              )}
            </Upload>
            <ErrorMessage>
              {errors.logo && isSubmitted && `${t('v2.createProject.formMessages.required')}`}
            </ErrorMessage>
          </LogoContainer>
          <GenericInput
            title={t('v2.createProject.form.wallet')}
            register={register('wallet', { required: `${t('v2.createProject.formMessages.required')}` })}
            type='text'
            disabled
            error={errors.wallet?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.category') + '*'}
            register={register('category')}
            type='select'
            error={errors.category ? t('v2.stakeProfileEdit.requiredField') : ''}
            options={categories?.map(category => ({
              value: { label: category.name, value: category.sys.id },
              key: category.sys.id
            }))}
          />
          <GenericInput
            title={t('v2.createProject.form.video')}
            register={register('video', { required: `${t('v2.createProject.formMessages.required')}` })}
            type='text'
            error={errors.video?.message}
          />
          {ProjectVideo && videoId && <YouTube videoId={videoId} opts={opts} />}
          <GenericInput
            title={t('v2.createProject.form.descriptionPt')}
            register={register('descriptionPt', { required: `${t('v2.createProject.formMessages.required')}` })}
            type='longText'
            error={errors.descriptionPt?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.descriptionEn')}
            register={register('descriptionEn', { required: `${t('v2.createProject.formMessages.required')}` })}
            type='longText'
            error={errors.descriptionEn?.message}
          />
          <GenericInput
            title={t('v2.createProject.form.site')}
            register={register('site')}
            type='text'
            placeholder={t('v2.createProject.placeholder.site')}
          />
          <GenericInput
            title={t('v2.createProject.form.youtube')}
            register={register('youtube')}
            type='text'
            placeholder={t('v2.createProject.placeholder.youtube')}
          />
          <GenericInput
            title={t('v2.createProject.form.contract')}
            register={register('contract')}
            type='text'
            placeholder={t('v2.createProject.placeholder.contract')}
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
            title={t('v2.createProject.form.discordName')}
            register={register('discord')}
            type='text'
            placeholder={t('v2.createProject.placeholder.discordName')}
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
        <Button block icon={<CreateProjectIcon />} type='submit' label={`${t('save')}`} />
      </Container>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <Image
            alt='project image'
            style={{ borderRadius: '8px' }}
            width={400}
            height={400}
            src={previewImage}
          />
        </div>
      </Modal>
    </Form>
  )
}

const { Container, CreateProjectIcon, UploadIcon, Form, FormContainer, LogoContainer, ErrorMessage } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Form: styled.form``,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    max-height: 600px;
    overflow: auto;

    iframe {
      border-radius: ${({ theme }) => theme.size[8]};
    }
  `,
  LogoContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    > span {
      > div {
        > div {
          border: none !important;
          background: ${({ theme }) => theme.colorV2.gray[2]} !important;
          box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2) !important;
          color: ${({ theme }) => theme.colorV2.gray[1]} !important;
          font-weight: 500 !important;
          margin: 0px !important;
          border-radius: 50% !important;
          > div {
            border-radius: 50% !important;
            padding: 0px !important;
          }
        }
      }
    }
    &.error {
      span {
        > div {
          color: ${({ theme }) => theme.color.red[300]};

          > div {
            &.ant-upload.ant-upload-select {
              border-color: ${({ theme }) => theme.color.red[300]};
            }
            > div {
              &.ant-upload-list-item.ant-upload-list-item-undefined {
                border-color: ${({ theme }) => theme.color.red[300]} !important;
              }
            }
          }
        }
      }
    }
    &.disabled {
      span {
        opacity: 0.4;
      }
    }
    span {
      font-size: 14px;
      > div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
    }
  `,
  ErrorMessage: styled.span`
    font-size: 14px;
    height: 14px;
    color: ${({ theme }) => theme.color.red[300]} !important;
  `,
  UploadIcon: styled(PiCloudArrowUp)`
    font-size: 24px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.4;
  `,
  CreateProjectIcon: styled(PiPencilSimpleLine)`
    font-size: 15px;
  `
}
