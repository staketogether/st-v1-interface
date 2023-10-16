import Image from 'next/image'
import { type HTMLProps, useRef } from 'react'
import styled from 'styled-components'
import { WrapWidgetToken } from './WrapWidgetDetails'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateDecimal } from '@/services/truncate'

import { makeVar, useReactiveVar } from '@apollo/client'

export const inputValue = makeVar('')

export type WrapWidgetFormInputProps = HTMLProps<HTMLDivElement> & {
  fromToken: WrapWidgetToken
  toToken: WrapWidgetToken
  disabled?: boolean
  hasError?: boolean
}

export const WrapWidgetFormInput = ({
  disabled,
  hasError,
  fromToken,
  toToken,
  ...props
}: WrapWidgetFormInputProps) => {
  const value = useReactiveVar(inputValue)
  const { t } = useLocaleTranslation()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(value: string) {
    if (value.includes(',')) {
      value = value.replace(',', '.')
    }
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!value || regex.test(value)) {
      if (value.length > 19 + value.split('.')[0].length) return
      inputValue(value)
    }
  }

  const handleMaxValue = () => {}

  return (
    <Container className={`${disabled ? 'disabled' : ''}`} {...props}>
      <div className={`${hasError ? 'error' : ''}`}>
        <Content>
          <div>
            <Image src={fromToken.icon} width={24} height={24} alt={fromToken.symbol} />
            <InputContainer>
              <input
                disabled={disabled}
                type='text'
                value={value}
                onChange={e => handleChange(e.target.value)}
                placeholder={`0`}
                className={`${hasError ? 'error' : ''}`}
                ref={inputRef}
              />
              {value.length === 0 ? (
                <span
                  className='absolute'
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.focus()
                    }
                  }}
                >
                  {fromToken.symbol}
                </span>
              ) : (
                ''
              )}
              <span className={`${hasError ? 'error' : ''}`}>
                {`${toToken.symbol} ${truncateDecimal(value || '0', 2)}`}
              </span>
            </InputContainer>
          </div>

          <MaxValue disabled={disabled} onClick={handleMaxValue}>
            {t('max')}
          </MaxValue>
        </Content>
      </div>
    </Container>
  )
}

const { Container, Content, MaxValue, InputContainer } = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    p {
      font-size: 14px;

      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    &.disabled {
      cursor: not-allowed;
      > div {
        background: ${({ theme }) => theme.colorV2.gray[2]};
        cursor: not-allowed;
      }
      button {
        cursor: not-allowed;
        background: ${({ theme }) => theme.color.blackAlpha[300]};
      }
      input {
        color: ${({ theme }) => theme.color.blackAlpha[300]};
        &::-webkit-input-placeholder {
          color: ${({ theme }) => theme.color.blackAlpha[300]};
        }
      }
      img {
        cursor: not-allowed;
        filter: grayscale(100%);
      }
      span {
        color: ${({ theme }) => theme.color.blackAlpha[300]};
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};

      border-radius: ${({ theme }) => theme.size[8]};
      background: ${({ theme }) => theme.color.whiteAlpha[800]};
      padding: ${({ theme }) => theme.size[16]} ${({ theme }) => theme.size[16]};
      gap: ${({ theme }) => theme.size[16]};
      box-shadow: ${({ theme }) => theme.shadow[200]};
      background: ${({ theme }) => theme.colorV2.gray[2]};
    }
  `,
  Content: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[16]};

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[12]};
      img {
        border-radius: 50%;
        box-shadow: ${({ theme }) => theme.shadow[200]};
      }
    }
  `,
  InputContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};

    .absolute {
      position: absolute;
      font-size: ${({ theme }) => theme.font.size[16]};
      line-height: 16px;
      height: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.color.blue[200]};
      margin-left: 24px;
      z-index: 1;
    }

    > input {
      display: flex;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      color: ${({ theme }) => theme.color.black};
      font-size: ${({ theme }) => theme.font.size[24]};
      line-height: 24px;
      height: 24px;

      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.color.blue[200]};
      }

      &.error {
        color: ${({ theme }) => theme.color.red[300]};
      }
    }

    > span {
      font-size: ${({ theme }) => theme.font.size[13]};
      color: ${({ theme }) => theme.color.blue[500]};
      font-weight: 500;
      display: flex;
      gap: ${({ theme }) => theme.size[4]};

      &.error {
        color: ${({ theme }) => theme.color.red[300]};
      }
    }
  `,
  MaxValue: styled.button`
    height: 25px;
    border: none;
    padding: 0px ${({ theme }) => theme.size[16]};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${({ theme }) => theme.color.blackAlpha[300]};
    }

    font-size: ${({ theme }) => theme.font.size[12]};
  `
}

export default WrapWidgetFormInput
