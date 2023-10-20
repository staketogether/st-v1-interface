import React, { useState, ChangeEvent, useRef } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { PiUploadSimple } from 'react-icons/pi'
import { UseFormSetValue } from 'react-hook-form'
import { CommunityContentfulForm } from '@/types/CommunityForm'

type GenericInputFileProps = {
  title?: string
  error?: string
  options?: { key: string; value: { label: string; value: string | number } }[]
  setValue: UseFormSetValue<CommunityContentfulForm>
}

export default function GenericInputFile({ setValue }: GenericInputFileProps) {
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
          const decodedImage = Buffer.from(imageBase64, 'base64')

          console.log('image', image)
          console.log('imagetype', imageType)
          console.log('ímagebase64', imageBase64)
          console.log('mimetype', mimeType)
          console.log('decodeImage', decodedImage)

          setSelectedImage(imageDataURL)
          setValue('logo', { buffer: decodedImage, mimeType })
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
      <Input type='file' accept='image/*' onChange={handleImageChange} ref={fileInputRef} />
      <Button label={'Selecionar Arquivo'} isLoading={false} icon={<UploadIcon />} onClick={handleFileSelect} />

      {selectedImage && (
        <div>
          <Image src={selectedImage} alt='Imagem selecionada' />
        </div>
      )}
    </Container>
  )
}

const { Image, Container, Input, UploadIcon } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  Image: styled.img`
    max-width: 100%;
    height: auto;
  `,
  Input: styled.input`
    display: none;
  `,
  UploadIcon: styled(PiUploadSimple)`
    font-size: 16px;
  `
}
