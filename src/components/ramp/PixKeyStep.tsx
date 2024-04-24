import { BrlaBuyEthStep, stepsControlBuyCryptoVar } from '@/hooks/ramp/useControlModal'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '../shared/Button'
import { cnpjMask, cpfMask, phoneMask } from '../shared/input-helper/mask'
import { isValidCNPJ, isValidCPF, isValidPhone } from '../shared/input-helper/validate'
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

    const onSubmit = (data: PixKey) => {
        console.log(data)

        if (data) {
            stepsControlBuyCryptoVar(BrlaBuyEthStep.ProcessingCheckoutOffRampStep)
        }
    }
    const key = watch('key')
    const type = watch('type')

    const options: { key: string; value: { label: string; value: string | number } }[] = [
        {
            key: 'CPF',
            value: { label: 'CPF', value: 'CPF' }
        },
        {
            key: 'PHONE',
            value: { label: 'Telefone', value: 'PHONE' }
        },
        {
            key: 'RANDOM',
            value: { label: 'Aleatório', value: 'RANDOM' }
        },
        {
            key: 'CPNJ',
            value: { label: 'CPNJ', value: 'CPNJ' }
        },
        {
            key: 'EMAIL',
            value: { label: 'EMAIL', value: 'EMAIL' }
        }
    ]

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
            CPF: () => (isValidCPF(key) && 'cpf invalido') || undefined,
            PHONE: () => (isValidPhone(key) && 'telefone invalido') || undefined,
            RANDOM: undefined,
            CNPJ: () => (isValidCNPJ(key) && 'cnpj invalido') || undefined,
            EMAIL: undefined
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

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)} id='pixKey'>
            <Select register={register('type')} options={options} title='Qual chave pix você deseja usar para receber?' />
            <Input
                title='Chave'
                disabled={false}
                disabledLabel={false}
                register={register('key', {
                    required: `${t('v2.createProject.formMessages.required')}`,
                    validate: handleValidate(),
                    onBlur: () => trigger('key')
                })}
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
