import { CreateCommunityForm } from '@/types/CommunityForm'
import React from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import styled from 'styled-components'
import GenericInput from '../shared/GenericInput'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Modal, Upload } from 'antd'
import { PiArrowCircleRightFill, PiPlus } from 'react-icons/pi'
import type { UploadFile } from 'antd/es/upload/interface'
import type { RcFile, UploadProps } from 'antd/es/upload'
import useContentfulCategoryCollection from '@/hooks/contentful/useContentfulCategoryCollection'

type ProjectRegisterInfoProps = {
  register: UseFormRegister<CreateCommunityForm>
  setValue: UseFormSetValue<CreateCommunityForm>
  errors: FieldErrors<CreateCommunityForm>
  nextStep: () => void
  formValues: CreateCommunityForm
  hasAgreeTerms: boolean
  setHasAgreeTerms: (value: boolean) => void
  previewOpen: boolean
  isFormValid: boolean
  previewImage: string
  previewTitle: string
  fileList: UploadFile[]
  setPreviewOpen: (value: boolean) => void
  setPreviewImage: (value: string) => void
  setPreviewTitle: (value: string) => void
  setFileList: (value: UploadFile[]) => void
}

export default function ProjectRegisterInfo({
  errors,
  isFormValid,
  hasAgreeTerms,
  previewOpen,
  previewImage,
  previewTitle,
  fileList,
  register,
  nextStep,
  setValue,
  setHasAgreeTerms,
  setPreviewImage,
  setPreviewOpen,
  setPreviewTitle,
  setFileList
}: ProjectRegisterInfoProps) {
  const { t } = useLocaleTranslation()
  const { categories } = useContentfulCategoryCollection()

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const file = fileList[0]
    if (file && file.thumbUrl && file.type) {
      const [imageType, imageBase64] = file.thumbUrl.split(',')
      const mimeType = imageType.split(':')[1].split(';')[0]
      setValue('logo', { base64: imageBase64, mimeType })
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

  return (
    <>
      <Container>
        <Terms>
          <input
            type='checkbox'
            name='agree'
            checked={hasAgreeTerms}
            onChange={e => setHasAgreeTerms(e.target.checked)}
          />
          <span>Sou um projeto com mais de 100 membros</span>
        </Terms>
        {hasAgreeTerms && (
          <>
            <FormContainer>
              <LogoContainer>
                <span>Insira a logo do projeto</span>
                <Upload
                  listType='picture-circle'
                  maxCount={1}
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : (
                    <div>
                      <PiPlus />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </LogoContainer>
              <GenericInput
                title={'project wallet'}
                register={register('wallet', { required: true })}
                type='text'
                disabled
                error={errors.wallet ? t('v2.stakeProfileEdit.requiredField') : ''}
              />
              <GenericInput
                title={t('v2.stakeProfileEdit.communityName')}
                register={register('projectName', { required: true })}
                type='text'
                error={errors.projectName ? t('v2.stakeProfileEdit.requiredField') : ''}
              />
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
              <GenericInput
                title={'email'}
                register={register('email', {
                  required: 'Email é Obrigatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Por favor, insira um e-mail válido'
                  }
                })}
                type='text'
                error={errors.email ? t('v2.stakeProfileEdit.requiredField') : ''}
              />
              <GenericInput
                title={'Apresente seu projeto'}
                register={register('aboutProject', { required: 'Apresentação do projeto é Obrigatorio' })}
                type='longText'
                error={errors.aboutProject ? t('v2.stakeProfileEdit.requiredField') : ''}
              />
            </FormContainer>
            <NextStepIcon
              onClick={() => isFormValid && nextStep()}
              className={`${!isFormValid ? 'disabled' : ''}`}
            />
          </>
        )}
      </Container>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}
const { Container, Terms, FormContainer, LogoContainer, NextStepIcon } = {
  Container: styled.div`
    display: grid;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
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
    gap: 24px;
  `,
  LogoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  NextStepIcon: styled(PiArrowCircleRightFill)`
    font-size: 52px;
    cursor: pointer;
    color: ${({ theme }) => theme.colorV2.blue[1]};
    &.disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.color.blackAlpha[600]};
    }
    margin-left: auto;
  `
}
