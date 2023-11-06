import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  title?: string
  error?: string
  register: UseFormRegisterReturn<string>
  disabled?: boolean
  placeholder?: string
}

export default function TextArea({ title, register, error, disabled, placeholder, ...props }: TextAreaProps) {
  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget
    target.style.height = 'auto' // Reset the height to 'auto'
    target.style.height = `${target.scrollHeight}px` // Set the height to the scrollHeight to expand the textarea
  }
  return (
    <Content className={`${disabled ? 'disabled' : ''}`}>
      {title && <span>{title}</span>}
      <InputContainer className={`${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}>
        <textarea
          onInput={handleInput}
          {...register}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />
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
    border: 1px solid transparent;

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

    textarea {
      border: none;
      width: inherit;
      background: transparent;
      height: auto;
      overflow: hidden;
      min-height: 150px;

      &:disabled {
        cursor: not-allowed;
      }

      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        opacity: 0.5;
      }
      &:hover,
      &:focus {
        border: none;
        outline: none;
      }
    }
  `,
  ErrorMessage: styled.span`
    color: ${({ theme }) => theme.color.red[300]} !important;
    height: 14px;
  `
}
