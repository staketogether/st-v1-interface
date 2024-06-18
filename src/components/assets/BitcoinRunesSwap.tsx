import { BitcoinRunesAsset } from '@/types/Asset'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import AssetInput from '@/components/assets/AssetsInput'
import styled from 'styled-components'
import AssetIcon from '@/components/shared/AssetIcon'

const BitcoinRunesSwap = ({ asset }: { asset: BitcoinRunesAsset }) => {
  const { t } = useLocaleTranslation()

  return (
    <div>
      <div>
        <span>{t('v3.assetDetail.quantity')}</span>
        <AssetInput cryptoAmountValue={} balance={} balanceLoading={} hasError={} onChange={} productAsset={}
                    accountIsConnected={} />
      </div>
      <div>
        <span>{t('v3.assetDetail.quantity')}</span>
        <InputContainer>
          <div>
            <AssetIcon marginRight="8px" image={asset.symbolImage} chain={asset.chains[0]} size={24}
                       altName={asset.symbol} />
            <span>{asset.symbol}</span>
          </div>
          <Input disabled value={} />
        </InputContainer>
      </div>
    </div>
  )
}

export default BitcoinRunesSwap

const { Input, InputContainer } = {
  InputContainer: styled.div<{ disabled?: boolean }>`
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
      width: 100%;

      > span {
          color: ${({ theme }) => theme.colorV2.gray[6]};
          font-size: ${({ theme }) => theme.font.size[13]};
          font-weight: 400;
      }

      > div {
          width: 100%;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: ${({ theme }) => theme.size[16]};

          border-radius: ${({ theme }) => theme.size[8]};
          padding: ${({ theme }) => theme.size[8]};
          border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
          background: ${({ theme }) => theme.colorV2.white};

          ${({ disabled, theme }) =>
                  disabled &&
                  `
            background: ${theme.colorV2.gray[2]};
            box-shadow: ${theme.shadow[100]};
            border: 1px solid transparent;
          `}

          font-weight: 500;

          &.error {
              border: 1px solid ${({ theme }) => theme.color.red[300]};
          }

          > div {
              font-size: ${({ theme }) => theme.font.size[15]};
              display: flex;
              flex-direction: row;
              align-items: center;
          }
      }
  `,
  Input: styled.input<{ disabled?: boolean }>`
      width: 50%;
      border-radius: 8px;
      background: transparent;
      border: 0;
      font-size: ${({ theme }) => theme.font.size[22]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      text-align: right;

      &:focus {
          outline: none;
      }
  `
}
