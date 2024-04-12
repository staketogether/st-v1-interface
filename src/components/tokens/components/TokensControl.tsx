import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProductStaking } from '@/types/ProductStaking'
import styled from 'styled-components'
import TokensCardContainer from './TokensCardContainer'

type TokensControl = {
  productsList: ProductStaking[]
}

export default function TokensControl({ productsList }: TokensControl) {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <Title>
        <h1>{t('v2.tokens.title')}</h1>
        <h2>{t('v2.tokens.description')}</h2>
      </Title>
      <Products>
        <nav>
          {productsList.map(product => (
            <TokensCardContainer product={product} key={product.id} />
          ))}
        </nav>
      </Products>
    </Container>
  )
}

const { Container, Products, Title } = {
  Container: styled.div`
    width: 100%;
    flex: 1;
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    grid-template-columns: 1fr;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      grid-template-columns: 350px 1fr;
    }
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

      max-width: 270px;
    }
  `,
  Products: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.size[8]};
    nav {
      width: 100%;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: ${({ theme }) => theme.size[24]};
    }
  `
}
