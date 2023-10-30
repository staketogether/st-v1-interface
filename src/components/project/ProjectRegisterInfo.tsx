import React from 'react'
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'
import styled from 'styled-components'
import GenericInput from '../shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Modal, Upload, notification } from 'antd'
import { PiArrowRight, PiCloudArrowUpBold } from 'react-icons/pi'
import type { UploadFile, RcFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import ConnectWallet from '../shared/ConnectWallet'
import Image from 'next/image'
import Button from '../shared/Button'
import { getBase64 } from '@/services/format'
import { CreateProjectForm } from '@/types/Project'

type ProjectRegisterInfoProps = {
  errors: FieldErrors<CreateProjectForm>
  formValues: CreateProjectForm
  hasAgreeTerms: boolean
  account?: `0x${string}`
  previewOpen: boolean
  isSubmitted: boolean
  previewImage: string
  previewTitle: string
  fileList: UploadFile[]
  nextStep: () => void
  register: UseFormRegister<CreateProjectForm>
  setValue: UseFormSetValue<CreateProjectForm>
  setHasAgreeTerms: (value: boolean) => void
  handleSubmit: UseFormHandleSubmit<CreateProjectForm, undefined>
  setPreviewOpen: (value: boolean) => void
  setPreviewImage: (value: string) => void
  setPreviewTitle: (value: string) => void
  setFileList: (value: UploadFile[]) => void
  clearErrors: UseFormClearErrors<CreateProjectForm>
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
      // const file = await getBase64(info.fileList[0].originFileObj as RcFile)
      const file = info.fileList[0].originFileObj as RcFile
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = event => {
          if (event && event.target && event.target.result) {
            // const imageDataURL = URL.createObjectURL(file)
            const image = event.target.result as string
            const [imageType, imageBase64] = image.split(',')
            const mimeType = imageType.split(':')[1].split(';')[0]

            setValue('logo', { base64: imageBase64, mimeType })
            clearErrors('logo')
          }
        }

        reader.readAsDataURL(file)
      } else {
        // Handle the case where a non-image file is selected
        alert('Por favor, selecione uma imagem válida.')
      }
      // if (file) {
      //   const [imageType, imageBase64] = file.split(',')
      //   const mimeType = imageType.split(':')[1].split(';')[0]
      //   setValue('logo', { base64: imageBase64, mimeType })
      //   clearErrors('logo')
      // }
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
              {/* <GenericInputFile
                title={t('v2.createProject.form.logo')}
                setValue={setValue}
                clearErrors={clearErrors}
              /> */}
              <FormContainer>
                <LogoContainer
                  className={`${errors.logo && isSubmitted && 'error'} ${hasAgreeTerms ? '' : 'disabled'}`}
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
                  title={t('v2.createProject.form.wallet') + '*'}
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
                  placeholder={t('v2.createProject.placeholder.email')}
                />
                <GenericInput
                  title={t('v2.createProject.form.about') + '*'}
                  disabled={!hasAgreeTerms}
                  register={register('aboutProject', {
                    required: `${t('v2.createProject.formMessages.required')}`
                  })}
                  type='longText'
                  error={errors.aboutProject?.message}
                  placeholder={t('v2.createProject.placeholder.about')}
                />
              </FormContainer>
              <Button
                block
                icon={<NextStepIcon />}
                type='submit'
                disabled={!hasAgreeTerms}
                label={`${t('next')}`}
              />
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
const { Container, Terms, UploadIcon, Form, FormContainer, LogoContainer, NextStepIcon, ErrorMessage } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;
    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Form: styled.form``,

  Terms: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[8]} 0;
    margin-bottom: 24px;

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
    }

    > input {
      cursor: pointer;
    }
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 850px;
    overflow: auto;
    margin-bottom: 6px;
  `,
  LogoContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    border-radius: 8px;
    border: 1px solid rgba(64, 74, 87, 0.2);
    padding: 24px 0 12px;
    margin-bottom: 12px;

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
        opacity: 0.4;
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
  NextStepIcon: styled(PiArrowRight)`
    font-size: 18px;
    color: ${({ theme }) => theme.colorV2.white[1]};
  `,
  ErrorMessage: styled.span`
    font-size: ${({ theme }) => theme.font.size[13]};
    height: 14px;
    color: ${({ theme }) => theme.color.red[300]} !important;
  `,
  UploadIcon: styled(PiCloudArrowUpBold)`
    font-size: 24px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.4;
  `
}
