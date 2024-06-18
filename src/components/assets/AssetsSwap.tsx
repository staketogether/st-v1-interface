import { Asset } from '@/types/Asset'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import BitcoinSwap from '@/components/assets/BitcoinSwap'

export function AssetsSwap({ asset }: { asset: Asset }) {
  const LiFiSwap = dynamic(() => import('./LiFiSwap').then(module => module.LiFiSwap), {
    ssr: false
  })

  return (
    <SwapContainer>
      { asset.type === 'bitcoin' && <BitcoinSwap asset={asset} /> }
      { asset.type !== 'bitcoin' && <LiFiSwap asset={asset} /> }
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
