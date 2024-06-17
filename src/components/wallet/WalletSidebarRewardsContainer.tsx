import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { AccountAsset } from '@/types/AccountAsset'
import React from 'react'
import styled from 'styled-components'

interface WalletSidebarAssetContainerProps {
  accountAssets: AccountAsset[]
  accountAssetsLoading: boolean
}

export default function WalletSidebarAssetContainer({ accountAssets }: WalletSidebarAssetContainerProps) {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <div>
        <Title>{t('rewards')}</Title>
        <ContainerList></ContainerList>
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
