import useKycCreate, { KycCreate, TypeAccount } from '@/hooks/ramp/useKycCreate'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import ethIcon from '@assets/icons/eth-icon.svg'
import brla from '@assets/images/BRLA.svg'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import Button from '../shared/Button'
import Input from '../shared/inputs/Input'
import { projectRegexFields, projectRegexOnKeyDown } from '../shared/regex'




export default function KycStep() {
  const { t } = useLocaleTranslation()
  const { address } = useAccount()
  const [formData, setFormaData] = useState<KycCreate>()

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },

  } = useForm<KycCreate>({
    defaultValues: {
      accountType: TypeAccount.CPF
    }
  })

  const { data, error } = useKycCreate('brla', address, formData)

  const chooseAccountType = watch('accountType')

  const onSubmit = (data: KycCreate) => {
    console.log('realizar envio do form', data)

    setFormaData(data)
  }

  useEffect(() => {
    console.log('errors', errors)
    console.log('typeTest', chooseAccountType)
    console.log('data', data)
    console.log('error', error)
  }, [data, error, errors, chooseAccountType])
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
      <FormContainer onSubmit={handleSubmit(onSubmit)} id='kycForm'>
        <ContainerRadio>
          <span>Tipo de conta</span>
          <div>
            <InputRadio>
              <label>CPF</label>
              <input type='radio' id='typeAccount' value={TypeAccount.CPF} {...register('accountType', {
                required: `${t('v2.createProject.formMessages.required')}`,
                onChange: (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)

              })} />
            </InputRadio>
            <InputRadio>
              <label>CNPJ</label>
              <input type='radio' id='typeAccount' value={TypeAccount.CNPJ}  {...register('accountType', {
                required: `${t('v2.createProject.formMessages.required')}`,
                onChange: (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)

              })} />
            </InputRadio>
          </div>
        </ContainerRadio>
        <Input
          title={`${chooseAccountType === TypeAccount.CPF ? 'Nome Completo' : 'Nome Social'}`}
          disabled={false}
          disabledLabel={false}

          register={register('fullName', {
            required: `${t('v2.createProject.formMessages.required')}`,
            onBlur: () => trigger('fullName')
          })}
          maxLength={64}
          error={errors.fullName?.message}
          placeholder={'Insira seu nome igual ao do seu documento'}
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
          placeholder={'Insira seu e-mail para contato'}
        />

        <Input
          title={chooseAccountType.toUpperCase()}
          disabled={false}
          disabledLabel={false}

          register={register('cpfOrCnpj', {
            required: `${t('v2.createProject.formMessages.required')}`,
          })}
          maxLength={64}
          error={errors.cpfOrCnpj?.message}
          placeholder={`${chooseAccountType === TypeAccount.CPF ? '000.000.000-00' : '00.000.000/00000-00'}`}
        />
        <Input
          title={`${chooseAccountType === TypeAccount.CPF ? 'Data Nascimento' : 'Data fundação'}`}
          disabled={false}
          disabledLabel={false}

          register={register('birthDate', {
            required: `${t('v2.createProject.formMessages.required')}`,
            onBlur: () => trigger('birthDate')
          })}
          maxLength={64}
          error={errors.cpfOrCnpj?.message}
          placeholder={'00/00/00'}
        />
        <Button form='kycForm' type='submit' label={'Continuar'} icon={<PiArrowRight />} />
      </FormContainer>
    </Container>
  )
}

const { Container, KycLevelContainer, FormContainer, InputRadio, ContainerRadio } = {
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
    gap: ${({ theme }) => theme.size[8]};
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
