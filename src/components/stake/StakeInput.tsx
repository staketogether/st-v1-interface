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
}

export default function StakeFormInput({ value, onChange, symbol, balance, disabled }: StakeInputProps) {
  const { t } = useTranslation()

  const { price } = useEthToUsdPrice(value)

  function handleChange(value: string) {
    onChange(value)
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
        />
        <MaxValue disabled={disabled} onClick={() => handleChange(truncateEther(balance))}>
          Max
        </MaxValue>
      </InputContainer>
      <ValuesInDollar>
        <span>{value && `${price} USD`}</span>
        <span>
          {t('balance')}: {truncateEther(balance)} {symbol}
        </span>
      </ValuesInDollar>
    </Container>
  )
}

const { Container, InputContainer, MaxValue, ValuesInDollar } = {
  Container: styled.div`
    display: flex;
    padding: 7px 11px;
    border: 1px solid #e1e1e1;
    border-radius: ${({ theme }) => theme.size[16]};
    gap: 8px;
    background: ${({ theme }) => theme.color.white};
    flex-direction: column;
  `,
  ValuesInDollar: styled.div`
    display: flex;
    justify-content: space-between;
    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 13px;
      display: flex;
      color: ${({ theme }) => theme.color.purple[600]};
    }
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: center;
    > input {
      width: 100%;
      border: none;
      outline: none;

      padding: 0;

      font-size: ${({ theme }) => theme.font.size[24]};
      line-height: 29px;
      display: flex;
      box-shadow: none !important;
      color: ${({ theme }) => theme.color.black};
    }
  `,
  MaxValue: styled.button`
    border: none;
    padding-left: 8px;
    padding-right: 8px;
    height: 24px;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.purple[600]};
    border-radius: 8px;
    margin-bottom: 4px;
    margin-top: 4px;

    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 22px;
      color: ${({ theme }) => theme.color.blue[300]};
      text-align: left;
    }
  `
}
