import { chainConfigs } from '@/config/chain'
// eslint-disable-next-line import/named
import { LiFiWidget, WidgetConfig } from '@lifi/widget'
import { useRouter } from 'next/router'
import { Asset } from '@/types/Asset'

export const LiFiSwap = ({ asset, chainId }: { asset?: Asset, chainId: number }) => {
  const { locale } = useRouter()
  const widgetConfig: WidgetConfig = {
    chains: { allow: chainConfigs.map(chain => chain.chainId) },
    useRecommendedRoute: true,
    languages: {
      default: locale === 'pt' ? 'pt' : 'en'
    },
    variant: 'compact',
    hiddenUI: ['poweredBy', 'appearance', 'walletMenu', 'history', 'language', 'drawerCloseButton'],
    disabledUI: ['fromToken'],
    subvariant: 'default',
    appearance: 'light',
    fromToken: asset?.symbol,
    fromChain: chainId,
    theme: {
      components: {
        MuiInputCard: {},
        MuiCard: {
          styleOverrides: {
            root: {
              fontSize: '14px',
              border: '1px solid #A0A5AB !important'
            }
          }
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              display: 'none'
            }
          }
        }
      },
      container: {
        boxShadow: '0',
        borderRadius: '16px'
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
    integrator: 'stake_together'
  }

  return <LiFiWidget config={widgetConfig} integrator='stake_together' />
}
