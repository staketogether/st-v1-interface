import { ProductAsset, ProductAssetName } from '@/types/ProductAsset'

export const productAssetList: ProductAsset[] = [
  {
    id: 1,
    name: 'btc',
    title: 'TESTAR TITULO',
    description: 'btc',
    listed: true,
    contract: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    symbol: 'wBTC',
    networkAvailable: 'optimism',
    chainIdNetworkAvailable: 10,
    newProductTag: true,
    apy: 0,
    scan: 'https://optimistic.etherscan.io/',
    rampEnabled: true,
    ramp: {
      chainId: 10,
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'bitcoin'
      }
    },
    enabled: true,
    urlRedirect: '/currency/optimism/product/assets/btc',
    getMobulaAssetData: {
      asset: 'Bitcoin',
      blockchain: 'optimism',
      symbol: 'wbtc'
    },
    eventsTrack: {
      pageView: 'pageview-btc',
      checkout: 'initiateCheckout-btc',
      confirmation: 'confirmation-btc',
      success: 'success-btc',
      withdraw: 'withdraw-btc'
    },
    tradingView: {
      symbol: 'BTCUSD',
      fiat: {
        usd: 'BTCUSD',
        brl: 'BTCBRL',
        eur: 'BTCEUR'
      }
    }
  },
  {
    id: 1,
    name: 'eth-optimism',
    title: 'TESTAR TITULO',
    description: 'eth',
    listed: true,
    symbol: 'ETH',
    networkAvailable: 'optimism',
    chainIdNetworkAvailable: 10,
    newProductTag: true,
    apy: 0,
    scan: 'https://optimistic.etherscan.io/',
    rampEnabled: true,
    ramp: {
      chainId: 10,
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'ETH'
      }
    },
    enabled: true,
    urlRedirect: '/currency/optimism/product/assets/eth-optimism',
    getMobulaAssetData: {
      asset: 'Ethereum',
      blockchain: 'optimism',
      symbol: 'eth'
    },
    eventsTrack: {
      pageView: 'pageview-eth',
      checkout: 'initiateCheckout-eth',
      confirmation: 'confirmation-eth',
      success: 'success-eth',
      withdraw: 'withdraw-eth'
    },
    tradingView: {
      symbol: 'ETHUSD',
      fiat: {
        usd: 'ETHUSD',
        brl: 'ETHBRL',
        eur: 'ETHEUR'
      }
    }
  },
  {
    id: 1,
    name: 'eth',
    title: 'TESTAR TITULO',
    description: 'eth',
    listed: false,
    symbol: 'ETH',
    networkAvailable: 'optimism',
    chainIdNetworkAvailable: 1,
    newProductTag: true,
    apy: 0,
    scan: 'https://optimistic.etherscan.io/',
    rampEnabled: true,
    ramp: {
      chainId: 1,
      minDeposit: 300
    },
    enabled: true,
    urlRedirect: '/currency/optimism/product/assets/eth',
    getMobulaAssetData: {
      asset: 'Ethereum',
      blockchain: 'optimism',
      symbol: 'eth'
    },
    eventsTrack: {
      pageView: 'pageview-eth',
      checkout: 'initiateCheckout-eth',
      confirmation: 'confirmation-eth',
      success: 'success-eth',
      withdraw: 'withdraw-eth'
    },
    tradingView: {
      symbol: 'ETHUSD',
      fiat: {
        usd: 'ETHUSD',
        brl: 'ETHBRL',
        eur: 'ETHEUR'
      }
    }
  }
]

export function getProductAssetByName({ productName }: { productName: ProductAssetName }): ProductAsset {
  return productAssetList.find(product => product.name === productName) || productAssetList[0]
}
