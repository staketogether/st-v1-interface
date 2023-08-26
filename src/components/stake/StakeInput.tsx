import ethIcon from '@assets/icons/eth-icon.svg'
import stIcon from '@assets/icons/seth-icon.svg'
import Image from 'next/image'
import styled from 'styled-components'
import useEthToUsdPrice from '../../hooks/useEthToUsdPrice'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import { truncateDecimal } from '../../services/truncate'

interface StakeInputProps {
  value: string
  onChange: (value: string) => void
  balanceLoading: boolean
  type: 'deposit' | 'withdraw'
  handleMaxValue: () => void
  disabled?: boolean
  purple?: boolean
  hasError?: boolean
}

export default function StakeFormInput({
  value,
  onChange,
  balanceLoading,
  type,
  handleMaxValue,
  disabled,
  purple,
  hasError
}: StakeInputProps) {
  const { t } = useLocaleTranslation()

  const { price } = useEthToUsdPrice(value)

  function handleChange(value: string) {
    if (value.includes(',')) {
      value = value.replace(',', '.')
    }
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!value || regex.test(value)) {
      if (value.length > 19 + value.split('.')[0].length) return
      onChange(value)
    }
  }

  return (
    <Container>
      {type === 'deposit' ? (
        <h3>{`${t('eth.symbol')} ${t('form.amount')}`}</h3>
      ) : (
        <h3 className='purple'>{`${t('lsd.symbol')} ${t('form.amount')}`}</h3>
      )}
      <div className={`${disabled ? 'disabled' : ''} ${hasError ? 'error' : ''}`}>
        <Content>
          <div>
            {type === 'deposit' ? (
              <Image src={ethIcon} width={24} height={24} alt='staked Icon' />
            ) : (
              <Image src={stIcon} width={24} height={24} alt='staked Icon' />
            )}
            <InputContainer>
              <input
                disabled={disabled}
                type='text'
                value={value}
                onChange={e => handleChange(e.target.value)}
                placeholder='0'
                className={`${purple ? 'purple' : ''} ${hasError ? 'error' : ''}`}
              />
              <span className={`${hasError ? 'error' : ''}`}>{`$ ${truncateDecimal(price || '0', 2)}`}</span>
            </InputContainer>
          </div>
          <MaxValue
            className={purple ? 'purple' : ''}
            disabled={balanceLoading || disabled}
            onClick={handleMaxValue}
          >
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
    gap: ${({ theme }) => theme.size[4]};
    h3 {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      color: ${({ theme }) => theme.color.blue[600]};
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};

      border-radius: ${({ theme }) => theme.size[16]};
      background: ${({ theme }) => theme.color.whiteAlpha[800]};
      padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
      gap: ${({ theme }) => theme.size[12]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
      border: 1px solid ${({ theme }) => theme.color.white};

      &.disabled {
        border: 1px solid ${({ theme }) => theme.color.transparent};
        background: ${({ theme }) => theme.color.blue[50]};
      }

      &.error {
        border: 1px solid ${({ theme }) => theme.color.red[100]};
      }
    }
  `,
  Content: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    > input {
      display: flex;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      color: ${({ theme }) => theme.color.black};
      font-size: ${({ theme }) => theme.font.size[24]};

      &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.color.blue[300]};
      }

      &.error {
        color: ${({ theme }) => theme.color.red[300]};
      }
    }

    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.blue[500]};
      font-weight: 500;

      &.error {
        color: ${({ theme }) => theme.color.red[300]};
      }
    }
  `,
  MaxValue: styled.button`
    height: 25px;
    border: none;
    padding: 0px ${({ theme }) => theme.size[16]};
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }

    &:disabled {
      cursor: not-allowed;
    }

    font-size: ${({ theme }) => theme.font.size[12]};
  `
}
