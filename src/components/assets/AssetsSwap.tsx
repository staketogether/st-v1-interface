import { Asset } from '@/types/Asset'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import BitcoinRunesSwap from '@/components/assets/BitcoinRunesSwap'

export function AssetsSwap({ asset }: { asset: Asset }) {
  const LiFiSwap = dynamic(() => import('./LiFiSwap').then(module => module.LiFiSwap), {
    ssr: false
  })

  return (
    <SwapContainer>
      { asset.type === 'bitcoin-runes' && <BitcoinRunesSwap asset={asset} /> }
      { !asset.type.includes('bitcoin') && <LiFiSwap asset={asset} /> }
    </SwapContainer>
  )
}

const { SwapContainer } = {
  SwapContainer: styled.div`
      // Necessary to avoid the widget from being too narrow
      margin: 0 -24px;

      div {
          &.MuiBox-root {
              height: auto;
          }
      }
  `
}
