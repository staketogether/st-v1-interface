import { InputHTMLAttributes, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  title?: string
  error?: string
  register: UseFormRegisterReturn<string>
  disabled?: boolean
  placeholder?: string
  showCharCounter?: boolean
  maxLength?: number
}

export default function TextArea({
  title,
  register,
  error,
  disabled,
  placeholder,
  showCharCounter,
  maxLength,
  ...props
}: TextAreaProps) {
  const [inputCounter, setInputCounter] = useState(0)
  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget
    const value = event.currentTarget.value
    setInputCounter(value.length)
    target.style.height = 'auto'
    target.style.height = `${target.scrollHeight}px`
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
          maxLength={maxLength}
          {...props}
        />
      </InputContainer>
      <MessageContainer>
        <ErrorMessage>{error && error}</ErrorMessage>
        <CharacterCounting>
          {showCharCounter && maxLength && `${inputCounter} / ${maxLength}`}
        </CharacterCounting>
      </MessageContainer>
    </Content>
  )
}

const { InputContainer, Content, MessageContainer, ErrorMessage, CharacterCounting } = {
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
  MessageContainer: styled.span`
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ErrorMessage: styled.span`
    color: ${({ theme }) => theme.color.red[300]} !important;
  `,
  CharacterCounting: styled.span`
    color: ${({ theme }) => theme.colorV2.gray[1]} !important;
  `
}
