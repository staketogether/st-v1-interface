import { Tooltip } from 'antd'
import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { PiQuestion } from 'react-icons/pi'
import styled, { css } from 'styled-components'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  title?: string
  error?: string
  register: UseFormRegisterReturn<string>
  disabled?: boolean
  disabledLabel?: boolean
  tooltip?: string
  height?: number
  inputType?: 'outline'
  background?: 'gray' | 'white'
}

export default function Input({
  title,
  register,
  error,
  disabled,
  tooltip,
  background = 'gray',
  disabledLabel,
  height,
  inputType,
  ...props
}: InputProps) {
  return (
    <Content className={` ${disabledLabel ? 'disabled' : ''}`}>
      {title && !tooltip && <span>{title}</span>}
      {title && tooltip && (
        <span>
          {title}
          <Tooltip title={tooltip}>
            <QuestionIcon />
          </Tooltip>
        </span>
      )}
      <InputContainer
        className={`${disabled ? 'disabled' : ''}  ${error ? 'error' : ''} ${inputType}`}
        height={height}
        background={background}
      >
        <input type='text' {...register} disabled={disabled} {...props} />
      </InputContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </Content>
  )
}

const { InputContainer, Content, ErrorMessage, QuestionIcon } = {
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
    > span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `,
  InputContainer: styled.div<{ height?: number; background: 'gray' | 'white' }>`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    ${({ height }) =>
      height &&
      css`
        height: ${height}px;
      `}
    border-radius: ${({ theme }) => theme.size[8]};
    ${({ background }) =>
      background === 'gray'
        ? css`
            background: ${({ theme }) => theme.colorV2.gray[2]};
            border: 1px solid transparent;
          `
        : css`
            background: ${({ theme }) => theme.colorV2.white};
            border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
          `}
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[200]};

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
    &.outline {
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
      box-shadow: none;
    }
  `,
  ErrorMessage: styled.span`
    color: ${({ theme }) => theme.color.red[300]} !important;
    height: 14px;
  `,
  QuestionIcon: styled(PiQuestion)`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    margin-left: 2px;
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
