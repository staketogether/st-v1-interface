import { quoteVar } from '@/hooks/ramp/useControlModal'
import { ProductAsset } from '@/types/ProductAsset'
import { useReactiveVar } from '@apollo/client'
import brla from '@assets/images/BRLA.svg'
import Image from 'next/image'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'

interface SwapInfoProps {
  product: ProductAsset
}

export default function SwapInfo({ product }: SwapInfoProps) {
  const quote = useReactiveVar(quoteVar)
  return (
    <Container>
      <SwapToken>
        <div>
          <Image src={brla} width={16} height={16} alt='brla' />
          <span>BRLA</span>
        </div>
        <span>{quote?.amountBrl}</span>
      </SwapToken>
      <PiArrowRight size={24} />
      <SwapToken className='left'>
        <div>
          <AssetIcon image={product.symbol} chain={product.networkAvailable} size={16} />
          <span>{product.symbol}</span>
        </div>
        <span>{quote?.amountToken}</span>
      </SwapToken>
    </Container>
  )
}

const { Container, SwapToken } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 30px 1fr;
    align-items: center;
    height: 66px;
    border-radius: 8px;
    gap: 8px;
    background: ${({ theme }) => theme.colorV2.gray[2]};
  `,
  SwapToken: styled.div`
    padding: 8px 16px;
    > div {
      display: flex;
      flex-direction: row;
      gap: ${({ theme }) => theme.size[8]};
      align-items: center;
      > span {
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
    > span {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
    &.left {
      margin: 0 0 0 auto;
      > div {
        justify-content: right;
      }
    }
  `
}
