import { globalConfig } from '@/config/global'
import { BrlaBuyEthStep, kycIdVar, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useKycCreate, { KycCreate, KycPayload, TypeAccount } from '@/hooks/ramp/useKycCreate'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import { notification } from 'antd'
import { AxiosError } from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiArrowRight, PiDiscordLogo } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import Button from '../shared/Button'
import { cnpjMask, cpfMask } from '../shared/input-helper/mask'
import { projectRegexFields, projectRegexOnKeyDown } from '../shared/input-helper/regex'
import { handleValidateBirthDate, isValidCNPJ, isValidCPF } from '../shared/input-helper/validate'
import Input from '../shared/inputs/Input'

interface KycStepProps {
  asset: Asset
}

export default function KycStep({ asset }: KycStepProps) {
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

  const handleMaskDate = (value: string) => {
    setBirthDay(value.replace(/\D+/g, '').replace(/^(\d{2})(\d{2})(\d+)$/, '$1/$2/$3'))
  }

  const handleMaskCpfOrCnpj = (value: string) => {
    if (chooseAccountType === TypeAccount.CPF) {
      const data = cpfMask(value)
      setCpfOrCnpj(data)
      return
    }
    const data = cnpjMask(value)
    setCpfOrCnpj(data)
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

  useFacebookPixel(`onramp-kyc:${asset.id}`, !!formData, {
    assetId: asset.id,
    kycLevel: 1,
    email: String(formData?.email)
  })

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id='kycForm'>
      <Container>
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
