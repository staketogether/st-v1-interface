import { BrlaBuyEthStep, kycIdVar, kycLevelVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useKycCreate, { KycCreate, KycLevel, KycPayload, TypeAccount } from '@/hooks/ramp/useKycCreate'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import Button from '../shared/Button'
import Input from '../shared/inputs/Input'
import { projectRegexFields, projectRegexOnKeyDown } from '../shared/regex'
import SwapInfo from './SwapInfo'

export default function KycStep() {
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
    formState: { errors }
  } = useForm<KycCreate>({
    defaultValues: {
      accountType: TypeAccount.CPF
    }
  })

  const handleSuccess = (data: KycLevel) => {
    if (data?.id) {
      kycIdVar(data?.id)
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
    }

    if (data.level > 0) {
      kycLevelVar(data)
      stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingKyc)
    }
  }
  const handleError = (msg: string) => {
    if (msg.includes('backend.error.kyc_invalid')) {
      stepsControlBuyCryptoVar(BrlaBuyEthStep.Error)
      return
    }
    setError('email', { type: 'invalid', message: t('v2.createProject.formMessages.invalidEmail') })
    setError('cpfOrCnpj', { type: 'invalid', message: t('v2.createProject.formMessages.invalidCpf') })
    setError('birthDate', { type: 'invalid', message: t('v2.createProject.formMessages.invalidBirthday') })
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
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id='kycForm'>
      <Container>
        <SwapInfo />

        <h2>{t('v2.ramp.kyc.title')}</h2>
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
                  onChange: (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)
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
                  onChange: (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)
                })}
              />
            </InputRadio>
          </div>
        </ContainerRadio>
        <Input
          title={`${chooseAccountType === TypeAccount.CPF ? t('v2.ramp.kyc.fullName') : t('v2.ramp.kyc.companyName')
            }`}
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
            required: `${t('v2.createProject.formMessages.required')}`
          })}
          value={cpfOrCnpj}
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleMaskCpfOrCnpj(event.target.value)}
          maxLength={64}
          error={errors.cpfOrCnpj?.message}
          placeholder={`${chooseAccountType === TypeAccount.CPF ? '000.000.000-00' : '00.000.000/00000-00'}`}
        />
        <Input
          title={`${chooseAccountType === TypeAccount.CPF ? t('v2.ramp.kyc.birthday') : t('v2.ramp.kyc.foundationDate')
            }`}
          disabled={false}
          disabledLabel={false}
          register={register('birthDate', {
            required: `${t('v2.createProject.formMessages.required')}`,
            onBlur: () => trigger('birthDate')
          })}
          value={birthDay}
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleMaskDate(event.target.value)}
          maxLength={10}
          error={errors.birthDate?.message}
          placeholder={'DD/MM/YYYY'}
        />
      </Container>
      <Footer>
        <Button form='kycForm' type='submit' label={t('next')} icon={<PiArrowRight />} disabled={isLoading} />
      </Footer>
    </FormContainer>
  )
}

const { Container, FormContainer, InputRadio, ContainerRadio, Footer } = {
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    max-height: 450px;
    max-width: 420px;
    margin-right: 5px;
  `,
  Container: styled.div`
    padding: 0 ${({ theme }) => theme.size[24]};
    width: auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-width: 372px;
    }

    
    overflow-y: scroll;

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
    padding: 16px 29px 24px 24px;
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
  `
}
