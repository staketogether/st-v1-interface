import { Asset } from '@/types/Asset'
import dynamic from 'next/dynamic'

export function AssetsSwap({ asset }: { asset: Asset }) {
  const LiFiWidgetNext = dynamic(
    () => import('./LiFiSwap').then((module) => module.LiFiSwap),
    {
      ssr: false,
    },
  );

  return (
    <LiFiWidgetNext asset={asset} />
  )
}
