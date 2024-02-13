import { globalConfig } from "@/config/global";
import dynamic from 'next/dist/shared/lib/dynamic'
import { WidgetConfig } from '@rango-dev/widget-embedded'

const Widget = dynamic(() => import('@rango-dev/widget-embedded').then(module => module.Widget), {
  ssr: false
})

export default function RangoWidget() {
  const config: WidgetConfig = {
    apiKey: globalConfig.rango.apiKey,
    wallets: ['metamask',
      'trust-wallet',
      'keplr',
      'phantom'],
    affiliate: {
      ref: globalConfig.rango.affiliateRef,
      percent: globalConfig.rango.affiliatePercentage
    },
    theme: {
      singleTheme: true,
      mode: 'light',
      colors: {
        light: {
          primary: '#373B8A',
          secondary: '#774BC7',
          neutral: '#F3F3F3',
          background: '#FFFFFF',
          foreground: '#404A57',
          info: '#FFFFFF'
        }
      },
      borderRadius: 8,
      secondaryBorderRadius: 8
    }
  }

  return <Widget config={config} />
}
