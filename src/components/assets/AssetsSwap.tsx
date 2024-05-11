import { Asset } from '@/types/Asset'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

export function AssetsSwap({ asset }: { asset: Asset }) {
  const LiFiWidgetNext = dynamic(
    () => import('./LiFiSwap').then((module) => module.LiFiSwap),
    {
      ssr: false,
    },
  );

  return (
    <SwapContainer>
      <LiFiWidgetNext asset={asset} />
    </SwapContainer>
  )
}

const { SwapContainer } = {
  SwapContainer: styled.div`
    // Necessary to avoid the widget from being too narrow
    margin: 0 -24px;
  `,
}