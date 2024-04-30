import { AccountAsset } from '@/types/AccountAsset'
import useCoinConversion from '@/hooks/useCoinConversion'
import AssetIcon from '@/components/shared/AssetIcon'
import { formatNumberByLocale } from '@/services/format'
import { assetsList } from '@/config/product/asset'
import styled from 'styled-components'
import { truncateWei } from '@/services/truncate'
import defaultErc20Icon from '@assets/assets/default-erc-20.svg'

export default function WalletSidebarAsset({ walletAsset }: { walletAsset: AccountAsset }) {
  const asset = assetsList
    .find((supportedAsset) =>
      supportedAsset.contractAddress.toLowerCase() === walletAsset.contractAddress.toLowerCase()
      && supportedAsset.chains[0] === walletAsset.chainId
    )
  const contractAddress = asset?.type === 'erc20' ? asset?.contractAddress : asset?.wrapperContractAddress
  const fixedWalletBalance = walletAsset.decimals >= 18 ? walletAsset.balance : walletAsset.balance + '0'.repeat(18 - walletAsset.decimals)
  const formattedBalance = formatNumberByLocale(truncateWei(BigInt(fixedWalletBalance), 6))
  const { priceConvertedValue } = useCoinConversion(formattedBalance, asset?.chains[0], contractAddress)
  const imageSrc = (asset?.symbolImage ?? walletAsset?.thumbnail) ?? defaultErc20Icon

  return (
    <BalanceContainer key={walletAsset.chainId}>
      <div>
        <div>
          <AssetIcon image={imageSrc} size={24} altName={walletAsset.symbol} chain={walletAsset.chainId} />
        </div>
        <div>
          <span>{walletAsset.symbol}</span>
          <span>{walletAsset.name}</span>
        </div>
      </div>
      <div>
        <span>{formattedBalance}</span>
        <span>{priceConvertedValue}</span>
      </div>
    </BalanceContainer>
  )
}

const { BalanceContainer } = {
  BalanceContainer: styled.div`
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
  `,
}