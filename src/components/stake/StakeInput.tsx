import styled from 'styled-components'
import useEthToUsdPrice from '../../hooks/useEthToUsdPrice'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'

interface StakeInputProps {
  value: string
  onChange: (value: string) => void
  balance: string
  symbol: string
  disabled?: boolean
  purple?: boolean
}

export default function StakeFormInput({
  value,
  onChange,
  symbol,
  balance,
  disabled,
  purple
}: StakeInputProps) {
  const { t } = useTranslation()

  const { price } = useEthToUsdPrice(value)

  function handleChange(value: string) {
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!value || regex.test(value)) {
      onChange(value)
    }
  }

  return (
    <Container>
      <InputContainer>
        <input
          disabled={disabled}
          type='text'
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder='0'
          className={purple ? 'purple' : ''}
        />
        <MaxValue
          className={purple ? 'purple' : ''}
          disabled={disabled}
          onClick={() => handleChange(truncateEther(balance))}
        >
          {t('max')}
        </MaxValue>
      </InputContainer>
      <BalanceInfo>
        <span>{value && price && `${price} ${t('usd')}`}</span>
        <span>
          {t('balance')}: {truncateEther(balance)} {symbol}
        </span>
      </BalanceInfo>
    </Container>
  )
}

const { Container, InputContainer, MaxValue, BalanceInfo } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    border-radius: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.color.whiteAlpha[800]};
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
    gap: ${({ theme }) => theme.size[12]};
  `,
  BalanceInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      font-size: ${({ theme }) => theme.size[12]};
      line-height: 13px;
      display: flex;
      color: ${({ theme }) => theme.color.blue[300]};
    }
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: center;

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

      &.purple {
        &::-webkit-input-placeholder {
          color: ${({ theme }) => theme.color.purple[300]};
        }
      }
    }
  `,
  MaxValue: styled.button`
    border: none;
    padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[16]};
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.blue[100]};
    color: ${({ theme }) => theme.color.white};

    &:hover {
      background-color: ${({ theme }) => theme.color.blue[300]};
    }

    &.purple {
      background-color: ${({ theme }) => theme.color.purple[300]};

      &:hover {
        background-color: ${({ theme }) => theme.color.purple[400]};
      }
    }

    font-size: ${({ theme }) => theme.font.size[12]};
  `
}
