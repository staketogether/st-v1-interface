import { Widget } from "@rango-dev/widget-embedded";
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";
import { globalConfig } from "@/config/global";

export default function RangoWidget() {
  const config = {
    apiKey: globalConfig.rango.apiKey,
    walletConnectProjectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT}`,
    affiliate: {
      ref: globalConfig.rango.affiliateRef,
      percent: globalConfig.rango.affiliatePercentage
    },
    theme: {
      singleTheme: true,
      mode: "light",
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
      secondaryBorderRadius: 8,
    }
  }

  return <NoSSR>
    <Widget config={config}/>
  </NoSSR>

}
