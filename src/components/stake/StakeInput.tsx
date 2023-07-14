import ethIcon from '@assets/icons/eth-icon.svg'
import stIcon from '@assets/icons/staked-icon.svg'
import Image from 'next/image'
import styled from 'styled-components'
import useEthToUsdPrice from '../../hooks/useEthToUsdPrice'
import useTranslation from '../../hooks/useTranslation'
import { truncateWei } from '../../services/truncate'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
interface StakeInputProps {
  value: string
  onChange: (value: string) => void
  balance: bigint
  balanceLoading: boolean
  symbol: string
  type: 'deposit' | 'withdraw'
  disabled?: boolean
  purple?: boolean
  hasError?: boolean
}

export default function StakeFormInput({
  value,
  onChange,
  symbol,
  balance,
  balanceLoading,
  type,
  disabled,
  purple,
  hasError
}: StakeInputProps) {
  const { t } = useTranslation()

  const { price } = useEthToUsdPrice(value)

  function handleChange(value: string) {
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!value || regex.test(value)) {
      if (value.length > 19 + value.split('.')[0].length) return
      onChange(value)
    }
  }

  return (
    <Container>
      {type === 'deposit' ? (
        <h3>{`${t('eth.symbol')} ${t('amount')}`}</h3>
      ) : (
        <h3 className='purple'>{`${t('lsd.symbol')} ${t('amount')}`}</h3>
      )}
      <div className={`${disabled ? 'disabled' : ''} ${hasError ? 'error' : ''}`}>
        <InputContainer>
          <div>
            {type === 'deposit' ? (
              <Image src={ethIcon} width={24} height={24} alt='staked Icon' />
            ) : (
              <Image src={stIcon} width={24} height={24} alt='staked Icon' />
            )}

            <input
              disabled={disabled}
              type='text'
              value={value}
              onChange={e => handleChange(e.target.value)}
              placeholder='0'
              className={`${purple ? 'purple' : ''} ${hasError ? 'error' : ''}`}
            />
          </div>
          <MaxValue
            className={purple ? 'purple' : ''}
            disabled={disabled}
            onClick={() => handleChange(truncateWei(balance, 18))}
          >
            {t('max')}
          </MaxValue>
        </InputContainer>
        <BalanceInfo>
          <span className={`${hasError ? 'error' : ''}`}>
            {value && price && `${truncateWei(BigInt(price), 2)} ${t('usd')}`}
          </span>
          <span className={`${hasError ? 'error' : ''}`}>
            {type === 'deposit' ? t('balance') : t('poolBalance')}:{' '}
            {balanceLoading ? <SkeletonLoading width={90} height={12} /> : truncateWei(balance, 6)}{' '}
            {!balanceLoading && symbol}
          </span>
        </BalanceInfo>
      </div>
    </Container>
  )
}

const { Container, InputContainer, MaxValue, BalanceInfo } = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    h3 {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${({ theme }) => theme.color.blue[400]};
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
        background: ${({ theme }) => theme.color.blackAlpha[100]};
      }

      &.error {
        border: 1px solid ${({ theme }) => theme.color.red[100]};
      }
    }
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

      &.error {
        color: ${({ theme }) => theme.color.red[300]};
      }
    }
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
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

        &.purple {
          &::-webkit-input-placeholder {
            color: ${({ theme }) => theme.color.purple[300]};
          }
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
