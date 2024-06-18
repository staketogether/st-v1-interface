import { Asset, AssetCategory, BitcoinAsset, Erc20Asset, EvmAsset, FanTokenAsset, NativeAsset } from '@/types/Asset'
import aaveIcon from '@assets/assets/aave.png'
import arbIcon from '@assets/assets/arbitrum.svg'
import bahiaIcon from '@assets/assets/bahia.png'
import btcIcon from '@assets/assets/bitcoin.svg'
import brlaIcon from '@assets/assets/brla.png'
import chainlinkIcon from '@assets/assets/chainlink.png'
import chzIcon from '@assets/assets/chiliz.svg'
import ethIcon from '@assets/assets/ethereum.svg'
import eurtIcon from '@assets/assets/eurt.png'
import fluIcon from '@assets/assets/flu.png'
import galoIcon from '@assets/assets/galo.png'
import mengoChzIcon from '@assets/assets/mengo.png'
import opIcon from '@assets/assets/optimism.svg'
import pendleIcon from '@assets/assets/pendle.png'
import maticIcon from '@assets/assets/polygon.svg'
import renderIcon from '@assets/assets/render.png'
import saciIcon from '@assets/assets/saci.png'
import solanaIcon from '@assets/assets/solana.png'
import spfcIcon from '@assets/assets/spfc.png'
import ssvIcon from '@assets/assets/ssv.png'
import stpEthIcon from '@assets/assets/stp-eth.svg'
import strEthIcon from '@assets/assets/str-eth.svg'
import theGraphIcon from '@assets/assets/thegraph.png'
import thorchainIcon from '@assets/assets/thorchain.png'
import uniswapIcon from '@assets/assets/uniswap.png'
import usdcIcon from '@assets/assets/usdc.png'
import usdtIcon from '@assets/assets/usdt.png'
import vascoIcon from '@assets/assets/vasco.png'
import verdaoIcon from '@assets/assets/verdao.png'
import worldcoinIcon from '@assets/assets/worldcoin.png'
import xautIcon from '@assets/assets/xaut.png'
import zkIcon from '@assets/assets/zk.webp'
import dogIcon from '@assets/assets/dog.webp'
import { Chain } from '../chain'

export const ethMainnet: NativeAsset = {
  id: 'eth-mainnet',
  name: 'Ethereum',
  order: 0,
  decimals: 18,
  symbol: 'ETH',
  isTestnet: false,
  contractAddress: '0x0000000000000000000000000000000000000000',
  type: 'native',
  wrapperContractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  symbolImage: ethIcon,
  url: '/currency/ethereum/product/assets/eth-mainnet',
  category: AssetCategory.Infrastructure,
  chains: [Chain.ETH_MAINNET],
  localeDescription: 'eth',
  listed: false,
  enabled: true,
  new: false,
  points: {
    stPoints: false,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300,
      provider: 'brla',
      paymentMethod: 'pix'
    }
  ]
}

export const ethOp: NativeAsset = {
  id: 'eth-op',
  name: 'Ethereum',
  decimals: 18,
  order: 3,
  symbol: 'ETH',
  contractAddress: '0x0000000000000000000000000000000000000000',
  type: 'native',
  wrapperContractAddress: '0x4200000000000000000000000000000000000006',
  symbolImage: ethIcon,
  localeDescription: 'eth',
  isTestnet: false,
  url: '/currency/optimism/product/assets/eth-op',
  category: AssetCategory.Infrastructure,
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: false,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'ETH'
      }
    }
  ]
}

export const btcBtc: BitcoinAsset = {
  id: 'btc-btc',
  assetId: 'bitcoin',
  name: 'Bitcoin',
  order: -2,
  decimals: 8,
  symbol: 'BTC',
  symbolImage: btcIcon,
  isTestnet: false,
  url: '/currency/bitcoin/product/assets/btc-btc',
  type: 'bitcoin',
  category: AssetCategory.Infrastructure,
  localeDescription: 'btc',
  chains: [Chain.BTC_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: false,
    elPoints: false
  },
  disableActions: {
    swap: true
  },
  ramp: [
    {
      chainId: 0,
      minDeposit: 300,
      provider: 'transak',
      paymentMethod: 'pix'
    }
  ]
}

export const btcOp: Erc20Asset = {
  id: 'btc-op',
  name: 'Bitcoin',
  order: 4,
  decimals: 8,
  symbol: 'wBTC',
  symbolImage: btcIcon,
  isTestnet: false,
  url: '/currency/optimism/product/assets/btc-op',
  type: 'erc20',
  category: AssetCategory.Infrastructure,
  localeDescription: 'btc',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  contractAddress: '0x68f180fcce6836688e9084f035309e29bf0a2095',
  points: {
    stPoints: false,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'wbtc'
      }
    }
  ]
}

export const chilizChz: NativeAsset = {
  id: 'chz-chiliz',
  name: 'Chiliz',
  order: 5,
  symbol: 'CHZ',
  decimals: 18,
  symbolImage: chzIcon,
  isTestnet: false,
  contractAddress: '0x0000000000000000000000000000000000000000',
  type: 'native',
  wrapperContractAddress: '0x677F7e16C7Dd57be1D4C8aD1244883214953DC47',
  url: '/currency/chiliz/product/assets/chz-chiliz',
  category: AssetCategory.Infrastructure,
  localeDescription: 'chz',
  chains: [Chain.CHZ_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  disableActions: {
    swap: true
  },
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 88888,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix'
    }
  ]
}

export const opOptimism: Erc20Asset = {
  id: 'op-op',
  name: 'Optimism',
  order: 6,
  symbol: 'OP',
  symbolImage: opIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/optimism/product/assets/op-op',
  type: 'erc20',
  contractAddress: '0x4200000000000000000000000000000000000042',
  category: AssetCategory.Infrastructure,
  localeDescription: 'op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'OP'
      }
    }
  ]
}

export const ethArbitrum: NativeAsset = {
  id: 'eth-arb',
  order: 7,
  name: 'Ethereum',
  symbol: 'ETH',
  symbolImage: ethIcon,
  decimals: 18,
  isTestnet: false,
  type: 'native',
  wrapperContractAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  url: '/currency/arbitrum/product/assets/eth-arb',
  contractAddress: '0x0000000000000000000000000000000000000000',
  category: AssetCategory.Infrastructure,
  localeDescription: 'eth',
  chains: [Chain.ARB_MAINNET],
  listed: false,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 42161,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 42161,
        toToken: 'ETH'
      }
    }
  ]
}

export const arbArbitrum: Erc20Asset = {
  id: 'arb-arb',
  name: 'Arbitrum',
  order: 8,
  symbol: 'ARB',
  decimals: 18,
  symbolImage: arbIcon,
  isTestnet: false,
  type: 'erc20',
  url: '/currency/arbitrum/product/assets/arb-arb',
  contractAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
  category: AssetCategory.Infrastructure,
  localeDescription: 'arb',
  chains: [Chain.ARB_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 42161,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 42161,
        toToken: 'ARB'
      }
    }
  ]
}

export const maticPolygon: NativeAsset = {
  id: 'matic-matic',
  order: 9,
  name: 'Polygon',
  symbol: 'MATIC',
  decimals: 18,
  symbolImage: maticIcon,
  contractAddress: '0x0000000000000000000000000000000000000000',
  isTestnet: false,
  type: 'native',
  wrapperContractAddress: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  url: '/currency/polygon/product/assets/matic-matic',
  category: AssetCategory.Infrastructure,
  localeDescription: 'matic',
  chains: [Chain.POL_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 137,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 10
    }
  ]
}

const stpEth: Erc20Asset = {
  id: 'stp-eth',
  order: -1,
  name: 'Stake Togethe Ethereum',
  decimals: 18,
  symbol: 'stpETH',
  contractAddress: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
  type: 'erc20',
  symbolImage: stpEthIcon,
  url: '/currency/ethereum/product/assets/stp-eth',
  category: AssetCategory.Defi,
  chains: [Chain.ETH_MAINNET],
  listed: false,
  enabled: true,
  isTestnet: false,
  new: false,
  localeDescription: 'eth',
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 300
    }
  ]
}

const stpReth: Erc20Asset = {
  id: 'str-eth',
  name: 'Stake Together Restaked Ethereum',
  order: -2,
  symbol: 'strETH',
  decimals: 18,
  contractAddress: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
  type: 'erc20',
  symbolImage: strEthIcon,
  url: '/currency/ethereum/product/assets/stp-reth',
  category: AssetCategory.Defi,
  chains: [Chain.OP_MAINNET],
  listed: false,
  enabled: true,
  isTestnet: false,
  new: false,
  localeDescription: 'eth',
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 300
    }
  ]
}

export const mengoChz: FanTokenAsset = {
  chains: [Chain.CHZ_MAINNET],
  name: 'Flamengo Fan Token',
  decimals: 0,
  enabled: true,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'mengo-chz',
  order: 10,
  symbol: 'MENGO',
  symbolImage: mengoChzIcon,
  isTestnet: false,
  contractAddress: '0xD1723Eb9e7C6eE7c7e2d421B2758dc0f2166eDDc',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/mengo-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'mengo-chz',
  disableActions: {
    swap: true
  }
}

export const galoChz: FanTokenAsset = {
  chains: [Chain.CHZ_MAINNET],
  name: 'Atlético Mineiro Fan Token',
  decimals: 0,
  enabled: true,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'galo-chz',
  order: 11,
  symbol: 'GALO',
  symbolImage: galoIcon,
  isTestnet: false,
  contractAddress: '0xe5274Eb169E0e3A60B9dC343F02BA940958e8683',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/galo-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'galo-chz',
  disableActions: {
    swap: true
  }
}

export const fluChz: FanTokenAsset = {
  chains: [Chain.CHZ_MAINNET],
  name: 'Fluminense Fan Token',
  decimals: 0,
  enabled: true,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'flu-chz',
  order: 12,
  symbol: 'FLU',
  symbolImage: fluIcon,
  isTestnet: false,
  contractAddress: '0x86930777d43605C40bA786F7802778ff5413eFaB',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/flu-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'flu-chz',
  disableActions: {
    swap: true
  }
}

export const vascoChz: FanTokenAsset = {
  chains: [Chain.CHZ_MAINNET],
  name: 'Vasco Fan Token',
  enabled: true,
  decimals: 0,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'vasco-chz',
  order: 13,
  symbol: 'VASCO',
  symbolImage: vascoIcon,
  isTestnet: false,
  contractAddress: '0x6d72034D7508D16988bf84638D51592A8c02887b',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/vasco-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'vasco-chz',
  disableActions: {
    swap: true
  }
}

export const verdaoChz: FanTokenAsset = {
  chains: [Chain.CHZ_MAINNET],
  name: 'Palmeiras Fan Token',
  decimals: 0,
  enabled: true,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'verdao-chz',
  order: 14,
  symbol: 'VERDAO',
  symbolImage: verdaoIcon,
  isTestnet: false,
  contractAddress: '0x971364Ec452958d4D65Ba8D508FAa226d7117279',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/verdao-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'verdao-chz',
  disableActions: {
    swap: true
  }
}

export const saciChz: FanTokenAsset = {
  name: 'Internacional Fan Token',
  chains: [Chain.CHZ_MAINNET],
  decimals: 0,
  enabled: true,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'saci-chz',
  order: 15,
  symbol: 'SACI',
  symbolImage: saciIcon,
  isTestnet: false,
  contractAddress: '0x3175e779b42D35e2C9EeafadCf5B6E6ec6E4f910',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/saci-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'saci-chz',
  disableActions: {
    swap: true
  }
}

export const spfcChz: FanTokenAsset = {
  name: 'São Paulo Fan Token',
  chains: [Chain.CHZ_MAINNET],
  decimals: 0,
  enabled: true,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'spfc-chz',
  order: 16,
  symbol: 'SPFC',
  symbolImage: spfcIcon,
  isTestnet: false,
  contractAddress: '0x540165b9dFdDE31658F9BA0Ca5504EdA448BFfd0',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/spfc-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'spfc-chz',
  disableActions: {
    swap: true
  }
}

export const bahiaChz: FanTokenAsset = {
  chains: [Chain.CHZ_MAINNET],
  name: 'Bahia Fan Token',
  decimals: 0,
  enabled: true,
  listed: true,
  new: false,
  points: { elPoints: false, stPoints: true },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 1
    }
  ],
  id: 'bahia-chz',
  order: 17,
  symbol: 'BAHIA',
  symbolImage: bahiaIcon,
  isTestnet: false,
  contractAddress: '0xE92e152fC0ff1368739670a5175175154Ceeef42',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/bahia-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'bahia-chz'
}

export const pendleArb: Erc20Asset = {
  id: 'pendle-arb',
  name: 'Pendle',
  order: 18,
  symbol: 'PENDLE',
  symbolImage: pendleIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/arbitrum/product/assets/pendle-arb',
  type: 'erc20',
  contractAddress: '0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8',
  category: AssetCategory.Defi,
  localeDescription: 'pendle-arb',
  chains: [Chain.ARB_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 42161,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 42161,
        toToken: 'PENDLE'
      }
    }
  ]
}

export const chainlinkOp: Erc20Asset = {
  id: 'chainlink-op',
  name: 'Chainlink',
  order: 19,
  symbol: 'LINK',
  symbolImage: chainlinkIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/optimism/product/assets/chainlink-op',
  type: 'erc20',
  contractAddress: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
  category: AssetCategory.Defi,
  localeDescription: 'chainlink-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'LINK'
      }
    }
  ]
}

export const renderArb: Erc20Asset = {
  id: 'render-arb',
  name: 'Render Network',
  order: 20,
  symbol: 'RNDR',
  symbolImage: renderIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/arbitrum/product/assets/render-arb',
  type: 'erc20',
  contractAddress: '0xC8a4EeA31E9B6b61c406DF013DD4FEc76f21E279',
  category: AssetCategory.Defi,
  localeDescription: 'render-arb',
  chains: [Chain.ARB_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 42161,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 42161,
        toToken: 'RNDR'
      }
    }
  ]
}

export const spicyChiliz: NativeAsset = {
  id: 'chz-chiliz',
  name: 'Chiliz',
  order: -3,
  symbol: 'CHZ',
  decimals: 18,
  symbolImage: chzIcon,
  contractAddress: '0x0000000000000000000000000000000000000000',
  type: 'native',
  wrapperContractAddress: '0x678c34581db0a7808d0aC669d7025f1408C9a3C6',
  url: '/currency/chiliz/product/assets/chz-chiliz',
  new: false,
  enabled: true,
  category: AssetCategory.Infrastructure,
  listed: false,
  isTestnet: true,
  chains: [Chain.CHZ_TESTNET],
  points: {
    stPoints: true,
    elPoints: false
  },
  localeDescription: 'chz-chiliz',
  disableActions: {
    swap: true,
    buy: false,
    receive: false,
    sell: true,
    send: false
  },
  ramp: [
    {
      chainId: 88888,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 10
    }
  ]
}

export const thegraphArb: Erc20Asset = {
  id: 'thegraph-arb',
  order: 21,
  name: 'The Graph',
  symbol: 'GRT',
  symbolImage: theGraphIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/arbitrum/product/assets/thegraph-arb',
  type: 'erc20',
  contractAddress: '0x9623063377AD1B27544C965cCd7342f7EA7e88C7',
  category: AssetCategory.Defi,
  localeDescription: 'thegraph-arb',
  chains: [Chain.ARB_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 42161,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 42161,
        toToken: 'GRT'
      }
    }
  ]
}

export const worldcoinOp: Erc20Asset = {
  id: 'worldcoin-op',
  order: 22,
  name: 'Worldcoin',
  symbol: 'WORLD',
  symbolImage: worldcoinIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/optimism/product/assets/worldcoin-op',
  type: 'erc20',
  contractAddress: '0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1',
  category: AssetCategory.Defi,
  localeDescription: 'worldcoin-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'WORLD'
      }
    }
  ],
  disableActions: {
    swap: true
  }
}

export const aaveOp: Erc20Asset = {
  id: 'aave-op',
  order: 23,
  symbol: 'AAVE',
  name: 'Aave',
  symbolImage: aaveIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/optimism/product/assets/aave-op',
  type: 'erc20',
  contractAddress: '0x76FB31fb4af56892A25e32cFC43De717950c9278',
  category: AssetCategory.Defi,
  localeDescription: 'aave-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'AAVE'
      }
    }
  ]
}

export const uniswapOp: Erc20Asset = {
  id: 'uniswap-op',
  order: 20,
  name: 'Uniswap',
  symbol: 'UNI',
  symbolImage: uniswapIcon,
  decimals: 24,
  isTestnet: false,
  url: '/currency/optimism/product/assets/uniswap-op',
  type: 'erc20',
  contractAddress: '0x6fd9d7AD17242c41f7131d257212c54A0e816691',
  category: AssetCategory.Defi,
  localeDescription: 'uniswap-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'UNI'
      }
    }
  ]
}

export const ssvEth: Erc20Asset = {
  id: 'ssv-eth',
  order: 25,
  symbol: 'SSV',
  name: 'SSV Network',
  symbolImage: ssvIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/ethereum/product/assets/ssv-eth',
  type: 'erc20',
  contractAddress: '0x9D65fF81a3c488d585bBfb0Bfe3c7707c7917f54',
  category: AssetCategory.Defi,
  localeDescription: 'ssv-eth',
  chains: [Chain.ETH_MAINNET],
  listed: false,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300,
      provider: 'brla',
      paymentMethod: 'pix'
    }
  ]
}

export const usdcOp: Erc20Asset = {
  id: 'usdc-op',
  order: 26,
  symbol: 'USDC',
  name: 'USD Coin',
  symbolImage: usdcIcon,
  decimals: 6,
  isTestnet: false,
  url: '/currency/optimism/product/assets/usdc-op',
  type: 'erc20',
  contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  category: AssetCategory.Stable,
  localeDescription: 'usdc-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'USDC'
      }
    }
  ]
}

export const usdtOp: Erc20Asset = {
  id: 'usdt-op',
  name: 'Tether USD',
  order: 27,
  symbol: 'USDT',
  symbolImage: usdtIcon,
  decimals: 6,
  isTestnet: false,
  url: '/currency/optimism/product/assets/usdt-op',
  type: 'erc20',
  contractAddress: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  category: AssetCategory.Stable,
  localeDescription: 'usdt-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'USDT'
      }
    }
  ]
}

export const brlaMatic: Erc20Asset = {
  id: 'brla-matic',
  order: 28,
  name: 'BRLA',
  symbol: 'BRLA',
  symbolImage: brlaIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/polygon/product/assets/brla-matic',
  type: 'erc20',
  contractAddress: '0xe6a537a407488807f0bbeb0038b79004f19dddfb',
  category: AssetCategory.Stable,
  localeDescription: 'brla-matic',
  chains: [Chain.POL_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 137,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 10
    }
  ],
  disableActions: {
    swap: true
  }
}

export const eurtOp: Erc20Asset = {
  id: 'eurt-op',
  order: 29,
  name: 'Tether EUR',
  symbol: 'EURT',
  symbolImage: eurtIcon,
  decimals: 6,
  isTestnet: false,
  url: '/currency/optimism/product/assets/eurt-op',
  type: 'erc20',
  contractAddress: '0x7BDF330f423Ea880FF95fC41A280fD5eCFD3D09f',
  category: AssetCategory.Stable,
  localeDescription: 'eurt-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 10,
      minDeposit: 10,
      provider: 'brla',
      paymentMethod: 'pix',
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toChainId: 10,
        toToken: 'EURT'
      }
    }
  ]
}

export const goldtOp: Erc20Asset = {
  id: 'goldt-op',
  order: 30,
  name: 'Tether Gold',
  symbol: 'XAUT',
  symbolImage: xautIcon,
  decimals: 6,
  isTestnet: false,
  url: '/currency/optimism/product/assets/goldt-op',
  type: 'erc20',
  contractAddress: '0x68749665FF8D2d112Fa859AA293F07A622782F38',
  category: AssetCategory.Stable,
  localeDescription: 'goldt-op',
  chains: [Chain.ETH_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300,
      provider: 'brla',
      paymentMethod: 'pix'
    }
  ]
}

export const solanaEth: Erc20Asset = {
  id: 'solana-eth',
  order: 31,
  symbol: 'WSOL',
  name: 'Solana',
  symbolImage: solanaIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/ethereum/product/assets/solana-eth',
  type: 'erc20',
  contractAddress: '0xD31a59c85aE9D8edEFeC411D448f90841571b89c',
  category: AssetCategory.Infrastructure,
  localeDescription: 'solana-eth',
  chains: [Chain.ETH_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300,
      provider: 'brla',
      paymentMethod: 'pix'
    }
  ],
  disableActions: {
    swap: true
  }
}

export const thorchainEth: Erc20Asset = {
  id: 'thorchain-eth',
  order: 32,
  symbol: 'RUNE',
  name: 'Thorchain',
  symbolImage: thorchainIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/ethereum/product/assets/thorchain-eth',
  type: 'erc20',
  contractAddress: '0x3155BA85D5F96b2d030a4966AF206230e46849cb',
  category: AssetCategory.Infrastructure,
  localeDescription: 'thorchain-eth',
  chains: [Chain.ETH_MAINNET],
  listed: true,
  enabled: true,
  new: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 1,
      minDeposit: 300,
      provider: 'brla',
      paymentMethod: 'pix'
    }
  ]
}

export const zkSyncZK: Erc20Asset = {
  id: 'zk-zksync',
  order: 1,
  symbol: 'ZK',
  name: 'ZKSync',
  symbolImage: zkIcon,
  decimals: 6,
  isTestnet: false,
  url: '/currency/era/product/assets/zk-zksync',
  type: 'erc20',
  contractAddress: '0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E',
  category: AssetCategory.Infrastructure,
  localeDescription: 'zk-zksync',
  chains: [Chain.ZKSYNC_MAINNET],
  listed: true,
  enabled: true,
  new: true,
  points: {
    stPoints: true,
    elPoints: false
  },
  ramp: [
    {
      chainId: 324,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toToken: 'ZK',
        toChainId: 324
      }
    }
  ]
}

export const zkSyncETH: NativeAsset = {
  id: 'eth-zksync',
  name: 'Ethereum',
  order: 0,
  symbol: 'ETH',
  decimals: 18,
  symbolImage: ethIcon,
  contractAddress: '0x0000000000000000000000000000000000000000',
  type: 'native',
  wrapperContractAddress: '0x678c34581db0a7808d0aC669d7025f1408C9a3C6',
  url: '/currency/era/product/assets/eth-zksync',
  new: true,
  enabled: true,
  category: AssetCategory.Infrastructure,
  listed: true,
  isTestnet: false,
  chains: [Chain.ZKSYNC_MAINNET],
  points: {
    stPoints: true,
    elPoints: false
  },
  localeDescription: 'eth-zksync',
  ramp: [
    {
      chainId: 324,
      provider: 'brla',
      paymentMethod: 'pix',
      minDeposit: 10,
      bridge: {
        fromChainId: 137,
        fromToken: 'MATIC',
        toToken: 'ETH',
        toChainId: 324
      }
    }
  ]
}

export const dogBtc: BitcoinAsset = {
  localeDescription: 'dog-btc',
  assetId: 'dog-go-to-the-moon-rune',
  points: { elPoints: false, stPoints: true },
  ramp: [{
    chainId: 0,
    paymentMethod: 'pix',
    provider: 'transak',
    minDeposit: 300
  }],
  disableActions: {
    buy: true,
    sell: true,
    send: true,
    receive: true,
  },
  type: 'bitcoin',
  id: 'dog-btc',
  new: true,
  name: 'DOG•GO•TO•THE•MOON',
  symbol: 'DOG',
  chains: [Chain.BTC_MAINNET],
  listed: true,
  enabled: true,
  decimals: 0,
  url: '/currency/bitcoin/product/assets/dog-btc/swap',
  symbolImage: dogIcon,
  order: -1,
  category: AssetCategory.Defi,
  isTestnet: false
}

export const assetsList: Asset[] = [
  ethMainnet,
  ethOp,
  btcOp,
  chilizChz,
  opOptimism,
  maticPolygon,
  arbArbitrum,
  ethArbitrum,
  stpEth,
  stpReth,
  mengoChz,
  galoChz,
  fluChz,
  vascoChz,
  verdaoChz,
  saciChz,
  spfcChz,
  bahiaChz,
  pendleArb,
  thegraphArb,
  worldcoinOp,
  aaveOp,
  uniswapOp,
  ssvEth,
  usdcOp,
  usdtOp,
  brlaMatic,
  goldtOp,
  solanaEth,
  chainlinkOp,
  renderArb,
  thorchainEth,
  spicyChiliz,
  zkSyncZK,
  zkSyncETH,
  btcBtc,
  dogBtc
]

export function getListedAssets(): Asset[] {
  return assetsList.filter(asset => asset.listed).sort((a, b) => a.order - b.order)
}

export function getAssetsByCategory(category: AssetCategory): Asset[] {
  return assetsList
    .filter(asset => asset.category === category)
    .filter(asset => asset.listed)
    .sort((a, b) => a.order - b.order)
}

export function getEvmAssetById(id: string): EvmAsset {
  const asset = assetsList.filter(asset => asset.type !== 'bitcoin').find(assetItem => assetItem.id === id)

  if (!asset) {
    throw new Error(`Asset with id ${id} not found`)
  }

  return asset as EvmAsset
}
