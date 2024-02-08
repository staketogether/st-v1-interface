import React from 'react'
import styled from 'styled-components'
import brla from '@assets/images/BRLA.svg'
import Image from 'next/image'
import { PiArrowRight } from 'react-icons/pi'
import ethIcon from '@assets/icons/eth-icon.svg'
import { useForm } from 'react-hook-form'
import Input from '../shared/inputs/Input'
import { projectRegexFields, projectRegexOnKeyDown } from '../shared/regex'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Button from '../shared/Button'

type KycForm = {
  name: string
  email: string
  cpf: string
  birthDate: string
}

export default function KycStep() {
  const { t } = useLocaleTranslation()

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<KycForm>()

  const onSubmit = (data: KycForm) => {
    console.log('realizar envio do form', data)
  }

  return (
    <Container>
      <header>
        <div>
          <div>
            <Image src={brla} width={16} height={16} alt='brla' />
            BRLA
          </div>
          <div>9.935,34</div>
        </div>
        <PiArrowRight style={{ fontSize: 24 }} />
        <div>
          <div>
            <Image src={ethIcon} width={16} height={16} alt='brla' />
            ETH
          </div>
          <div className='align-right'>1.0</div>
        </div>
      </header>
      <h2>Check out</h2>
      <span>Para continuar com o processo de compra precisamos de alguns dados</span>
      <KycLevelContainer>
        <div>
          <div>Nível KYC</div>
          <div>1</div>
        </div>
        <div>
          <div>Limite</div>
          <div>R$ 10.000,00</div>
        </div>
        <div>
          <div>Limite usado</div>
          <div>R$ 9.000,00</div>
        </div>
      </KycLevelContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          title={'Tipo de pessoa'}
          disabled={false}
          disabledLabel={false}
          type='string'
          register={register('name', {
            required: `${t('v2.createProject.formMessages.required')}`,
            pattern: {
              value: projectRegexFields.email,
              message: `${t('v2.createProject.formMessages.invalidEmail')}`
            },
            onBlur: () => trigger('name')
          })}
          maxLength={64}
          onKeyDown={e => {
            const validCharsRegex = projectRegexOnKeyDown.email
            if (!validCharsRegex.test(e.key) && e.key !== 'Backspace') {
              e.preventDefault()
            }
          }}
          error={errors.name?.message}
          placeholder={'Insira seu nome igual ao do seu documento'}
        />
        <Input
          title={'Nome Completo'}
          disabled={false}
          disabledLabel={false}
          type='string'
          register={register('name', {
            required: `${t('v2.createProject.formMessages.required')}`,
            pattern: {
              value: projectRegexFields.email,
              message: `${t('v2.createProject.formMessages.invalidEmail')}`
            },
            onBlur: () => trigger('name')
          })}
          maxLength={64}
          onKeyDown={e => {
            const validCharsRegex = projectRegexOnKeyDown.email
            if (!validCharsRegex.test(e.key) && e.key !== 'Backspace') {
              e.preventDefault()
            }
          }}
          error={errors.name?.message}
          placeholder={'Insira seu nome igual ao do seu documento'}
        />
        <Input
          title={'Email'}
          disabled={false}
          disabledLabel={false}
          type='email'
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
          placeholder={'Insira seu e-mail para contato'}
        />
        <Input
          title={'CPF'}
          disabled={false}
          disabledLabel={false}
          type='string'
          register={register('cpf', {
            required: `${t('v2.createProject.formMessages.required')}`,
            pattern: {
              value: projectRegexFields.email,
              message: `${t('v2.createProject.formMessages.invalidEmail')}`
            },
            onBlur: () => trigger('name')
          })}
          maxLength={64}
          onKeyDown={e => {
            const validCharsRegex = projectRegexOnKeyDown.email
            if (!validCharsRegex.test(e.key) && e.key !== 'Backspace') {
              e.preventDefault()
            }
          }}
          error={errors.name?.message}
          placeholder={'000.000.000-00'}
        />
        <Input
          title={'Data de nascimento'}
          disabled={false}
          disabledLabel={false}
          type='string'
          register={register('birthDate', {
            required: `${t('v2.createProject.formMessages.required')}`,
            pattern: {
              value: projectRegexFields.email,
              message: `${t('v2.createProject.formMessages.invalidEmail')}`
            },
            onBlur: () => trigger('birthDate')
          })}
          maxLength={64}
          onKeyDown={e => {
            const validCharsRegex = projectRegexOnKeyDown.email
            if (!validCharsRegex.test(e.key) && e.key !== 'Backspace') {
              e.preventDefault()
            }
          }}
          error={errors.name?.message}
          placeholder={'00/00/00'}
        />
      </FormContainer>
      <Button onClick={() => {}} label={'Continuar'} icon={<PiArrowRight />} />
    </Container>
  )
}

const { Container, KycLevelContainer, FormContainer } = {
  Container: styled.div`
    width: 420px;

    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[24]};

    color: ${({ theme }) => theme.colorV2.gray[1]};

    Header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[8]};
      padding: 8px 16px;

      border-radius: ${({ theme }) => theme.size[8]};
      background: ${({ theme }) => theme.colorV2.gray[2]};

      div {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[8]};

        div {
          font-weight: 500;
          &.align-right {
            text-align: right;
          }
          &:first-child {
            font-size: ${({ theme }) => theme.font.size[15]};
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: ${({ theme }) => theme.size[8]};
          }
          &:last-child {
            font-size: 20px;
          }
        }
      }

      h2 {
        font-size: ${({ theme }) => theme.font.size[15]};
        font-weight: 500;
      }

      span {
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 400;
      }
    }
  `,
  KycLevelContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[8]};
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};

    div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};
      &:first-child {
        font-size: 13px;
        font-weight: 400;
      }
      &:last-child {
        font-size: ${({ theme }) => theme.font.size[15]};
        font-weight: 500;
      }
    }
  `,
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `
}
