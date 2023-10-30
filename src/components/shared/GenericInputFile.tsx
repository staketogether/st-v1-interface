import React, { useState, ChangeEvent, useRef } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { PiUploadSimple } from 'react-icons/pi'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'
import { CreateProjectForm } from '@/types/Project'

type GenericInputFileProps = {
  title: string
  setValue: UseFormSetValue<CreateProjectForm>
  clearErrors: UseFormClearErrors<CreateProjectForm>
}

export default function GenericInputFile({ setValue, title, clearErrors }: GenericInputFileProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = event => {
        if (event && event.target && event.target.result) {
          const imageDataURL = URL.createObjectURL(file)
          const image = event.target.result as string
          const [imageType, imageBase64] = image.split(',')
          const mimeType = imageType.split(':')[1].split(';')[0]

          setSelectedImage(imageDataURL)
          setValue('logo', { base64: imageBase64, mimeType })
          clearErrors('logo')
        }
      }

      reader.readAsDataURL(file)
    } else {
      // Handle the case where a non-image file is selected
      alert('Por favor, selecione uma imagem válida.')
    }
  }
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click()
    }
  }

  return (
    <Container>
      {title && <span>{title}</span>}
      <Input type='file' accept='image/*' onChange={handleImageChange} ref={fileInputRef} />
      <Button
        type='button'
        label={'Selecionar Arquivo'}
        isLoading={false}
        icon={<UploadIcon />}
        onClick={handleFileSelect}
      />
      {selectedImage && <Image className={'logo'} src={selectedImage} alt='Imagem selecionada' />}
    </Container>
  )
}

const { Image, Container, Input, UploadIcon } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  Image: styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    &.logo {
      border-radius: 100%;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4);
      width: 32px;
      height: 32px;
    }
  `,
  Input: styled.input`
    display: none;
  `,
  UploadIcon: styled(PiUploadSimple)`
    font-size: 16px;
  `
}
