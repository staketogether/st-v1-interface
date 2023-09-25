import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { lightTheme } from '@/styles/theme'
import { Upload } from 'antd'
import { UseFormRegisterReturn } from 'react-hook-form'
import styled from 'styled-components'

export default function GenericInput({
  title,
  register,
  error,
  type = 'text',
  options
}: {
  title?: string
  error?: string
  register: UseFormRegisterReturn<string>
  type?: 'text' | 'longText' | 'file' | 'select'
  options?: { key: string; value: string }[]
}) {
  const { t } = useLocaleTranslation()
  const { colorV2, color } = lightTheme
  return (
    <Content>
      {title && <span>{title}</span>}
      <InputContainer>
        {type === 'text' && <input type='text' {...register} />}
        {type === 'file' && (
          <>
            <input type='file' />
            <Upload
              listType='picture'
              maxCount={1}
              progress={{
                strokeColor: {
                  '0%': `${colorV2.blue[1]}`,
                  '100%': `${color.green[500]}`
                },
                strokeWidth: 3,
                format: percent => percent && `${parseFloat(percent.toFixed(2))}%`
              }}
            >
              <button>{t('v2.stakeProfileEdit.choseFile')}</button>
            </Upload>
          </>
        )}
        {type === 'longText' && <textarea {...register} />}
        {type === 'select' && options && (
          <select {...register}>
            {options?.map(option => <option key={option.key}>{option.value}</option>)}
          </select>
        )}
      </InputContainer>
      {error && <span>{error}</span>}
    </Content>
  )
}

const { InputContainer, Content } = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  InputContainer: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.size[4]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.whiteAlpha[800]};
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[200]};
    background: ${({ theme }) => theme.colorV2.gray[2]};

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

      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.color.blue[200]};
      }

      &.error {
        color: ${({ theme }) => theme.color.red[300]};
      }
      &[type='file'] {
        display: none;
      }
    }

    > textarea {
      min-height: 15vh;
      resize: vertical;
    }
  `
}
