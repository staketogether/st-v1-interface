import StpEthIcon from '@/components/shared/StpethIcon'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import StakingIcons from '@/components/tokens/StakingIcons'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import { Select } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

type EthereumStpETHInputProps = {
  amountValue: string
  balance: bigint
  balanceLoading: boolean
  type: 'deposit' | 'withdraw'
}

export default function EthereumShowReceiveCoin({
  amountValue,
  balance,
  balanceLoading,
  type
}: EthereumStpETHInputProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  return (
    <InputContent>
      <div>
        <Select
          defaultValue='Ethereum'
          style={{ width: 139 }}
          value={'ethereum'}
          options={[
            {
              value: 'ethereum',
              label: (
                <SelectOption>
                  Ethereum <StakingIcons stakingProduct='ethereum' size={16} />
                </SelectOption>
              )
            }
          ]}
        />
        {balanceLoading ? (
          <SkeletonLoading width={120} />
        ) : (
          <span>{`Balance: ${formatNumberByLocale(truncateWei(balance, 5), locale)} ${
            type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')
          }`}</span>
        )}
      </div>
      <div>
        <CoinActionContainer>
          {type === 'deposit' ? (
            <StpEthIcon size={32} showPlusIcon />
          ) : (
            <StakingIcons stakingProduct='ethereum' size={32} />
          )}
          <span>{type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')}</span>
        </CoinActionContainer>
        <input type='text' placeholder='0' value={amountValue} disabled />
      </div>
    </InputContent>
  )
}

const { InputContent, CoinActionContainer, SelectOption } = {
  InputContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    padding: 16px;
    border-radius: ${({ theme }) => theme.size[8]};

    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;

      input {
        text-align: end;
        width: 100%;
        border: none;
        outline: none;
        background: none;
        color: ${({ theme }) => theme.colorV2.gray[6]};
        font-size: ${({ theme }) => theme.font.size[22]};
        line-height: 24px;
        height: 24px;

        &::-webkit-input-placeholder {
          color: ${({ theme }) => theme.colorV2.gray[6]};
        }

        &.error {
          color: ${({ theme }) => theme.color.red[300]};
        }
      }
    }
  `,
  CoinActionContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    span {
      font-size: ${({ theme }) => theme.font.size[20]};
      font-weight: 400;

      &.max {
        color: ${({ theme }) => theme.colorV2.purple[1]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 400;
      }
    }
  `,
  SelectOption: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `
}
