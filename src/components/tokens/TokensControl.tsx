import Image from 'next/image'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import LayoutTitle from '../shared/layout/LayoutTitle'

export default function TokensControl() {
  const { t } = useLocaleTranslation()

  const products = [
    {
      id: 1,
      name: 'Ethereum Staking',
      image: 'https://picsum.photos/1',
      symbol: 'stpETH',
      icon: 'https://picsum.photos/2',
      networks: ['ethereum', 'optimism', 'arbitrum', 'polygon', 'solana'],
      apy: 6.1,
      airdrops: ['stake-together', 'layer-zero'],
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
      airdrops: ['stake-together', 'layer-zero', 'eigen-layer'],
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
      airdrops: ['stake-together', 'layer-zero', 'celestia'],
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
      airdrops: ['stake-together', 'layer-zero'],
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
      airdrops: ['stake-together', 'layer-zero'],
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
      airdrops: ['stake-together', 'layer-zero'],
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
      airdrops: ['stake-together', 'layer-zero'],
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
      airdrops: ['stake-together', 'layer-zero'],
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

  const airdrops = {
    'stake-together': 'https://picsum.photos/40',
    'layer-zero': 'https://picsum.photos/41',
    'eigen-layer': 'https://picsum.photos/42',
    celestia: 'https://picsum.photos/43'
  }

  const productsHeader = [
    t('tokens.products.name'),
    t('tokens.products.token'),
    t('tokens.products.apy'),
    t('tokens.products.networks'),
    t('tokens.products.airdrops')
  ]

  return (
    <Container>
      <Content>
        <LayoutTitle title={t('tokens.title')} />
        <Products>
          <ProductsHeader>
            {productsHeader.map(header => (
              <div>{header}</div>
            ))}
          </ProductsHeader>

          {products.map(product => (
            <ProductItem key={product.id} className={`${!product.enabled ? 'enabled' : ''}`}>
              <div>
                <div>
                  <Image src={product.image} width={24} height={24} alt={product.name} />
                </div>
                <div>{product.name}</div>
              </div>
              <div>
                <div>
                  <Image src={product.icon} width={24} height={24} alt={product.symbol} />
                </div>
                <div>{product.symbol}</div>
              </div>
              <div>{product.apy}</div>
              <IconsArea>
                {product.networks.map(network => (
                  <>
                    {network === 'ethereum' && (
                      <Image src={networks[network]} width={24} height={24} alt={network} />
                    )}
                    {network === 'optimism' && (
                      <Image src={networks[network]} width={24} height={24} alt={network} />
                    )}
                    {network === 'arbitrum' && (
                      <Image src={networks[network]} width={24} height={24} alt={network} />
                    )}
                    {network === 'polygon' && (
                      <Image src={networks[network]} width={24} height={24} alt={network} />
                    )}
                    {network === 'solana' && (
                      <Image src={networks[network]} width={24} height={24} alt={network} />
                    )}
                  </>
                ))}
              </IconsArea>

              <div>
                {product.airdrops.map(airdrop => (
                  <>
                    {airdrop === 'stake-together' && (
                      <Image src={airdrops[airdrop]} width={24} height={24} alt={airdrop} />
                    )}
                    {airdrop === 'layer-zero' && (
                      <Image src={airdrops[airdrop]} width={24} height={24} alt={airdrop} />
                    )}
                    {airdrop === 'eigen-layer' && (
                      <Image src={airdrops[airdrop]} width={24} height={24} alt={airdrop} />
                    )}
                    {airdrop === 'celestia' && (
                      <Image src={airdrops[airdrop]} width={24} height={24} alt={airdrop} />
                    )}
                  </>
                ))}
              </div>
            </ProductItem>
          ))}
        </Products>
      </Content>
    </Container>
  )
}

const { Container, Content, Products, ProductsHeader, ProductItem, IconsArea } = {
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  `,
  ProductsHeader: styled.div`
    display: grid;
    grid-template-columns: 1fr 0.7fr 0.5fr 1fr 1fr;
    gap: 16px;
    color: ${({ theme }) => theme.colorV2.blue[1]};
    font-size: 12px;
    font-weight: 500;
    padding: 0 12px;
  `,
  ProductItem: styled.div`
    display: grid;
    grid-template-columns: 1fr 0.7fr 0.5fr 1fr 1fr;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;
    align-items: center;
    gap: 16px;

    cursor: pointer;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    img {
      border-radius: 100%;
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    &.enabled {
      background: ${({ theme }) => theme.colorV2.white};
    }
  `,
  IconsArea: styled.div`
    display: flex;
    gap: 16px;
  `
}
