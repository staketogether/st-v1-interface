import { AccountAsset } from '@/types/AccountAsset'
import React from 'react'
import styled from 'styled-components'
import WalletSidebarAsset from './WalletSidebarAsset'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { stakingList } from '@/config/product/staking'

interface WalletSidebarAssetContainerProps {
  accountAssets: AccountAsset[]
  accountAssetsLoading: boolean
}

export default function WalletSidebarAssetContainer({ accountAssets }: WalletSidebarAssetContainerProps) {
  const { t } = useLocaleTranslation()
  const assetStakingAddressList = stakingList.map(staking => staking.contracts.StakeTogether)
  const investedAssetList = assetStakingAddressList
    .map(contractAddress => {
      const accountAssetData = accountAssets.find(
        accountAsset => accountAsset.contractAddress.toLowerCase() === contractAddress.toLowerCase()
      )
      if (accountAssetData) {
        return accountAssetData
      }
    })
    .filter(item => item !== undefined) as AccountAsset[]

  const accountAssetsFiltered = accountAssets.filter(accountAsset => !assetStakingAddressList.includes(accountAsset.contractAddress))
  console.log(accountAssets)
  return (
    <Container>
      <div>
        <Title>{t('invested')}</Title>
        <ContainerList>
          {investedAssetList.map((investedAsset, i) => (
            <WalletSidebarAsset asset={investedAsset} key={`${investedAsset.symbol}-${i}`} />
          ))}
        </ContainerList>
      </div>
      <div>
        <Title>{t('assets')}</Title>
        <ContainerList>
          {accountAssetsFiltered.map((accountAsset, i) => (
            <WalletSidebarAsset asset={accountAsset} key={`${accountAsset.symbol}-${i}`} />
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
