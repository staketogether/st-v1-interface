import React, { useEffect } from 'react'
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger
} from 'react-hook-form'
import styled from 'styled-components'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Upload, notification } from 'antd'
import { PiArrowRight, PiCloudArrowUpBold } from 'react-icons/pi'
import type { UploadFile, RcFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import ConnectWallet from '../shared/ConnectWallet'

import Button from '../shared/Button'
import { CreateProjectForm } from '@/types/Project'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import Input from '../shared/inputs/Input'
import Select from '../shared/inputs/Select'
import TextArea from '../shared/inputs/TextArea'
import ImgCrop from 'antd-img-crop'

type ProjectRegisterInfoProps = {
  errors: FieldErrors<CreateProjectForm>
  formValues: CreateProjectForm
  hasAgreeTerms: boolean
  account?: `0x${string}`
  isSubmitted: boolean
  fileList: UploadFile[]
  nextStep: () => void
  trigger: UseFormTrigger<CreateProjectForm>
  register: UseFormRegister<CreateProjectForm>
  setValue: UseFormSetValue<CreateProjectForm>
  setHasAgreeTerms: (value: boolean) => void
  handleSubmit: UseFormHandleSubmit<CreateProjectForm, undefined>
  setFileList: (value: UploadFile[]) => void
  clearErrors: UseFormClearErrors<CreateProjectForm>
}

export default function ProjectRegisterInfo({
  errors,
  account,
  hasAgreeTerms,
  isSubmitted,
  fileList,
  handleSubmit,
  trigger,
  register,
  nextStep,
  setValue,
  setHasAgreeTerms,
  setFileList,
  clearErrors
}: ProjectRegisterInfoProps) {
  const { t } = useLocaleTranslation()
  const { categories } = useContentfulCategoryCollection()
  const { poolTypeTranslation } = usePoolTypeTranslation()

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

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

  useEffect(() => {
    if (categories?.length) {
      setValue('category', categories[0].sys.id)
    }
  }, [categories, setValue])

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList)
    if (info.file.status === 'done') {
      const file = info.fileList[0].originFileObj as RcFile
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = event => {
          if (event && event.target && event.target.result) {
            const image = event.target.result as string
            const [imageType, imageBase64] = image.split(',')
            const mimeType = imageType.split(':')[1].split(';')[0]

            setValue('logo', { base64: imageBase64, mimeType })
            clearErrors('logo')
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const onSubmit = () => {
    if (hasAgreeTerms) {
      nextStep()
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        {!account && <ConnectWallet useModal />}
        {account && (
          <>
            <Terms>
              <input
                type='checkbox'
                name='agree'
                checked={hasAgreeTerms}
                onChange={e => setHasAgreeTerms(e.target.checked)}
              />

              <span>
                {t('v2.createProject.terms')}{' '}
                <a href={'#'} target='_blank'>
                  {' '}
                  {t('v2.createProject.termsAndConditions')}
                </a>
              </span>
            </Terms>
            <>
              <FormContainer>
                <LogoContainer
                  className={`${errors.logo && isSubmitted && 'error'} ${hasAgreeTerms ? '' : 'disabled'}`}
                >
                  <span>{t('v2.createProject.form.logo')}</span>
                  <ImgCrop rotationSlider>
                    <Upload
                      listType='picture-circle'
                      maxCount={1}
                      fileList={fileList}
                      disabled={!hasAgreeTerms}
                      onChange={handleChange}
                      beforeUpload={beforeUpload}
                      onPreview={onPreview}
                      customRequest={async ({ onSuccess }) => {
                        onSuccess && onSuccess('ok')
                      }}
                    >
                      {fileList.length >= 1 ? null : (
                        <div>
                          <UploadIcon className={`${errors.logo && isSubmitted && 'error'}`} />
                          <div style={{ opacity: '0.6' }}>{t('v2.createProject.form.upload')}</div>
                        </div>
                      )}
                    </Upload>
                  </ImgCrop>
                  <ErrorMessage>
                    {errors.logo && isSubmitted && `${t('v2.createProject.formMessages.required')}`}
                  </ErrorMessage>
                </LogoContainer>
                <Input
                  title={t('v2.createProject.form.wallet') + '*'}
                  register={register('wallet', { required: `${t('v2.createProject.formMessages.required')}` })}
                  type='text'
                  disabled
                  disabledLabel={!hasAgreeTerms}
                  error={errors.wallet?.message}
                />
                <Input
                  title={t('v2.createProject.form.name') + '*'}
                  register={register('projectName', {
                    required: `${t('v2.createProject.formMessages.required')}`,
                    maxLength: { value: 30, message: `${t('v2.createProject.formMessages.maxLength')} ${30}` },
                    onBlur: () => trigger('projectName')
                  })}
                  maxLength={30}
                  type='text'
                  disabled={!hasAgreeTerms}
                  disabledLabel={!hasAgreeTerms}
                  error={errors.projectName?.message}
                />
                <Select
                  title={t('v2.createProject.form.category') + '*'}
                  register={register('category')}
                  type='select'
                  disabled={!hasAgreeTerms}
                  error={errors.category ? t('v2.stakeProfileEdit.requiredField') : ''}
                  options={categories?.map(category => ({
                    value: { label: poolTypeTranslation(category.name), value: category.sys.id },
                    key: category.sys.id
                  }))}
                />
                <Input
                  title={t('v2.createProject.form.email') + '*'}
                  disabled={!hasAgreeTerms}
                  disabledLabel={!hasAgreeTerms}
                  name='email'
                  type='email'
                  register={register('email', {
                    required: `${t('v2.createProject.formMessages.required')}`,
                    maxLength: {
                      value: 64,
                      message: `${t('v2.createProject.formMessages.maxLength')} ${64}`
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: `${t('v2.createProject.formMessages.invalidEmail')}`
                    },
                    onBlur: () => trigger('email')
                  })}
                  maxLength={64}
                  onKeyDown={e => {
                    const validCharsRegex = /[A-Z0-9@._-]/i
                    if (!validCharsRegex.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault()
                    }
                  }}
                  error={errors.email?.message}
                  placeholder={t('v2.createProject.placeholder.email')}
                />
                <TextArea
                  title={t('v2.createProject.form.about') + '*'}
                  disabled={!hasAgreeTerms}
                  register={register('aboutProject', {
                    required: `${t('v2.createProject.formMessages.required')}`,
                    maxLength: {
                      value: 240,
                      message: `${t('v2.createProject.formMessages.maxLength')} ${240}`
                    },
                    onBlur: () => trigger('aboutProject')
                  })}
                  maxLength={240}
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
    gap: 6px;
    max-height: 450px;
    overflow: auto;
    margin-bottom: 6px;
    padding-right: 12px;
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
    opacity: 0.5;

    &.error {
      color: ${({ theme }) => theme.color.red[300]};
    }
  `
}
