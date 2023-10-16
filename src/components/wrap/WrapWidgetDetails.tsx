import { HTMLProps } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

export type WrapWidgetToken = {
  address: string
  symbol: string
  decimals: number
  icon: string
}

export type WrapWidgetDetailsProps = HTMLProps<HTMLDivElement> & {
  isUnwraping?: boolean
  tokens: WrapWidgetToken[]
}

export const WrapWidgetDetails = ({ tokens, isUnwraping, ...props }: WrapWidgetDetailsProps) => {
  const { t } = useLocaleTranslation()
  const [token1, token2] = tokens

  return (
    <Container {...props}>
      <Info>
        <div>
          <Image src={token1.icon} width={30} height={30} alt={token1.symbol} />
        </div>
        <Token>
          <header>
            <h4>{t('available')}</h4>
          </header>
          <div>
            {/* <span className='primary'>{formatNumberByLocale(truncateWei(ethBalance, 6), locale)}</span> */}
            <span className='primary'>{token1.symbol}</span>
          </div>
        </Token>
      </Info>
      <Info>
        <Token>
          <header>
            <h4>{t(isUnwraping ? 'unwrapped' : 'wrapped')}</h4>
          </header>
          <div>
            {/* <span className='purple'>
                    {formatNumberByLocale(truncateWei(BigInt(delegationBalance), 6), locale)}
                  </span> */}
            <span className='purple'>{token2.symbol}</span>
          </div>
        </Token>
        <div>
          <Image src={token2.icon} width={30} height={30} alt={token2.symbol} />
        </div>
      </Info>
    </Container>
  )
}

const { Container, Info, Token } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    border-radius: 8px;
    gap: ${({ theme }) => theme.size[16]};
    height: 32px;

    > div:nth-child(2) {
      justify-content: flex-end;
      header {
        justify-content: flex-end;
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      gap: ${({ theme }) => theme.size[24]};
    }
  `,
  Info: styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};
    height: 32px;

    img {
      box-shadow: ${({ theme }) => theme.shadow[300]};
      border-radius: 100%;
    }

    > div {
      display: grid;
      align-items: center;
      justify-content: flex-start;
      height: 32px;

      > div {
        display: flex;
        justify-content: flex-start;
        align-self: flex-start;
      }
    }
  `,
  Token: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[4]};

    > header {
      display: flex;

      gap: ${({ theme }) => theme.size[4]};
      > h4 {
        font-size: ${({ theme }) => theme.font.size[12]};
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }
    }
    > div {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      span {
        font-size: ${({ theme }) => theme.font.size[14]};

        font-weight: 500;
        color: ${({ theme }) => theme.colorV2.gray[1]};

        &.primary {
          color: ${({ theme }) => theme.colorV2.blue[3]};
        }

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }

        &.negative {
          color: ${({ theme }) => theme.color.red[500]};
        }

        &.positive {
          color: ${({ theme }) => theme.color.green[500]};
        }
      }
    }
  `
}

export default WrapWidgetDetails
