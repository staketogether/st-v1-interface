import { ProductAsset, ProductAssetName } from '@/types/ProductAsset'

export const productAssetList: ProductAsset[] = [
  {
    id: 1,
    name: 'btc',
    title: 'TESTAR TITULO',
    description: 'btc',
    symbol: 'wBTC',
    networkAvailable: 'optimism',
    chainIdNetworkAvailable: 10,
    newProductTag: true,
    apy: 0,
    scan: 'https://optimistic.etherscan.io/',
    rampEnabled: true,
    ramp: {
      chainId: 10,
      minDeposit: 1
    },
    enabled: true,
    urlRedirect: '/currency/optimism/product/asset/btc',
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
    transactionConfig: {
      blockTimePerSeconds: 15,
      confirmations: 2
    }
  },
  {
    id: 1,
    name: 'eth',
    title: 'TESTAR TITULO',
    description: 'eth',
    symbol: 'ETH',
    networkAvailable: 'optimism',
    chainIdNetworkAvailable: 10,
    newProductTag: true,
    apy: 0,
    scan: 'https://optimistic.etherscan.io/',
    rampEnabled: true,
    ramp: {
      chainId: 10,
      minDeposit: 1
    },
    enabled: true,
    urlRedirect: '/currency/optimism/product/eth',
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
    transactionConfig: {
      blockTimePerSeconds: 15,
      confirmations: 2
    }
  }
]

export function getProductByName({ productName }: { productName: ProductAssetName }): ProductAsset {
  return productAssetList.find(product => product.name === productName) || productAssetList[0]
}
