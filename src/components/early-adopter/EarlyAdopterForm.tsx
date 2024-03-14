import React, { useEffect } from 'react'
import Modal from '../shared/Modal'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../shared/inputs/Input'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { projectRegexFields, projectRegexOnKeyDown } from '../shared/regex'
import Button from '../shared/Button'
import successAnimation from '@assets/animations/success-animation.json'
import LottieAnimation from '../shared/LottieAnimation'
import { PiTwitterLogo } from 'react-icons/pi'
import axios from 'axios'
import { globalConfig } from '@/config/global'
import { notification } from 'antd'

type IncentiveConfirmTransactionModalProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  walletAddress?: `0x${string}`
}

type RegisterLeadInfo = {
  email: string
  name: string
  walletAddress: string
}

export default function EarlyAdopterFormModal({
  isOpen,
  setIsOpen,
  walletAddress
}: IncentiveConfirmTransactionModalProps) {
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<RegisterLeadInfo>()
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const { t } = useLocaleTranslation()

  const handleFollowTwitter = () => {
    window.open('https://twitter.com/0xStakeTogether', '_blank')
  }

  useEffect(() => {
    if (walletAddress) {
      setValue('walletAddress', walletAddress)
    }
  }, [setValue, walletAddress])

  const onSubmit: SubmitHandler<RegisterLeadInfo> = async data => {
    try {
      setIsLoading(true)
      await axios.post(`${globalConfig.backendUrl}/early-adopter-leads`, {
        email: data.email,
        name: data.name,
        walletAddress: data.walletAddress
      })
      setIsLoading(false)
      setIsSuccess(true)
    } catch (error) {
      setIsLoading(false)
      notification.error({
        message: 'Failed to send data, please try again later.',
        placement: 'topRight'
      })
    }
  }

  return (
    <Modal
      title={
        isSuccess ? (
          false
        ) : (
          <Title>
            We are very happy to have you. To complete your access to the Early Adopter Stake Together, please
            fill out the information below!
          </Title>
        )
      }
      isOpen={isOpen}
      showHeader={true}
      showCloseIcon={isSuccess ? true : false}
      onClose={() => {
        setIsSuccess(false)
        clearErrors()
        setIsOpen(false)
      }}
      overlayCloseModal={true}
    >
      <Container>
        {isSuccess ? (
          <SuccessContainer>
            <LottieAnimation animationData={successAnimation} height={80} />
            <span>Congratulations, you are now an Early Adopter. Follow the next steps in your email!</span>
            <Button
              onClick={handleFollowTwitter}
              label={'Follow us on Twitter'}
              type='submit'
              icon={<TwitterIcon />}
            />
          </SuccessContainer>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input title={'Nome'} register={register('name')} type='text' />
            <Input
              title={'Email*'}
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
              type='text'
              error={errors.email?.message}
            />
            <Input title={'Wallet Address'} register={register('walletAddress')} type='text' />
            <Text>We will send you all the details via email</Text>
            <Button label={'Send'} type='submit' isLoading={isLoading} />
          </Form>
        )}
      </Container>
    </Modal>
  )
}
const { Container, Form, Title, Text, SuccessContainer, TwitterIcon } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  Title: styled.header`
    font-size: ${({ theme }) => theme.font.size[15]};
    color: ${({ theme }) => theme.colorV2.blue[1]};
    font-weight: 500;
    text-align: center;
  `,
  Text: styled.span`
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    text-align: center;
  `,
  SuccessContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    span {
      color: ${({ theme }) => theme.color.green[500]};
      font-size: 18px;
      font-weight: 500;
      text-align: center;
    }
  `,
  TwitterIcon: styled(PiTwitterLogo)`
    font-size: 24px;
    color: ${({ theme }) => theme.color.white};
  `
}
