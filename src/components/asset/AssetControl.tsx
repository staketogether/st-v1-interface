import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset, AssetCategory } from '@/types/Asset'
import styled from 'styled-components'
import AssetCard from './AssetCard'
import { useState } from 'react'

interface TokenControlProps {
  assetsList: Asset[]
  category: AssetCategory
}

export default function AssetControl({ assetsList, category }: TokenControlProps) {
  const { t } = useLocaleTranslation()
  const [active, setActive] = useState("all")

  const filters = [
    { key: 1, value: 'all' },
    { key: 2, value: 'blockchains' },
    { key: 3, value: 'defi' },
    { key: 4, value: 'stablecoin' },
    { key: 5, value: 'fantokens' }
  ]


  return (
    <Container>
      <Title>
        <h1>{t(`v3.pages.${category}.title`)}</h1>
        <h2>{t(`v3.pages.${category}.description`)}</h2>

        <ContainerButton>
          {filters.map(filter => (
            <div key={filter.key} className={`${filter.value === active ? 'active' : ''}`} onClick={() => setActive(filter.value)}>{filter.value}</div>
          ))}
        </ContainerButton>
      </Title>
      <Products>
          {assetsList.map(asset => (
            <AssetCard asset={asset} key={asset.id} />
          ))}
      </Products>
    </Container>
  )
}

const { Container, Products, Title, ContainerButton } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
   
  `,

  Title: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    color: ${({ theme }) => theme.colorV2.blue[1]};
    h1 {
      font-size: ${({ theme }) => theme.font.size[32]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      line-height: 52px;
    }
    h2 {
      font-size: ${({ theme }) => theme.font.size[20]};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.size[24]};

      h1 {
        font-size: 48px;
      }

    }
  `,

  Products: styled.nav`
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: ${({ theme }) => theme.size[24]};

      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }
      
  `,
  ContainerButton: styled.div`
    height: 50px;
    display: flex;
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.size[8]};
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    div {
      display: flex;
      height: 40px;
      padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[16]};
      align-items: center;
      border-radius: ${({ theme }) => theme.size[8]};
      box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

      color: ${({ theme }) => theme.color.gray[600]};
      font-size: ${({ theme }) => theme.font.size[16]};
      font-style: normal;
      font-weight: 500;
      background: #FFF;
      cursor: pointer;

      &.active {
        background: ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.gray[200]};
      }
    }
  `
}