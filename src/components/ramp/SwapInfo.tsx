import { quoteVar } from '@/hooks/ramp/useRampControlModal'
import { Asset } from '@/types/Asset'
import { useReactiveVar } from '@apollo/client'
import brla from '@assets/images/BRLA.svg'
import Image from 'next/image'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import { truncateDecimal } from '@/services/truncate'

interface SwapInfoProps {
  asset: Asset
  type: 'buy' | 'sell' | 'swap'
}

export default function SwapInfo({ asset, type }: SwapInfoProps) {
  const quote = useReactiveVar(quoteVar)

  const [first, second] = [
    <SwapToken key='brla'>
      <div>
        <Image src={brla} width={16} height={16} alt='brla' />
        <span>BRLA</span>
      </div>
      <span>{quote?.amountBrl}</span>
    </SwapToken>,
    <SwapToken key={asset.symbol}>
      <div>
        <AssetIcon image={asset.symbolImage} chain={asset.chains[0]} size={16} altName={asset.symbol} />
        <span>{asset.symbol}</span>
      </div>
      <span>{truncateDecimal(quote?.amountToken ?? '0', 6)}</span>
    </SwapToken>
  ]
  return (
    <Container>
      {type === 'buy' ? first : second}
      <PiArrowRight size={24} />
      {type === 'sell' ? first : second}
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
    > div:nth-child(3) {
      margin: 0 0 0 auto;
      > div {
        justify-content: right;
      }
    }
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
    }
  `
}
