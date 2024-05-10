import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import { useForm } from "react-hook-form"
import { PiArrowRight } from "react-icons/pi"
import styled from "styled-components"
import Button from "../shared/Button"
import Input from "../shared/inputs/Input"

import { parseEther } from "ethers"

import { Asset } from "@/types/Asset"
import { useSendTransaction } from "wagmi"

interface AssetSendProps {
    walletTo: string
    amountToken: string
}

export function AssetsSend({ asset }: { asset: Asset }) {
    const { t } = useLocaleTranslation()

    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction()
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<AssetSendProps>()

    const onSubmit = (data: AssetSendProps) => {
        console.log(data)
        const [chain] = asset.chains

        const to = data.walletTo as `0x${string}`
        const value = data.amountToken
        sendTransaction({ to, value: parseEther(value), chainId: chain })
    }
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)} id='assetSendForm'>

            <Input
                title={'Endereço de destino'}
                disabled={false}
                disabledLabel={false}
                register={register('walletTo', {
                    required: `${t('v2.createProject.formMessages.required')}`
                })}
                maxLength={64}
                error={errors.walletTo?.message}
                placeholder={t('v2.ramp.kyc.namePlaceholder')}
            />

            <Input
                title={'Amount token'}
                disabled={false}
                disabledLabel={false}
                register={register('amountToken', {
                    required: `${t('v2.createProject.formMessages.required')}`
                })}
                maxLength={64}
                error={errors.walletTo?.message}
                placeholder={t('v2.ramp.kyc.namePlaceholder')}
            />
            <Button form='assetSendForm' type='submit' label={t('next')} icon={<PiArrowRight />} disabled={false} />
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