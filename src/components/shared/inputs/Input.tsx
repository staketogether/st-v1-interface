import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  title?: string
  error?: string
  register: UseFormRegisterReturn<string>
  disabled?: boolean
  disabledLabel?: boolean
}

export default function Input({ title, register, error, disabled, disabledLabel, ...props }: InputProps) {
  return (
    <Content className={` ${disabledLabel ? 'disabled' : ''}`}>
      {title && <span>{title}</span>}
      <InputContainer className={`${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}>
        <input type='text' {...register} disabled={disabled} {...props} />
      </InputContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </Content>
  )
}

const { InputContainer, Content, ErrorMessage } = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[13]};
    &.disabled {
      > span {
        opacity: 0.5;
      }
    }
  `,
  InputContainer: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.size[4]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[200]};
    background: ${({ theme }) => theme.colorV2.gray[2]};

    &.disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.color.blackAlpha[600]};
      opacity: 0.5;
    }

    &.error {
      border: 1px solid ${({ theme }) => theme.color.red[300]};
      color: ${({ theme }) => theme.color.red[300]};
      > input {
        color: ${({ theme }) => theme.color.red[300]};
      }
    }

    > input,
    select {
      color: ${({ theme }) => theme.color.black};
      font-size: ${({ theme }) => theme.font.size[12]};
      line-height: 22px;
      height: 22px;
    }
    > input,
    select,
    textarea {
      border: none;
      width: inherit;
      background: transparent;
      &:hover,
      &:focus {
        border: none;
        outline: none;
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

      &[type='file'] {
        display: none;
      }
    }

    > textarea {
      min-height: 15vh;
      resize: vertical;
      &:disabled {
        cursor: not-allowed;
      }

      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        opacity: 0.5;
      }
    }
    > select {
      &:disabled {
        cursor: not-allowed;
      }
    }
  `,
  ErrorMessage: styled.span`
    color: ${({ theme }) => theme.color.red[300]} !important;
    height: 14px;
  `
}
