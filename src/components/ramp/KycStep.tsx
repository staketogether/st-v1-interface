import { globalConfig } from '@/config/global'
import { BrlaBuyEthStep, kycIdVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useKycCreate, { KycCreate, KycPayload, TypeAccount } from '@/hooks/ramp/useKycCreate'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProductAsset } from '@/types/ProductAsset'
import { notification } from 'antd'
import { AxiosError } from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiArrowRight, PiDiscordLogo } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import Button from '../shared/Button'
import Input from '../shared/inputs/Input'
import { projectRegexFields, projectRegexOnKeyDown } from '../shared/regex'
import SwapInfo from './SwapInfo'

type KycStepProps = {
  product: ProductAsset
}

export default function KycStep({ product }: KycStepProps) {
  const { t } = useLocaleTranslation()
  const { address } = useAccount()
  const [formData, setFormaData] = useState<KycPayload>()
  const [cpfOrCnpj, setCpfOrCnpj] = useState<string>()
  const [birthDay, setBirthDay] = useState<string>()

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<KycCreate>({
    defaultValues: {
      accountType: TypeAccount.CPF
    }
  })

  const handleSuccess = (data: { id?: string }) => {
    if (data?.id) {
      kycIdVar(data?.id)
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
    }
  }

  const discordButton = (
    <DiscordButton
      onClick={() => {
        window.open(globalConfig.discordTicket, '_blank')
      }}
    >
      <DiscordIcon /> Discord
    </DiscordButton>
  )

  const handleError = (data?: AxiosError<{ message?: string; data?: string }>) => {
    if (data && data?.response?.data?.message === 'backend.error.account_already_registered') {
      setError('email', {
        type: 'invalid',
        message: `${t('v2.createProject.formMessages.alreadyEmail')}${data?.response?.data?.data}`
      })
      setError('cpfOrCnpj', {
        type: 'invalid',
        message: `${t('v2.createProject.formMessages.alreadyCpf')}${data?.response?.data?.data}`
      })

      const email = globalConfig.emailSupport
      const subject = encodeURIComponent(`[PIX-Support] - ${t('v2.ramp.kyc.alreadyCpfTitleAlert')}: ${data?.response?.data?.data}`)
      const mailtoUrl = `mailto:${email}?subject=${subject}`

      notification.error({
        message: t('v2.ramp.kyc.alreadyCpfTitleAlert'),
        description: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span>{t('v2.ramp.kyc.alreadyCpfDescriptionAlert')}</span>
            <a href={mailtoUrl}>{globalConfig.emailSupport}</a>
          </div>
        ),
        btn: discordButton,
        duration: 500
      })
    }
  }

  const { mutate, isLoading } = useKycCreate('brla', address, formData, handleSuccess, handleError)

  const chooseAccountType = watch('accountType')
  const onSubmit = (data: KycCreate) => {
    if (!data?.birthDate) {
      return
    }

    const date = data.birthDate.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, '$3-$2-$1')
    const newBirthDay = new Date(date)
    const timestamp = Math.floor(newBirthDay.getTime() / 1000)

    let payload: KycPayload = {
      fullName: data.fullName,
      email: data.email,
      cpf: data.cpfOrCnpj,
      birthDateTimestamp: timestamp
    }

    if (chooseAccountType === TypeAccount.CNPJ) {
      payload = {
        ...payload,
        cnpj: data.cpfOrCnpj,
        startDateTImestamp: timestamp
      }

      // clear data
      delete payload.cpf
      delete payload.birthDateTimestamp
    }
    setFormaData(payload)
  }

  useEffect(() => {
    if (formData) {
      mutate()
    }
  }, [formData, mutate])

  useEffect(() => {
    setCpfOrCnpj('')
  }, [chooseAccountType])

  useEffect(() => {
    console.log('errors', errors)
  }, [errors])

  const cpfMask = (value: string) => {
    const response = value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
    setCpfOrCnpj(response)
  }

  const cnpjMask = (value: string) => {
    const response = value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
    setCpfOrCnpj(response)
  }

  const handleMaskDate = (value: string) => {
    setBirthDay(value.replace(/\D+/g, '').replace(/^(\d{2})(\d{2})(\d+)$/, '$1/$2/$3'))
  }

  const handleMaskCpfOrCnpj = (value: string) => {
    if (chooseAccountType === TypeAccount.CPF) {
      cpfMask(value)
      return
    }
    cnpjMask(value)
  }

  const handleValidateBirthDate = (data?: string): boolean => {
    if (!data) {
      return true
    }

    const split = data.split('/')
    if (split.length !== 3) {
      return true
    }

    const day = parseInt(split[0], 10)
    const mouth = parseInt(split[1], 10) - 1
    const year = parseInt(split[2], 10)

    const BirthDay = new Date(year, mouth, day)
    const today = new Date()

    let age = today.getFullYear() - BirthDay.getFullYear()
    const m = today.getMonth() - BirthDay.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < BirthDay.getDate())) {
      age--
    }

    return age < 18 || age > 120
  }

  function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '')

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return true

    let sum = 0,
      remainder: number

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)

    remainder = (sum * 10) % 11

    if (remainder == 10 || remainder == 11) remainder = 0
    if (remainder != parseInt(cpf.substring(9, 10))) return true

    sum = 0

    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)

    remainder = (sum * 10) % 11

    if (remainder == 10 || remainder == 11) remainder = 0

    if (remainder != parseInt(cpf.substring(10, 11))) return true
    return false
  }

  function isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '')
    if (cnpj.length !== 14) return true

    if (/^(\d)\1{13}$/.test(cnpj)) return true

    let length = cnpj.length - 2
    let numbers = cnpj.substring(0, length)
    const digits = cnpj.substring(length)
    let sum = 0
    let pos = length - 7

    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--
      if (pos < 2) pos = 9
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result != Number(digits.charAt(0))) return false

    length = length + 1
    numbers = cnpj.substring(0, length)
    sum = 0
    pos = length - 7
    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--
      if (pos < 2) pos = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result != Number(digits.charAt(1))) return true

    return false
  }

  const handleVerifyCpfOrCnpj = (value?: string): string => {
    if (!value) return ''
    if (chooseAccountType === TypeAccount.CPF && isValidCPF(value)) {
      return `${t('v2.createProject.formMessages.invalidCpf')}`
    }
    if (chooseAccountType === TypeAccount.CNPJ && isValidCNPJ(value)) {
      return t('v2.createProject.formMessages.invalidCnpj')
    }
    return ''
  }

  useFacebookPixel('initiateCheckout_pix')

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id='kycForm'>
      <Container>
        <SwapInfo product={product} />
        <h2>{t('v2.ramp.checkOut')}</h2>
        <span>{t('v2.ramp.kyc.description')}</span>
        <ContainerRadio>
          <span>{t('v2.ramp.kyc.typeAccount')}</span>
          <div>
            <InputRadio>
              <label>CPF</label>
              <input
                type='radio'
                id='typeAccount'
                value={TypeAccount.CPF}
                {...register('accountType', {
                  required: `${t('v2.createProject.formMessages.required')}`,
                  onChange: () => {
                    clearErrors('cpfOrCnpj')
                  }
                })}
              />
            </InputRadio>
            <InputRadio>
              <label>CNPJ</label>
              <input
                type='radio'
                id='typeAccount'
                value={TypeAccount.CNPJ}
                {...register('accountType', {
                  required: `${t('v2.createProject.formMessages.required')}`,
                  onChange: () => {
                    clearErrors('cpfOrCnpj')
                  }
                })}
              />
            </InputRadio>
          </div>
        </ContainerRadio>
        <Input
          title={`${chooseAccountType === TypeAccount.CPF ? t('v2.ramp.kyc.fullName') : t('v2.ramp.kyc.companyName')}`}
          disabled={false}
          disabledLabel={false}
          register={register('fullName', {
            required: `${t('v2.createProject.formMessages.required')}`,
            onBlur: () => trigger('fullName')
          })}
          maxLength={64}
          error={errors.fullName?.message}
          placeholder={t('v2.ramp.kyc.namePlaceholder')}
        />
        <Input
          title={`${chooseAccountType === TypeAccount.CPF ? t('v2.ramp.kyc.birthday') : t('v2.ramp.kyc.foundationDate')}`}
          disabled={false}
          disabledLabel={false}
          register={register('birthDate', {
            required: `${t('v2.createProject.formMessages.required')}`,
            validate: value => {
              if (handleValidateBirthDate(value)) {
                return t('v2.createProject.formMessages.invalidDate')
              }
            },

            onBlur: () => trigger('birthDate')
          })}
          value={birthDay}
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleMaskDate(event.target.value)}
          maxLength={10}
          error={errors.birthDate?.message}
          placeholder={'DD/MM/YYYY'}
        />
        <Input
          title={'Email'}
          disabled={false}
          disabledLabel={false}
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
          placeholder={t('v2.ramp.kyc.emailPlaceholder')}
        />
        <Input
          title={chooseAccountType.toUpperCase()}
          disabled={false}
          disabledLabel={false}
          register={register('cpfOrCnpj', {
            required: `${t('v2.createProject.formMessages.required')}`,
            validate: value => {
              if (handleVerifyCpfOrCnpj(value)) {
                return handleVerifyCpfOrCnpj(value)
              }
            },
            onBlur: () => trigger('cpfOrCnpj')
          })}
          value={cpfOrCnpj}
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleMaskCpfOrCnpj(event.target.value)}
          maxLength={64}
          error={errors.cpfOrCnpj?.message}
          placeholder={`${chooseAccountType === TypeAccount.CPF ? '000.000.000-00' : '00.000.000/00000-00'}`}
        />
      </Container>
      <Footer>
        <Button form='kycForm' type='submit' label={t('next')} icon={<PiArrowRight />} disabled={isLoading} />
      </Footer>
    </FormContainer>
  )
}

const { Container, FormContainer, InputRadio, ContainerRadio, Footer, DiscordIcon, DiscordButton } = {
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    max-height: 450px;
    max-width: 420px;
  `,
  Container: styled.div`
    width: auto;
    overflow-y: scroll;
    padding-right: 5px;

    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[24]};

    color: ${({ theme }) => theme.colorV2.gray[1]};

    h2 {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
    }

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }
  `,
  Footer: styled.div`
    padding: 16px 12px 0px 0px;
    display: grid;
  `,
  ContainerRadio: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    height: 77px;
    width: 100%;
    font-size: ${({ theme }) => theme.font.size[13]};
    > div {
      display: flex;
      flex-direction: row;
      gap: ${({ theme }) => theme.size[24]};
      width: 100%;
      display: flex;
      border-radius: ${({ theme }) => theme.size[8]};
      background: ${({ theme }) => theme.colorV2.gray[2]};
      padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
      box-shadow: ${({ theme }) => theme.shadow[200]};
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border: 1px solid transparent;
      &.disabled {
        cursor: not-allowed;
        color: ${({ theme }) => theme.color.blackAlpha[600]};
        > input {
          opacity: 0.5;
        }
      }

      &.error {
        border: 1px solid ${({ theme }) => theme.color.red[300]};
        color: ${({ theme }) => theme.color.red[300]};
        > input {
          color: ${({ theme }) => theme.color.red[300]};
        }
      }

      > input {
        display: flex;
        width: 100%;
        border: none;
        outline: none;
        background: none;

        &:disabled {
          cursor: not-allowed;
        }

        &::-webkit-input-placeholder {
          color: ${({ theme }) => theme.colorV2.gray[1]};
          opacity: 0.5;
        }
      }
    }
  `,
  InputRadio: styled.div`
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[13]};
    &.disabled {
      > span {
        opacity: 0.5;
      }
    }
    > span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `,
  DiscordIcon: styled(PiDiscordLogo)`
    font-size: 24px;
    color: white;
  `,
  DiscordButton: styled.button`
    border: none;
    color: white;
    border-radius: 8px;
    background: #373b8a;
    transition: background-color 0.2s ease;
    height: 32px;
    padding: 0px 16px;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    margin-right: 182px;

    font-size: 15px;
    font-weight: 400;
  `
}
