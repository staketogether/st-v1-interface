import Image from 'next/image'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import LayoutTitle from '../shared/layout/LayoutTitle'

type Network = 'ethereum' | 'optimism' | 'arbitrum' | 'polygon' | 'solana'

type Products = {
  id: number
  name: string
  image: string
  symbol: string
  icon: string
  networks: Network[]
  apy: number
  airdrops: boolean
  enabled: boolean
}

export default function TokensControl() {
  const { t } = useLocaleTranslation()

  const products: Products[] = [
    {
      id: 1,
      name: 'Ethereum Staking',
      image: 'https://picsum.photos/1',
      symbol: 'stpETH',
      icon: 'https://picsum.photos/2',
      networks: ['ethereum'],
      apy: 6.1,
      airdrops: true,
      enabled: true
    },
    {
      id: 2,
      name: 'Ethereum ReStaking',
      image: 'https://picsum.photos/3',
      symbol: 'stpRETH',
      icon: 'https://picsum.photos/4',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 10.5,
      airdrops: true,
      enabled: false
    },
    {
      id: 3,
      name: 'Celestia Staking',
      image: 'https://picsum.photos/5',
      symbol: 'stpTIA',
      icon: 'https://picsum.photos/6',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 10.5,
      airdrops: false,
      enabled: false
    },
    {
      id: 4,
      name: 'Polygon Staking',
      image: 'https://picsum.photos/7',
      symbol: 'stpPOL',
      icon: 'https://picsum.photos/8',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 10.5,
      airdrops: false,
      enabled: false
    },
    {
      id: 5,
      name: 'Solana Staking',
      image: 'https://picsum.photos/9',
      symbol: 'stpSOL',
      icon: 'https://picsum.photos/10',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 10.5,
      airdrops: false,
      enabled: false
    },
    {
      id: 6,
      name: 'Cosmos Staking',
      image: 'https://picsum.photos/11',
      symbol: 'stpATOM',
      icon: 'https://picsum.photos/12',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 10.5,
      airdrops: false,
      enabled: false
    },
    {
      id: 7,
      name: 'Near Staking',
      image: 'https://picsum.photos/13',
      symbol: 'stpNear',
      icon: 'https://picsum.photos/14',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 10.5,
      airdrops: false,
      enabled: false
    },
    {
      id: 8,
      name: 'Polkadot Staking',
      image: 'https://picsum.photos/15',
      symbol: 'stpKSM',
      icon: 'https://picsum.photos/16',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 10.5,
      airdrops: false,
      enabled: false
    }
  ]

  const networks = {
    ethereum: 'https://picsum.photos/30',
    optimism: 'https://picsum.photos/31',
    arbitrum: 'https://picsum.photos/32',
    polygon: 'https://picsum.photos/33',
    solana: 'https://picsum.photos/34'
  }

  const productsHeader = [
    t('v2.tokens.products.name'),
    t('v2.tokens.products.token'),
    t('v2.tokens.products.networks'),
    t('v2.tokens.products.apy'),
    t('v2.tokens.products.airdrops')
  ]

  return (
    <Container>
      <Content>
        <LayoutTitle title={t('v2.tokens.title')} />
        <Products>
          <ProductsHeader>
            {productsHeader.map((header, i) => (
              <span key={`header-${i}`}>{header}</span>
            ))}
          </ProductsHeader>

          {products.map(product => (
            <ProductItem key={product.id} className={`${!product.enabled && 'disabled'}`}>
              <ImageContainer>
                <Image src={product.image} width={24} height={24} alt={product.name} />
                <span>{product.name}</span>
              </ImageContainer>

              <ImageContainer>
                <Image src={product.icon} width={24} height={24} alt={product.symbol} />
                <span>{product.symbol}</span>
              </ImageContainer>

              <span className='green'>{product.apy}</span>

              <IconsArea>
                {product.networks.map(network => (
                  <Image src={networks[network]} width={24} height={24} alt={network} key={network} />
                ))}
              </IconsArea>

              <span className={`green`}>{product.airdrops ? 'Yes' : '-'}</span>
            </ProductItem>
          ))}
        </Products>
      </Content>
    </Container>
  )
}

const { Container, Content, Products, ProductsHeader, ProductItem, IconsArea, ImageContainer } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    > h2 {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: 20px;
      font-weight: 400;
    }
  `,
  Products: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  ProductsHeader: styled.header`
    display: grid;
    grid-template-columns: 1fr 0.7fr 1fr 0.5fr 1fr;
    gap: 16px;

    padding: 0 12px;

    span {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 500;
    }
  `,
  ProductItem: styled.div`
    display: grid;
    grid-template-columns: 1fr 0.7fr 1fr 0.5fr 1fr;

    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.white};

    border-radius: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[12]};

    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    cursor: pointer;

    img {
      border-radius: 100%;
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 400;

      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
    }

    &.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `,
  ImageContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,

  IconsArea: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
  `
}
