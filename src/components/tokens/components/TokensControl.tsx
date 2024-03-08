import { Product } from '@/types/Product'
import TokensCardContainer from './TokensCardContainer'
import styled from 'styled-components'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

type ProductItemProps = {
  productsList: Product[]
}

export default function TokensControl({ productsList }: ProductItemProps) {
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
    grid-template-columns: 320px 1fr;
    gap: ${({ theme }) => theme.size[24]};
    flex-wrap: wrap;
  `,
  Title: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    color: ${({ theme }) => theme.colorV2.blue[1]};
    h1 {
      font-size: 48px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    h2 {
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      max-width: 301px;
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
      grid-template-columns: 1fr 1fr;
      gap: ${({ theme }) => theme.size[24]};
    }
  `
}
