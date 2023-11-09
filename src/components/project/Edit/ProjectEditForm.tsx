import Button from '@/components/shared/Button'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Switch, Upload, notification } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger
} from 'react-hook-form'
import { PiCloudArrowUp, PiPencilSimpleLine, PiTrashSimple } from 'react-icons/pi'
import styled from 'styled-components'
import type { UploadFile, RcFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { getBase64, getVideoIdFromUrl } from '@/services/format'
import YouTube from 'react-youtube'
import { ContentfulPool } from '@/types/ContentfulPool'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import ImgCrop from 'antd-img-crop'
import Input from '@/components/shared/inputs/Input'
import Select from '@/components/shared/inputs/Select'
import TextArea from '@/components/shared/inputs/TextArea'
import { EditProjectForm } from '@/types/Project'
import { projectRegexFields, projectRegexOnKeyDown } from '@/components/shared/regex'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'

type ProjectAboutFormProps = {
  register: UseFormRegister<EditProjectForm>
  handleSubmit: UseFormHandleSubmit<EditProjectForm, undefined>
  setValue: UseFormSetValue<EditProjectForm>
  clearErrors: UseFormClearErrors<EditProjectForm>
  onSubmit: () => Promise<void>
  projectName?: string
  trigger: UseFormTrigger<EditProjectForm>
  isSubmitted: boolean
  errors: FieldErrors<EditProjectForm>
  projectVideo: string | undefined
  poolDetail: ContentfulPool
  projectCover:
    | {
        base64: string
        mimeType?: string | undefined
      }
    | undefined
  labelButton: string
  language: 'pt' | 'en'
}

export default function ProjectEditForm({
  register,
  handleSubmit,
  setValue,
  clearErrors,
  onSubmit,
  errors,
  trigger,
  projectVideo,
  isSubmitted,
  poolDetail,
  language,
  labelButton,
  projectCover,
  projectName
}: ProjectAboutFormProps) {
  const [userVideo, setUserVideo] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cover, setCover] = useState<string | undefined>(undefined)
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
  const { poolTypeTranslation } = usePoolTypeTranslation()

  const { categories } = useContentfulCategoryCollection()
  useEffect(() => {
    if (categories?.length && poolDetail.category) {
      const category = categories.find(category => category.name === poolDetail.category.name)
      if (category) {
        setValue('category', category.sys.id)
      }
    }
  }, [categories, poolDetail, poolDetail.category, setValue])

  useEffect(() => {
    if (poolDetail.cover?.url) {
      setUserVideo(false)
      setCover(poolDetail.cover?.url)
    }
  }, [poolDetail.cover])

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

  const videoId = getVideoIdFromUrl(projectVideo)

  const opts = {
    height: '237',
    width: '100%',
    style: {
      borderRadius: '8px'
    },
    playerVars: {
      autoplay: 0
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
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

  const handleImageCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    if (file.size > 1048576) {
      notification.warning({
        message: `${t('v2.createProject.formMessages.sizeImage')}`,
        placement: 'topRight'
      })
    } else {
      const fileBase64 = await getBase64(file)

      if (fileBase64) {
        const [imageType, imageBase64] = fileBase64.split(',')
        const mimeType = imageType.split(':')[1].split(';')[0]
        setValue('cover', { base64: imageBase64, mimeType })
        clearErrors('cover')
      }
    }
  }

  const handleRemoveCover = () => {
    setValue('cover', undefined)
    setCover(undefined)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <FormContainer>
          <LogoContainer className={`${errors.logo && isSubmitted && 'error'} `}>
            <span>{t('v2.createProject.form.logo')}</span>
            <ImgCrop cropShape='round' beforeCrop={beforeUpload}>
              <Upload
                listType='picture-circle'
                maxCount={1}
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                customRequest={async ({ onSuccess }) => {
                  onSuccess && onSuccess('ok')
                }}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <UploadIcon />
                    <div style={{ opacity: '0.4' }}>{t('v2.createProject.form.upload')}</div>
                  </div>
                )}
              </Upload>
            </ImgCrop>
            <ErrorMessage>
              {errors.logo && isSubmitted && `${t('v2.createProject.formMessages.required')}`}
            </ErrorMessage>
          </LogoContainer>
          <Input
            title={t('v2.createProject.form.name')}
            register={register('projectName', {
              required: `${t('v2.createProject.formMessages.required')}`
            })}
            maxLength={30}
            type='text'
            onChange={e => {
              if (projectRegexFields.name.test(e.target.value) || e.target.value === '') {
                setValue('projectName', e.target.value)
              }
            }}
            onBlur={() => trigger('projectName')}
            value={projectName}
            error={errors.projectName?.message}
          />
          <Select
            title={t('v2.createProject.form.category')}
            register={register('category')}
            type='select'
            error={errors.category ? t('v2.stakeProfileEdit.requiredField') : ''}
            options={categories?.map(category => ({
              value: { label: poolTypeTranslation(category.name), value: category.sys.id },
              key: category.sys.id
            }))}
          />
          {language === 'en' && (
            <TextArea
              title={t('v2.createProject.form.description')}
              register={register('descriptionEn')}
              maxLength={500}
              onBlur={() => trigger('descriptionEn')}
              placeholder={t('v2.createProject.placeholder.description')}
              error={errors.descriptionPt?.message}
              showCharCounter
            />
          )}
          {language === 'pt' && (
            <TextArea
              title={t('v2.createProject.form.description')}
              register={register('descriptionPt')}
              maxLength={500}
              onBlur={() => trigger('descriptionPt')}
              placeholder={t('v2.createProject.placeholder.description')}
              error={errors.descriptionPt?.message}
              showCharCounter
            />
          )}
          <ProjectCoverContainer>
            <div>
              <span>{t('v2.createProject.form.useVideo')}</span>
              <Switch size='small' checked={userVideo} onChange={e => setUserVideo(e)} />
            </div>
            {language === 'en' && userVideo && (
              <>
                {userVideo && (
                  <Input
                    title={t('v2.createProject.form.video')}
                    register={register('videoEn', {
                      pattern: {
                        value: projectRegexFields.youtubeVideo,
                        message: `${t('v2.createProject.formMessages.youtube')}'`
                      }
                    })}
                    onKeyDown={e => {
                      const validCharsRegex = projectRegexOnKeyDown.url
                      if (!validCharsRegex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                        e.preventDefault()
                      }
                    }}
                    onBlur={() => trigger('videoEn')}
                    error={errors.videoEn?.message}
                    type='text'
                    placeholder={t('v2.createProject.placeholder.video')}
                  />
                )}
                {!userVideo && (
                  <CoverContainer>
                    <span>{t('v2.editProject.formTabs.about.cover')}</span>
                    <CoverInputArea onClick={handleClick}>
                      <div>
                        <div>
                          <UploadIcon />
                          <div style={{ opacity: '0.6' }}>{t('v2.createProject.form.upload')}</div>
                        </div>
                        <span>Jpeg, PNG (820x480px)</span>
                      </div>
                    </CoverInputArea>
                    <input
                      type='file'
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onChange={handleImageCoverChange}
                      accept='image/*'
                    />
                  </CoverContainer>
                )}
              </>
            )}
            {language === 'pt' && (
              <>
                {userVideo && (
                  <Input
                    title={t('v2.createProject.form.video')}
                    register={register('videoPt', {
                      pattern: {
                        value: projectRegexFields.youtubeVideo,
                        message: `${t('v2.createProject.formMessages.youtube')}`
                      }
                    })}
                    onKeyDown={e => {
                      const validCharsRegex = projectRegexOnKeyDown.url
                      if (!validCharsRegex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
                        e.preventDefault()
                      }
                    }}
                    onBlur={() => trigger('videoPt')}
                    type='text'
                    placeholder={t('v2.createProject.placeholder.video')}
                    error={errors.videoPt?.message}
                  />
                )}
                {!userVideo && (
                  <CoverContainer>
                    <span>{t('v2.editProject.formTabs.about.cover')}</span>
                    {!cover && (
                      <CoverInputArea onClick={handleClick}>
                        <div>
                          <div>
                            <UploadIcon />
                            <div style={{ opacity: '0.6' }}>{t('v2.createProject.form.upload')}</div>
                          </div>
                          <span>Jpeg, PNG (820x480px)</span>
                        </div>
                      </CoverInputArea>
                    )}
                    {(projectCover?.base64 || cover) && (
                      <CoverWrapper>
                        {projectCover?.base64 && !cover && (
                          <ImageCover
                            src={`data:image/jpeg;base64,${projectCover.base64}`}
                            alt={projectCover.mimeType}
                          />
                        )}
                        {!projectCover?.base64 && cover && <ImageCover src={cover} alt={poolDetail.name} />}
                        <CoverOverlay className='overlay'>
                          <RemoveIcon onClick={handleRemoveCover} />
                        </CoverOverlay>
                      </CoverWrapper>
                    )}

                    <input
                      type='file'
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onChange={handleImageCoverChange}
                      accept='image/*'
                    />
                  </CoverContainer>
                )}
              </>
            )}
          </ProjectCoverContainer>
          {projectVideo && videoId && userVideo && <YouTube videoId={videoId} opts={opts} />}
        </FormContainer>
        <Divider />
        <footer>
          <Button block icon={<CreateProjectIcon />} type='submit' label={labelButton} />
        </footer>
      </Container>
    </Form>
  )
}

const {
  Container,
  CreateProjectIcon,
  Divider,
  ProjectCoverContainer,
  UploadIcon,
  Form,
  FormContainer,
  LogoContainer,
  CoverContainer,
  CoverInputArea,
  RemoveIcon,
  ErrorMessage,
  ImageCover,
  CoverWrapper,
  CoverOverlay
} = {
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
  LogoContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    border-radius: 8px;
    border: 1px solid rgba(64, 74, 87, 0.2);
    padding: 24px 0 12px;
    margin-bottom: 12px;

    a {
      display: none;
    }

    > span {
      > div {
        > div {
          border: none !important;
          background: ${({ theme }) => theme.colorV2.gray[2]} !important;
          box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2) !important;
          color: ${({ theme }) => theme.colorV2.gray[1]} !important;
          font-weight: 400 !important;
          font-size: ${({ theme }) => theme.font.size[13]} !important;
          margin: 0px !important;
        }
        margin: 0px !important;
        border-radius: 50% !important;
        > div {
          border-radius: 50% !important;
        }
      }
    }

    &.error {
      span {
        &.ant-upload {
          border: 1px solid ${({ theme }) => theme.color.red[300]};
          border-radius: 50%;
        }
        > div {
          color: ${({ theme }) => theme.color.red[300]};

          > div {
            opacity: initial !important;
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
        opacity: 0.5;
      }
    }
    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      > div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
    }
  `,
  Divider: styled.div`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.2));
  `,
  ProjectCoverContainer: styled.div`
    margin-top: 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    > div {
      &:nth-child(1) {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
        position: absolute;
        right: 0px;
        top: -2px;
        > span {
          color: ${({ theme }) => theme.colorV2.gray[1]};
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
        }
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
  `,
  CoverContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[13]};
  `,

  ImageCover: styled.img`
    width: 100% !important;
    height: 237px !important;
    border-radius: ${({ theme }) => theme.size[8]};
    object-fit: cover;
    transition: transform 0.3s ease;
  `,
  CoverWrapper: styled.div`
    position: relative;
    width: 100%;
    height: 237px;
    border-radius: ${({ theme }) => theme.size[8]};
    overflow: hidden;

    &:hover .overlay {
      display: flex;
    }
  `,
  CoverOverlay: styled.div`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    font-weight: bold;
    transition: opacity 0.5s ease;
  `,
  CoverInputArea: styled.div`
    cursor: pointer;
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid rgba(64, 74, 87, 0.2);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.colorV2.gray[1]};

    > div {
      height: 80px;
      width: 100%;
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 8px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${({ theme }) => theme.size[8]};

      > div {
        &:nth-child(1) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      span {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        opacity: 0.4;
      }
    }
  `,
  RemoveIcon: styled(PiTrashSimple)`
    color: ${({ theme }) => theme.colorV2.white};
    font-size: 20px;
    cursor: pointer;
  `
}
