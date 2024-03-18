import useCreateContact from "@/hooks/useCreateContact"
import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import type { CheckboxProps } from 'antd'
import { Checkbox } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import Button from "../shared/Button"
import Input from "../shared/inputs/Input"
import { projectRegexFields, projectRegexOnKeyDown } from "../shared/regex"

export function ContactForm() {
    const { t } = useLocaleTranslation()
    const router = useRouter()
    const [contact, setContact] = useState<{ email?: string, fullName?: string }>()
    const [isAgree, setIsAgree] = useState(false)

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm<{ fullName: string, email: string }>()

    const handleSuccess = () => {
        router.push('/optimism-sepolia/product/ethereum-restaking')
    }
    const { mutate, isLoading } = useCreateContact(contact?.email, contact?.fullName, handleSuccess)
    const onSubmit = (data: { fullName: string, email: string }) => {
        setContact(data)
        mutate()
    }
    const onChange: CheckboxProps['onChange'] = (e) => setIsAgree(e.target.checked)

    return (
        <Container onSubmit={handleSubmit(onSubmit)} id='contactForm' >
            <Content>
                <h2>{t('signUpNow')}</h2>
                <div>
                    <Input
                        title={t('name')}
                        disabled={false}
                        disabledLabel={false}
                        register={register('fullName', {
                            required: `${t('v2.createProject.formMessages.required')}`,
                            onBlur: () => trigger('fullName')
                        })}
                        maxLength={64}
                        error={errors.fullName?.message}
                        placeholder={t('v2.ramp.kyc.namePlaceholder')}
                        inputType='outline'
                        height={48}

                    />
                    <Input
                        title='Email'
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
                        inputType='outline'
                        height={48}
                        onKeyDown={e => {
                            const validCharsRegex = projectRegexOnKeyDown.email
                            if (!validCharsRegex.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault()
                            }
                        }}
                        error={errors.email?.message}
                        placeholder={t('v2.ramp.kyc.emailPlaceholder')}
                    />
                    <Check onChange={onChange} >
                        {t('privacyDeclare')} <Link href='#'>{t('privacyPolicy')}</Link>
                    </Check>
                </div>
                <Button form='contactForm' type='submit' label={t('next')} disabled={isLoading || !isAgree} block />
            </Content>
        </Container>
    )
}

const { Container, Check, Content } = {
    Container: styled.form`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0;
        
        
        
    `,
    Content: styled.div`
        display: flex;
        flex-direction: column;
        gap: 24px;
        max-width: 480px;
        > h2 {
            color: ${({ theme }) => theme.colorV2.blue[1]};
            font-size: ${({ theme }) => theme.font.size[22]};
            font-weight: 500;
            line-height: 30px;
            letter-spacing: 0em;
            text-align: center;

        }

    `,
    Check: styled(Checkbox)`
        display: flex;
        align-items: center;
        line-height: none;
        > span > a{
            font-weight: 400;
            color: ${({ theme }) => theme.color.primary};
            text-decoration: underline;
            
        }
    `
}