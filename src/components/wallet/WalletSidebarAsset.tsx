import { AccountAsset } from '@/types/AccountAsset'
import AssetIcon from '@/components/shared/AssetIcon'
import { formatNumberByLocale } from '@/services/format'
import { assetsList } from '@/config/product/asset'
import styled from 'styled-components'
import { truncateWei } from '@/services/truncate'
import defaultErc20Icon from '@assets/assets/default-erc-20.svg'
import useFiatUsdConversion from '@/hooks/useFiatUsdConversion'
import Link from 'next/link'

export default function WalletSidebarAsset({ asset }: { asset: AccountAsset }) {
  const configAsset = assetsList.find(
    supportedAsset =>
      supportedAsset.contractAddress.toLowerCase() === asset.contractAddress.toLowerCase() &&
      supportedAsset.chains[0] === asset.chainId
  )

  const fixedWalletBalance = asset.decimals >= 18 ? asset.balance : asset.balance + '0'.repeat(18 - asset.decimals)
  const formattedBalance = formatNumberByLocale(truncateWei(BigInt(fixedWalletBalance), 6))

  const imageSrc = configAsset?.symbolImage ?? asset?.thumbnail ?? defaultErc20Icon
  const { usdToCurrency } = useFiatUsdConversion()

  return (
    <BalanceContainer href={`${configAsset?.url}`} key={asset.chainId}>
      <div>
        <div>
          <AssetIcon image={imageSrc} size={24} altName={asset.symbol} chain={asset.chainId} />
        </div>
        <div>
          <span>{asset.symbol}</span>
          <span>{asset.name}</span>
        </div>
      </div>
      <div>
        <span>{formattedBalance}</span>
        <span>{usdToCurrency(asset.balanceUsd).formatted}</span>
      </div>
    </BalanceContainer>
  )
}

const { BalanceContainer } = {
  BalanceContainer: styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      &:nth-child(1) {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};

        > div {
          display: flex;
          flex-direction: column;

          span {
            text-align: start;

            &:nth-child(1) {
              font-size: ${({ theme }) => theme.font.size[13]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
            }

            &:nth-child(2) {
              font-size: ${({ theme }) => theme.font.size[12]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
              opacity: 0.8;
            }
          }
        }
      }

      &:nth-child(2) {
        display: flex;
        flex-direction: column;

        span {
          text-align: end;

          &:nth-child(1) {
            font-size: ${({ theme }) => theme.font.size[13]};
            color: ${({ theme }) => theme.colorV2.purple[1]};
          }

          &:nth-child(2) {
            font-size: ${({ theme }) => theme.font.size[12]};
            color: ${({ theme }) => theme.colorV2.gray[1]};
            opacity: 0.8;
          }
        }
      }
    }
  `
}
