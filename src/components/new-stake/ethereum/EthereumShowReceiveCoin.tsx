import AssetIcon from '@/components/shared/AssetIcon'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import TokensSymbolIcons from '@/components/asset/TokensSymbolIcons'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Staking } from '@/types/Staking'

interface EthereumStpETHInputProps {
  amountValue: string
  balance: bigint
  balanceLoading: boolean
  type: 'deposit' | 'withdraw'
  product: Staking
  chainId: number
}

export default function EthereumShowReceiveCoin({
  amountValue,
  balance,
  balanceLoading,
  type,
  product
}: EthereumStpETHInputProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const stakeTogetherContractAddress = product.contracts.StakeTogether

  return (
    <InputContent>
      <div>
        {balanceLoading ? (
          <SkeletonLoading width={120} />
        ) : (
          <span>{`${t('balance')}: ${formatNumberByLocale(truncateWei(balance, 5), locale)} ${
            type === 'deposit' ? product.symbol : t('eth.symbol')
          }`}</span>
        )}
      </div>
      <div>
        <CoinActionContainer>
          {type === 'deposit' ? (
            <>
              <TokensSymbolIcons productSymbol={product.symbol} size={32} showPlusIcon contractAddress={stakeTogetherContractAddress} />
            </>
          ) : (
            <AssetIcon altName={product.id} image='ethereum' chain={product.asset.chains[0]} size={32} />
          )}
          <span>{type === 'deposit' ? product.symbol : t('eth.symbol')}</span>
        </CoinActionContainer>
        <input type='text' placeholder='0' value={amountValue} disabled />
      </div>
    </InputContent>
  )
}

const { InputContent, CoinActionContainer } = {
  InputContent: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    padding: 16px;
    border-radius: ${({ theme }) => theme.size[8]};

    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border: 1px solid transparent;
    cursor: unset;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${({ theme }) => theme.size[16]};

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
      text-align: end;

      &.max {
        color: ${({ theme }) => theme.colorV2.purple[1]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 400;
      }
    }
  `
}
