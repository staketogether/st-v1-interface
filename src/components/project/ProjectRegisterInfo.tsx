import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import usePoolTypeTranslation from '@/hooks/usePoolTypeTranslation'
import { ContentfulWithLocale } from '@/types/ContentfulPool'
import { ProjectCreateInfo } from '@/types/Project'
import { Upload, notification } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PiArrowRight, PiCloudArrowUpBold } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '../shared/Button'
import ConnectWallet from '../shared/ConnectWallet'
import Input from '../shared/inputs/Input'
import Select from '../shared/inputs/Select'
import TextArea from '../shared/inputs/TextArea'
import { projectRegexFields, projectRegexOnKeyDown } from '../shared/regex'

interface ProjectRegisterInfoProps {
  hasAgreeTerms: boolean
  account?: `0x${string}`
  current: number
  fileList: UploadFile[]
  poolDetail: ContentfulWithLocale | null
  nextStep: (data: ProjectCreateInfo) => void
  setHasAgreeTerms: (value: boolean) => void
  setFileList: (value: UploadFile[]) => void
}

export default function ProjectRegisterInfo({
  account,
  hasAgreeTerms,
  fileList,
  current,
  poolDetail,
  nextStep,
  setHasAgreeTerms,
  setFileList
}: ProjectRegisterInfoProps) {
  const { t } = useLocaleTranslation()
  const { categories } = useContentfulCategoryCollection()
  const { poolTypeTranslation } = usePoolTypeTranslation()
  const modalRef = useRef<HTMLDivElement>(null)

  const {
    register,
    formState: { errors, isSubmitted },
    setValue,
    reset,
    handleSubmit,
    setError,
    trigger,
    watch,
    clearErrors
  } = useForm<ProjectCreateInfo>()
  const projectName = watch('projectName')
  const aboutProject = watch('aboutProject')

  useEffect(() => {
    if (isSubmitted && errors && modalRef.current && (errors.logo ?? errors.projectName)) {
      modalRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [errors, isSubmitted, modalRef])

  useEffect(() => {
    if (account && !poolDetail) {
      reset()
      setValue('wallet', account.toLocaleLowerCase())
      setError('logo', { type: 'required', message: `${t('v2.createProject.formMessages.required')}` })
    }
  }, [account, setError, setValue, t, reset, poolDetail])

  useEffect(() => {
    if (poolDetail && poolDetail.status === 'rejected') {
      setValue('wallet', poolDetail.wallet)
      setValue('email', poolDetail.email ?? '')
      setValue('projectName', poolDetail.name)
      setValue('category', poolDetail.category?.sys?.id)
      setValue('aboutProject', poolDetail.aboutProject)
    }
  }, [poolDetail, setValue])

  const onPreview = async (file: UploadFile) => {
    let src = file.url!
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj!)
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
    if (categories?.length && !poolDetail) {
      setValue('category', categories[0].sys.id)
    }
    if (poolDetail) {
      setValue('category', poolDetail.category?.sys?.id)
    }
  }, [categories, poolDetail, setValue])

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList)
    if (info.file.status === 'done') {
      const file = info.fileList[0].originFileObj!
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = event => {
          if (event?.target?.result) {
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

  const onSubmit: SubmitHandler<ProjectCreateInfo> = data => {
    if (hasAgreeTerms) {
      nextStep(data)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={current === 0 ? 'active' : ''}>
      <Container>
        {!account && (
          <ContainerLogin>
            <ConnectWallet useModal />
          </ContainerLogin>
        )}
        {account && (
          <>
            <Terms>
              <input type='checkbox' name='agree' checked={hasAgreeTerms} onChange={e => setHasAgreeTerms(e.target.checked)} />

              <span>
                {t('v2.createProject.terms')}{' '}
                <a href={'#'} target='_blank'>
                  {' '}
                  {t('v2.createProject.termsAndConditions')}
                </a>
              </span>
            </Terms>
            <Content>
              <FormContainer ref={modalRef}>
                <LogoContainer className={`${errors.logo && isSubmitted && 'error'} ${hasAgreeTerms ? '' : 'disabled'}`}>
                  <span>{t('v2.createProject.form.logo')}</span>
                  <ImgCrop cropShape='round' beforeCrop={beforeUpload}>
                    <Upload
                      listType='picture-circle'
                      maxCount={1}
                      fileList={fileList}
                      disabled={!hasAgreeTerms}
                      onChange={handleChange}
                      beforeUpload={beforeUpload}
                      onPreview={onPreview}
                      customRequest={({ onSuccess }) => {
                        if (onSuccess) {
                          onSuccess('ok')
                        }
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
                  <ErrorMessage>{errors.logo && isSubmitted && `${t('v2.createProject.formMessages.required')}`}</ErrorMessage>
                </LogoContainer>
                <Input
                  title={t('v2.createProject.form.wallet')}
                  register={register('wallet', { required: `${t('v2.createProject.formMessages.required')}` })}
                  type='text'
                  disabled
                  tooltip={t('v2.createProject.walletTooltip')}
                  disabledLabel={!hasAgreeTerms}
                  error={errors.wallet?.message}
                />
                <Input
                  title={t('v2.createProject.form.name') + '*'}
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
                  type='email'
                  register={register('email', {
                    required: `${t('v2.createProject.formMessages.required')}`,
                    pattern: {
                      value: projectRegexFields.email,
                      message: `${t('v2.createProject.formMessages.invalidEmail')}`
                    },
                    onBlur: () => trigger('email')
                  })}
                  maxLength={64}
                  onKeyDown={e => {
                    const validCharsRegex = projectRegexOnKeyDown.email
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
                    onBlur: () => trigger('aboutProject')
                  })}
                  maxLength={240}
                  value={aboutProject}
                  showCharCounter
                  error={errors.aboutProject?.message}
                  placeholder={t('v2.createProject.placeholder.about')}
                />
              </FormContainer>
              <Footer>
                <Button block icon={<NextStepIcon />} type='submit' disabled={!hasAgreeTerms} label={`${t('next')}`} />
              </Footer>
            </Content>
          </>
        )}
      </Container>
    </Form>
  )
}
const { Container, Content, ContainerLogin, Terms, UploadIcon, Form, Footer, FormContainer, LogoContainer, NextStepIcon, ErrorMessage } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  ContainerLogin: styled.div`
    padding: 24px;
  `,
  Content: styled.div`
    padding: 0px 2px;
  `,
  Footer: styled.footer`
    padding: 0px 29px 12px 22px;
  `,
  Form: styled.form`
    display: none;
    &.active {
      display: block;
    }
  `,

  Terms: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[8]} 24px;
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
    padding: 0px 22px;
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
