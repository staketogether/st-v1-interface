import { CreateCommunityForm } from '@/types/CommunityForm'
import React, { useState } from 'react'
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue
} from 'react-hook-form'
import styled from 'styled-components'
import GenericInput from '../shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Modal, Upload, notification } from 'antd'
import { PiArrowCircleRightFill, PiPlus } from 'react-icons/pi'
import type { UploadFile } from 'antd/es/upload/interface'
import type { RcFile, UploadProps, UploadChangeParam } from 'antd/es/upload'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import ConnectWallet from '../shared/ConnectWallet'
import Image from 'next/image'

type ProjectRegisterInfoProps = {
  errors: FieldErrors<CreateCommunityForm>
  formValues: CreateCommunityForm
  hasAgreeTerms: boolean
  account?: `0x${string}`
  previewOpen: boolean
  isSubmitted: boolean
  previewImage: string
  previewTitle: string
  fileList: UploadFile[]
  nextStep: () => void
  register: UseFormRegister<CreateCommunityForm>
  setValue: UseFormSetValue<CreateCommunityForm>
  setHasAgreeTerms: (value: boolean) => void
  handleSubmit: UseFormHandleSubmit<CreateCommunityForm, undefined>
  setPreviewOpen: (value: boolean) => void
  setPreviewImage: (value: string) => void
  setPreviewTitle: (value: string) => void
  setFileList: (value: UploadFile[]) => void
  clearErrors: UseFormClearErrors<CreateCommunityForm>
  setError: UseFormSetError<CreateCommunityForm>
}

export default function ProjectRegisterInfo({
  errors,
  account,
  hasAgreeTerms,
  previewOpen,
  previewImage,
  previewTitle,
  isSubmitted,
  fileList,
  setError,
  handleSubmit,
  register,
  nextStep,
  setValue,
  setHasAgreeTerms,
  setPreviewImage,
  setPreviewOpen,
  setPreviewTitle,
  setFileList,
  clearErrors
}: ProjectRegisterInfoProps) {
  const { t } = useLocaleTranslation()
  const { categories } = useContentfulCategoryCollection()
  const [logoSizeError, setLogoSizeError] = useState(false)

  const beforeUpload: UploadProps['beforeUpload'] = file => {
    const maxSize = 1 * 1024 * 1024
    if (file.size > maxSize) {
      notification.warning({
        message: `${t('v2.createProject.formMessages.sizeImage')}`,
        placement: 'topRight'
      })
      setLogoSizeError(true)
      setError('logo', { type: 'custom', message: `${t('v2.createProject.formMessages.sizeImage')}` })
      return false
    }
    return true
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const file = info.fileList[0]
    setFileList(info.fileList)
    if (file && file.thumbUrl && file.type) {
      const [imageType, imageBase64] = file.thumbUrl.split(',')
      const mimeType = imageType.split(':')[1].split(';')[0]
      setValue('logo', { base64: imageBase64, mimeType })
      if (!logoSizeError) {
        setLogoSizeError(false)
        clearErrors('logo')
      }
    }
  }

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const onSubmit = () => {
    if (hasAgreeTerms) {
      nextStep()
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        {!account && <ConnectWallet />}
        {account && (
          <>
            <Terms>
              <input
                type='checkbox'
                name='agree'
                checked={hasAgreeTerms}
                onChange={e => setHasAgreeTerms(e.target.checked)}
              />
              <span>{t('v2.createProject.projectWithMembers')}</span>
            </Terms>
            <>
              <FormContainer>
                <LogoContainer
                  className={`${((errors.logo && isSubmitted) || logoSizeError) && 'error'} ${
                    hasAgreeTerms ? '' : 'disabled'
                  }`}
                >
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
                        <PiPlus />
                        <div style={{ marginTop: 8 }}>{t('v2.createProject.form.upload')}</div>
                      </div>
                    )}
                  </Upload>
                  <ErrorMessage>
                    {errors.logo && isSubmitted && `${t('v2.createProject.formMessages.required')}`}
                  </ErrorMessage>
                </LogoContainer>
                <GenericInput
                  title={t('v2.createProject.form.logo') + '*'}
                  register={register('wallet', { required: `${t('v2.createProject.formMessages.required')}` })}
                  type='text'
                  disabled
                  error={errors.wallet?.message}
                />
                <GenericInput
                  title={t('v2.createProject.form.name') + '*'}
                  register={register('projectName', {
                    required: `${t('v2.createProject.formMessages.required')}`
                  })}
                  type='text'
                  disabled={!hasAgreeTerms}
                  error={errors.projectName?.message}
                />
                <GenericInput
                  title={t('v2.createProject.form.category') + '*'}
                  register={register('category')}
                  type='select'
                  disabled={!hasAgreeTerms}
                  error={errors.category ? t('v2.stakeProfileEdit.requiredField') : ''}
                  options={categories?.map(category => ({
                    value: { label: category.name, value: category.sys.id },
                    key: category.sys.id
                  }))}
                />
                <GenericInput
                  title={t('v2.createProject.form.email') + '*'}
                  disabled={!hasAgreeTerms}
                  register={register('email', {
                    required: `${t('v2.createProject.formMessages.required')}`,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: `${t('v2.createProject.formMessages.invalidEmail')}`
                    }
                  })}
                  type='text'
                  error={errors.email?.message}
                />
                <GenericInput
                  title={t('v2.createProject.form.about') + '*'}
                  disabled={!hasAgreeTerms}
                  register={register('aboutProject', {
                    required: `${t('v2.createProject.formMessages.required')}`
                  })}
                  type='longText'
                  error={errors.aboutProject?.message}
                />
              </FormContainer>
              <ButtonSubmit type='submit' disabled={!hasAgreeTerms}>
                <NextStepIcon />
              </ButtonSubmit>
            </>
          </>
        )}
      </Container>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <Image alt='example' style={{ borderRadius: '8px' }} width={400} height={400} src={previewImage} />
        </div>
      </Modal>
    </Form>
  )
}
const { Container, Terms, Form, FormContainer, LogoContainer, NextStepIcon, ButtonSubmit, ErrorMessage } = {
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

  Terms: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    font-size: ${({ theme }) => theme.font.size[12]};
    font-weight: 500;

    a {
      color: ${({ theme }) => theme.color.primary};
      &:hover {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    > input {
      cursor: pointer;
    }
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    max-height: 600px;
    overflow: auto;
  `,
  LogoContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
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
  ButtonSubmit: styled.button`
    border: none;
    background: transparent;
    margin-left: auto;
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,
  NextStepIcon: styled(PiArrowCircleRightFill)`
    font-size: 52px;
    color: ${({ theme }) => theme.colorV2.blue[1]};
  `,
  ErrorMessage: styled.span`
    font-size: 14px;
    height: 14px;
    color: ${({ theme }) => theme.color.red[300]} !important;
  `
}
