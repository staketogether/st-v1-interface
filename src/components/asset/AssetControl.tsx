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
      font-size: 32px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      line-height: 52px;
    }
    h2 {
      font-size: 20px;
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
      grid-template-columns: repeat(auto-fit, minmax(430px, 1fr));
      gap: ${({ theme }) => theme.size[24]};
  `,
  ContainerButton: styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.size[8]};

    div {
      display: flex;
      height: 40px;
      padding: 4px 16px;
      align-items: center;
      border-radius: 8px;

      color: var(--grey-80, #5C626B);
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      background: #FFF;
    }

    div.active {
      background: var(--Primary, #373B8A);
      color: var(--background-light-blue, #EEF2FD);
    }
  `
}
