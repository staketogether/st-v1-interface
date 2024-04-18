import { ProductAsset } from '@/types/ProductAsset'

export const ethOptimism: ProductAsset = {
  id: 1,
  name: 'eth-optimism',
  description: 'eth',
  listed: true,
  symbol: 'ETH',
  networkAvailable: 'optimism',
  chainIdNetworkAvailable: 10,
  newProductTag: true,
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

  mobula: {
    asset: 'Ethereum',
    blockchain: 'optimism',
    symbol: 'eth',
    filterCoinConversion: 'Ethereum-optimism'
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

export const ethMainnet: ProductAsset = {
  id: 2,
  name: 'eth',
  description: 'eth',
  listed: false,
  symbol: 'ETH',
  networkAvailable: 'ethereum',
  chainIdNetworkAvailable: 1,
  newProductTag: true,
  scan: 'https://optimistic.etherscan.io/',
  rampEnabled: true,
  ramp: {
    chainId: 1,
    minDeposit: 300
  },
  enabled: true,
  urlRedirect: '/currency/optimism/product/assets/eth',
  mobula: {
    asset: 'Ethereum',
    blockchain: 'ethereum',
    symbol: 'eth',
    filterCoinConversion: 'Ethereum-ethereum'
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

export const btcOptimism: ProductAsset = {
  id: 3,
  name: 'btc',
  description: 'btc',
  listed: true,
  contract: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
  symbol: 'wBTC',
  networkAvailable: 'optimism',
  chainIdNetworkAvailable: 10,
  newProductTag: true,
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
  mobula: {
    asset: 'Bitcoin',
    blockchain: 'optimism',
    symbol: 'wbtc',
    filterCoinConversion: 'Bitcoin-optimism'
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
}

export const productCryptoList: ProductAsset[] = [btcOptimism, ethOptimism, ethMainnet]

export function getCryptoAsset({ name }: { name: string }): ProductAsset {
  return productCryptoList.find(product => product.name === name) ?? productCryptoList[0]
}
