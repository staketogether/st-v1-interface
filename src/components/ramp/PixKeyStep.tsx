import { RampSteps, offRampPixKeyVar, rampStepControlVar } from '@/hooks/ramp/useRampControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '../shared/Button'
import { cnpjMask, cpfMask, phoneMask } from '../shared/input-helper/mask'
import { isValidCNPJ, isValidCPF, isValidEmail, isValidPhone } from '../shared/input-helper/validate'
import Input from '../shared/inputs/Input'
import Select from '../shared/inputs/Select'

type key = 'CPF' | 'PHONE' | 'RANDOM' | 'CNPJ' | 'EMAIL'

interface PixKey {
  type: key
  key: string
}

export default function PixKeyStep() {
  const { t } = useLocaleTranslation()
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors }
  } = useForm<PixKey>()

  const key = watch('key')
  const type = watch('type')

  const handleMask = (value: string) => {
    switch (type) {
      case 'CPF':
        setValue('key', cpfMask(value))
        break
      case 'PHONE':
        setValue('key', phoneMask(value))
        break
      case 'CNPJ':
        setValue('key', cnpjMask(value))
        break
      default:
        setValue('key', value)
        break
    }
  }

  const handleValidate = () => {
    const validates = {
      CPF: () => (isValidCPF(key) && t('v2.ramp.offRamp.pixKeyFormError.cpf')) || undefined,
      PHONE: () => (isValidPhone(key) && t('v2.ramp.offRamp.pixKeyFormError.phone')) || undefined,
      RANDOM: undefined,
      CNPJ: () => (isValidCNPJ(key) && t('v2.ramp.offRamp.pixKeyFormError.cnpj')) || undefined,
      EMAIL: () => (isValidEmail(key) && t('v2.ramp.offRamp.pixKeyFormError.email')) || undefined
    }
    return validates[type]
  }

  const handleMinLength = () => {
    const validates = {
      CPF: 14,
      PHONE: 15,
      RANDOM: 32,
      CNPJ: 18,
      EMAIL: 64
    }
    return validates[type]
  }

  const options: { key: string; value: { label: string; value: string | number } }[] = [
    {
      key: 'CPF',
      value: { label: 'CPF', value: 'CPF' }
    },
    {
      key: 'PHONE',
      value: { label: t('v2.ramp.offRamp.pixKeyLabel.phone'), value: 'PHONE' }
    },
    {
      key: 'RANDOM',
      value: { label: t('v2.ramp.offRamp.pixKeyLabel.random'), value: 'RANDOM' }
    },
    {
      key: 'CNPJ',
      value: { label: 'CNPJ', value: 'CNPJ' }
    },
    {
      key: 'EMAIL',
      value: { label: 'EMAIL', value: 'EMAIL' }
    }
  ]

  const handleInputMode = () => {
    switch (type) {
      case 'CPF':
        return 'numeric'
      case 'PHONE':
        return 'tel'
      case 'CNPJ':
        return 'numeric'
      case 'EMAIL':
        return 'email'
      default:
        return 'text'
    }
  }

  const onSubmit = (data: PixKey) => {
    offRampPixKeyVar(data.key)
    rampStepControlVar(RampSteps.ProcessingCheckoutOffRampStep)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id='pixKey'>
      <Select register={register('type')} options={options} title={`${t('v2.ramp.offRamp.pixKey')}`} />
      <Input
        title={`${t('v2.ramp.offRamp.key')}`}
        disabled={false}
        disabledLabel={false}
        register={register('key', {
          required: `${t('v2.createProject.formMessages.required')}`,
          validate: handleValidate(),
          onBlur: () => trigger('key')
        })}
        inputMode={handleInputMode()}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleMask(event.target.value)}
        maxLength={handleMinLength()}
        error={errors.key?.message}
        placeholder={t('v2.ramp.kyc.namePlaceholder')}
      />
      <Button form='pixKey' type='submit' label={t('next')} icon={<PiArrowRight />} disabled={false} />
    </FormContainer>
  )
}

const { FormContainer } = {
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    max-height: 450px;
    max-width: 420px;
  `
}
