import AssetIcon from '@/components/shared/AssetIcon'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'

import { useRouter } from 'next/router'
import { useRef } from 'react'
import styled from 'styled-components'
import { Asset } from '@/types/Asset'
import { ethMainnet } from '@/config/product/asset'

interface EthereumInputProps {
  ethAmountValue: string
  balance: bigint
  balanceLoading: boolean
  hasError: boolean
  onChange: (value: string) => void
  onMaxFunction?: () => void
  productAsset: Asset
  accountIsConnected: boolean
}

export default function AssetInput({
  balance,
  balanceLoading,
  ethAmountValue,
  hasError,
  onChange,
  onMaxFunction,
  productAsset,
  accountIsConnected
}: EthereumInputProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerHeaderRef = useRef<HTMLDivElement>(null)

  function handleChangeValue(value: string) {
    if (value.includes(',')) {
      value = value.replace(',', '.')
    }
    const regex = /^(\d+(\.\d*)?|\.\d+)$/
    if (!value || regex.test(value)) {
      if (value.length > 19 + value.split('.')[0].length) return
      onChange(value)
    }
  }

  function handleFocusInput() {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  function handleFocusContainer() {
    if (containerHeaderRef.current) {
      containerHeaderRef.current.classList.add('active')
    }
  }

  function handleBlurContainer() {
    if (containerHeaderRef.current) {
      containerHeaderRef.current.classList.remove('active')
    }
  }

  return (
    <InputContent onClick={handleFocusInput} ref={containerHeaderRef}>
      {accountIsConnected && (
        <div>
          {balanceLoading ? (
            <SkeletonLoading width={120} />
          ) : (
            <span>{`${t('balance')}: ${formatNumberByLocale(truncateWei(balance, 5), locale)} ${productAsset.symbol}`}</span>
          )}
        </div>
      )}
      <div>
        <CoinActionContainer>
          <AssetIcon
            image={productAsset.symbolImage ?? ethMainnet.symbolImage}
            chain={productAsset.chains[0]}
            size={32}
            altName={productAsset.symbol}
          />
          <span className='max' onClick={onMaxFunction}>
            MAX
          </span>
        </CoinActionContainer>
        <input
          ref={inputRef}
          type='text'
          value={ethAmountValue}
          onChange={e => handleChangeValue(e.target.value)}
          placeholder='0'
          onFocus={handleFocusContainer}
          onBlur={handleBlurContainer}
          className={`${hasError && 'error'}`}
        />
      </div>
    </InputContent>
  )
}

const { InputContent, CoinActionContainer } = {
  InputContent: styled.div`
    width: 100%;
    min-height: 45px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    padding: 8px;
    border-radius: ${({ theme }) => theme.size[8]};
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border: 1px solid ${({ theme }) => theme.colorV2.gray[2]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    cursor: text;

    &.stpETH {
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
    }

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
    }

    &.active {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[8]};

      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;

      input {
        text-align: end;
        width: 100%;
        border: none;
        outline: none;
        background: none;
        color: ${({ theme }) => theme.colorV2.gray[1]};
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
        cursor: pointer;
      }
    }
  `
}
