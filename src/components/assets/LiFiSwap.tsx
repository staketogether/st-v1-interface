import { LiFiWidget, WidgetConfig } from '@lifi/widget'
import { chainConfigs } from '@/config/chain'
import { Asset } from '@/types/Asset'
import { useRouter } from 'next/router'

export const LiFiSwap = ({ asset }: { asset: Asset }) => {
  const { locale } = useRouter()
  const widgetConfig: WidgetConfig = {
    chains: { allow: chainConfigs.map(chain => chain.chainId) },
    useRecommendedRoute: true,
    languages: {
      default: locale === 'pt' ? 'pt' : 'en',
    },
    variant: 'compact',
    hiddenUI: ['poweredBy', 'appearance', 'walletMenu', 'history', 'language', 'drawerCloseButton'],
    disabledUI: ['fromToken'],
    subvariant: 'default',
    appearance: 'light',
    fromToken: asset.symbol,
    fromChain: asset.chains[0],
    theme: {
      components: {
        MuiInputCard: {},
        MuiCard: {
          styleOverrides: {
            root: {
              fontSize: '14px',
            }
          }
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              display: 'none'
            }
          }
        },
      },
      container: {
        boxShadow: '0',
        borderRadius: '16px',
      },
      palette: {
        primary: {
          main: '#373b8a'
        },
        secondary: {
          main: '#774bc7'
        },
        background: {
          default: '#ffffff',
          paper: '#ffffff'
        },
        text: {
          primary: '#a0a8ab',
          secondary: '#404a57'
        },
        grey: {
          200: '#e2e8f0',
          300: '#cbd5e0',
          700: '#2d3748',
          800: '#1a202c'
        }
      },
      typography: {
        fontFamily: 'Inter, sans-serif'
      },
      shape: {
        borderRadius: 8,
        borderRadiusSecondary: 8
      }
    },
    walletConfig: {
      async onConnect() {
        console.log('connected')
      }
    }
  }

  return (
    <LiFiWidget
      config={widgetConfig}
      integrator="stake_together"
    />
  );
};