import dynamic from 'next/dynamic'
import styled from 'styled-components'
import { Asset } from '@/types/Asset'

export function AssetsSwap({ asset, chainId }: { asset?: Asset, chainId: number }) {
  const LiFiWidgetNext = dynamic(() => import('./LiFiSwap').then(module => module.LiFiSwap), {
    ssr: false
  })

  return (
    <SwapContainer>
      <LiFiWidgetNext chainId={chainId} asset={asset} />
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
