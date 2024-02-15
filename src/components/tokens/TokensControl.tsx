import stIcon from '@assets/st-symbol.svg'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import NetworkIcons from '../shared/NetworkIcons'
import LayoutTitle from '../shared/layout/LayoutTitle'
import AirdropIcons from './AirdropIcons'
import StakingIcons from './StakingIcons'

export default function TokensControl() {
  const { t } = useLocaleTranslation()

  const productsHeader = [
    t('v2.tokens.products.name'),
    t('v2.tokens.products.token'),
    t('v2.tokens.products.apy'),
    t('v2.tokens.products.networks'),
    t('v2.tokens.products.airdrops')
  ]

  return (
    <Container>
      <DesktopContent>
        <LayoutTitle title={t('v2.tokens.title')} />
        <Products>
          <ProductsHeader>
            {productsHeader.map((header, i) => (
              <span key={`header-${i}`}>{header}</span>
            ))}
          </ProductsHeader>
          <nav>
            {products.map(product => (
              <ProductItem
                href={product.urlRedirect}
                key={product.id}
                className={`${!product.enabled && 'disabled'}`}
                style={{
                  pointerEvents: !product.enabled ? 'none' : undefined
                }}
              >
                <ImageContainer>
                  <StakingIcons stakingProduct={product.icon} size={24} />
                  <span>{product.name}</span>
                </ImageContainer>

                <ImageContainer>
                  <Image src={stIcon} width={24} height={24} alt={product.symbol} />
                  <span>{product.symbol}</span>
                </ImageContainer>

                <span className='green'>{`${product.apy}%`}</span>

                <IconsArea>
                  {product.networks.map(network => (
                    <NetworkIcons
                      network={network.network}
                      size={24}
                      key={network.network}
                      enabled={network.enabled}
                    />
                  ))}
                </IconsArea>

                <IconsArea>
                  {product.airdrops.map(airdrop => (
                    <AirdropIcons airdrop={airdrop} size={24} key={airdrop} />
                  ))}
                </IconsArea>
              </ProductItem>
            ))}
          </nav>
        </Products>
      </DesktopContent>
      <MobileContent>
        <LayoutTitle title={t('v2.tokens.title')} />
        {products.map(product => (
          <ProductCard
            href={product.urlRedirect}
            key={product.id}
            className={`${!product.enabled && 'disabled'}`}
            style={{
              pointerEvents: !product.enabled ? 'none' : undefined
            }}
          >
            <header>
              <ImageContainer>
                <StakingIcons stakingProduct={product.icon} size={22} />
                <span>{product.name}</span>
              </ImageContainer>
              <div>
                <span className='opacity'>{t('v2.tokens.products.apy')}</span>
                <span className='green'>{`${product.apy}%`}</span>
              </div>
            </header>
            <div>
              <div>
                <span className='opacity'>{t('v2.tokens.products.token')}</span>
                <ImageContainer>
                  <Image src={stIcon} width={16} height={16} alt={product.symbol} />
                  <span>{product.symbol}</span>
                </ImageContainer>
              </div>
              <div>
                <span className='opacity'>{t('v2.tokens.products.networks')}</span>
                <IconsArea>
                  {product.networks.map(network => (
                    <NetworkIcons
                      network={network.network}
                      size={16}
                      key={network.network}
                      enabled={network.enabled}
                    />
                  ))}
                </IconsArea>
              </div>
              <div>
                <span className='opacity'>{t('v2.tokens.products.airdrops')}</span>
                <IconsArea>
                  {product.airdrops.map(airdrop => (
                    <AirdropIcons airdrop={airdrop} size={16} key={airdrop} />
                  ))}
                </IconsArea>
              </div>
            </div>
          </ProductCard>
        ))}
      </MobileContent>
    </Container>
  )
}

const {
  Container,
  DesktopContent,
  MobileContent,
  Products,
  ProductsHeader,
  ProductItem,
  IconsArea,
  ImageContainer,
  ProductCard
} = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
  `,
  DesktopContent: styled.div`
    display: none;

    img {
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};

      > h2 {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: 20px;
        font-weight: 400;
      }
    }
  `,
  MobileContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    img {
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: none;
    }
  `,
  Products: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  ProductsHeader: styled.header`
    display: grid;
    grid-template-columns: 1fr 0.7fr 0.5fr 1fr 1fr;
    gap: 16px;

    padding: 0 12px;

    span {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 500;
    }
  `,
  ProductItem: styled(Link)`
    display: grid;
    grid-template-columns: 1fr 0.7fr 0.5fr 1fr 1fr;

    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.white};

    border-radius: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[12]};

    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    cursor: pointer;

    img {
      border-radius: 100%;
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
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
  `,
  ProductCard: styled(Link)`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    padding: ${({ theme }) => theme.size[12]};

    font-size: ${({ theme }) => theme.font.size[15]};
    font-weight: 400;

    border-radius: ${({ theme }) => theme.size[12]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      &.opacity {
        opacity: 0.8;
      }
      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
    }

    header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
      > div {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: ${({ theme }) => theme.size[8]};
        align-items: center;
      }
    }
    &.disabled {
      opacity: 0.5;
    }
  `
}
