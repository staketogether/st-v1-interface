import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import { Asset } from "@/types/Asset"
import { useForm } from "react-hook-form"
import { PiArrowRight } from "react-icons/pi"
import styled from "styled-components"
import Button from "../shared/Button"
import Input from "../shared/inputs/Input"
import Select from "../shared/inputs/Select"
import SwapInfo from "./SwapInfo"

interface PixKey {
    type: 'CPF' | 'PHONE' | 'RANDOM' | 'CNPJ' | 'EMAIL'
    key: string
}

export default function PixKeyStep({ asset }: { asset: Asset }) {
    const { t } = useLocaleTranslation()
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<PixKey>()
    const cpfMask = (value: string) => {
        const response = value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

    }

    const cnpjMask = (value: string) => {
        const response = value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

    }
    const onSubmit = (data: PixKey) => {
        console.log(data)
    }
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
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)} id='pixKey' >
            <SwapInfo asset={asset} />
            <Select register={register('type')} options={options} title="Qual chave pix você deseja usar para receber?" />
            <Input
                title='Chave'
                disabled={false}
                disabledLabel={false}
                register={register('key', {
                    required: `${t('v2.createProject.formMessages.required')}`,
                    onBlur: () => trigger('key')
                })}
                maxLength={64}
                error={errors.key?.message}
                placeholder={t('v2.ramp.kyc.namePlaceholder')}
            />
            <Button form='kycForm' type='submit' label={t('next')} icon={<PiArrowRight />} disabled={false} />
        </FormContainer >
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