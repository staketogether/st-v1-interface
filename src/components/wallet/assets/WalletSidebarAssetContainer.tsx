import { assetsList } from '@/config/product/asset'
import { stakingList } from '@/config/product/staking'
import { AccountAsset } from '@/types/AccountAsset'
import React from 'react'
import styled from 'styled-components'
import WalletSidebarAsset from './WalletSidebarAsset'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { chainConfigByChainId } from '@/config/chain'

interface WalletSidebarAssetContainerProps {
  accountAssets: AccountAsset[]
}

export default function WalletSidebarAssetContainer({ accountAssets }: WalletSidebarAssetContainerProps) {
  const { t } = useLocaleTranslation()
  const assetContractAddressList = stakingList.map(staking => staking.contracts.StakeTogether)
  const investedAssetList = assetContractAddressList.map(contractAddress => {
    const accountAssetData = accountAssets.find(
      accountAsset => accountAsset.contractAddress.toLowerCase() === contractAddress.toLowerCase()
    )
    if (accountAssetData) {
      return accountAssetData
    }
    const asset = assetsList.find(assetPlatform => assetPlatform.contractAddress.toLowerCase() === contractAddress.toLowerCase())

    if (asset) {
      const assetMapped: AccountAsset = {
        chainId: asset.chains[0],
        contractAddress: asset.contractAddress,
        symbol: asset.symbol,
        thumbnail: undefined,
        balance: '0',
        decimals: asset.decimals,
        name: chainConfigByChainId(asset.chains[0]).name
      }
      return assetMapped
    }
    const nullAsset: AccountAsset = {
      chainId: 1,
      contractAddress: '0x',
      symbol: '',
      thumbnail: undefined,
      balance: '0',
      decimals: 0,
      name: ''
    }
    return nullAsset
  })

  const accountAssetsFiltered = accountAssets.filter(
    item =>
      item.contractAddress.toLocaleLowerCase() !==
      investedAssetList.find(investedAsset => investedAsset.contractAddress === item.contractAddress)?.contractAddress.toLocaleLowerCase()
  )

  return (
    <Container>
      <div>
        <Title>{t('invested')}</Title>
        <ContainerList>
          {investedAssetList.map(investedAsset => (
            <WalletSidebarAsset walletAsset={investedAsset} key={investedAsset.symbol} />
          ))}
        </ContainerList>
      </div>
      <div>
        <Title>{t('assets')}</Title>
        <ContainerList>
          {accountAssetsFiltered.map(accountAsset => (
            <WalletSidebarAsset walletAsset={accountAsset} key={accountAsset.symbol} />
          ))}
        </ContainerList>
      </div>
    </Container>
  )
}

const { Container, ContainerList, Title } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  ContainerList: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  Title: styled.h3`
    color: ${({ theme }) => theme.colorV2.blue[1]};
    font-size: ${({ theme }) => theme.font.size[13]};
    font-weight: 500;
    margin-left: ${({ theme }) => theme.size[8]};
  `
}
