import { Asset, AssetCategory, Erc20Asset, FanTokenAsset, NativeAsset } from '@/types/Asset'
import arbIcon from '@assets/assets/arbitrum.svg'
import btcIcon from '@assets/assets/bitcoin.svg'
import chzIcon from '@assets/assets/chiliz.svg'
import ethIcon from '@assets/assets/ethereum.svg'
import opIcon from '@assets/assets/optimism.svg'
import maticIcon from '@assets/assets/polygon.svg'
import bahiaIcon from '@assets/assets/bahia.png'
import fluIcon from '@assets/assets/flu.png'
import galoIcon from '@assets/assets/galo.png'
import mengoChzIcon from '@assets/assets/mengo.png'
import saciIcon from '@assets/assets/saci.png'
import spfcIcon from '@assets/assets/spfc.png'
import pendleIcon from '@assets/assets/pendle.png'
import chainlinkIcon from '@assets/assets/chainlink.png'
import renderIcon from '@assets/assets/render.png'
import theGraphIcon from '@assets/assets/thegraph.png'
import worldcoinIcon from '@assets/assets/worldcoin.png'
import uniswapIcon from '@assets/assets/uniswap.png'
import ssvIcon from '@assets/assets/ssv.png'
import usdcIcon from '@assets/assets/usdc.png'
import usdtIcon from '@assets/assets/usdt.png'
import brlaIcon from '@assets/assets/brla.png'
import eurtIcon from '@assets/assets/eurt.png'
import xautIcon from '@assets/assets/xaut.png'
import solanaIcon from '@assets/assets/solana.png'
import thorchainIcon from '@assets/assets/thorchain.png'
import aaveIcon from '@assets/assets/aave.png'
import stpEthIcon from '@assets/assets/stp-eth.svg'
import strEthIcon from '@assets/assets/str-eth.svg'
import vascoIcon from '@assets/assets/vasco.png'
import verdaoIcon from '@assets/assets/verdao.png'
import { Chain } from '../chain'

export const ethMainnet: NativeAsset = {
  id: 'eth-mainnet',
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
  decimals: 18,
  order: 2,
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

export const btcOp: Erc20Asset = {
  id: 'btc-op',
  order: 1,
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
  order: 6,
  symbol: 'CHZ',
  decimals: 18,
  symbolImage: chzIcon,
  isTestnet: false,
  contractAddress: '0x0000000000000000000000000000000000000000',
  type: 'native',
  wrapperContractAddress: '0x721EF6871f1c4Efe730Dce047D40D1743B886946',
  url: '/currency/chiliz/product/assets/chz-chiliz',
  category: AssetCategory.Infrastructure,
  localeDescription: 'chz',
  chains: [Chain.CHZ_MAINNET],
  listed: true,
  enabled: true,
  new: false,
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
  order: 3,
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
  order: 4,
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
  order: 4,
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
  order: 5,
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
  order: 1,
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
  order: 2,
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
  order: 6,
  symbol: 'MENGO',
  symbolImage: mengoChzIcon,
  isTestnet: false,
  contractAddress: '0xD1723Eb9e7C6eE7c7e2d421B2758dc0f2166eDDc',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/mengo-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'mengo-chz'
}

export const galoChz: FanTokenAsset = {
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
  id: 'galo-chz',
  order: 7,
  symbol: 'GALO',
  symbolImage: galoIcon,
  isTestnet: false,
  contractAddress: '0xe5274Eb169E0e3A60B9dC343F02BA940958e8683',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/galo-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'galo-chz'
}

export const fluChz: FanTokenAsset = {
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
  id: 'flu-chz',
  order: 8,
  symbol: 'FLU',
  symbolImage: fluIcon,
  isTestnet: false,
  contractAddress: '0x86930777d43605C40bA786F7802778ff5413eFaB',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/flu-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'flu-chz'
}

export const vascoChz: FanTokenAsset = {
  chains: [Chain.CHZ_MAINNET],
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
  order: 9,
  symbol: 'VASCO',
  symbolImage: vascoIcon,
  isTestnet: false,
  contractAddress: '0x6d72034D7508D16988bf84638D51592A8c02887b',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/vasco-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'vasco-chz'
}

export const verdaoChz: FanTokenAsset = {
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
  id: 'verdao-chz',
  order: 10,
  symbol: 'VERDAO',
  symbolImage: verdaoIcon,
  isTestnet: false,
  contractAddress: '0x971364Ec452958d4D65Ba8D508FAa226d7117279',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/verdao-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'verdao-chz'
}

export const saciChz: FanTokenAsset = {
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
  order: 11,
  symbol: 'SACI',
  symbolImage: saciIcon,
  isTestnet: false,
  contractAddress: '0x3175e779b42D35e2C9EeafadCf5B6E6ec6E4f910',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/saci-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'saci-chz'
}

export const spfcChz: FanTokenAsset = {
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
  order: 12,
  symbol: 'SPFC',
  symbolImage: spfcIcon,
  isTestnet: false,
  contractAddress: '0x540165b9dFdDE31658F9BA0Ca5504EdA448BFfd0',
  type: 'fan-token',
  url: '/currency/chiliz/product/assets/spfc-chz',
  category: AssetCategory.FanToken,
  localeDescription: 'spfc-chz'
}

export const bahiaChz: FanTokenAsset = {
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
  id: 'bahia-chz',
  order: 13,
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
  order: 14,
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
  new: true,
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
  order: 15,
  symbol: 'LINK',
  symbolImage: chainlinkIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/optimism/product/assets/chainlink-op',
  type: 'erc20',
  contractAddress: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  category: AssetCategory.Defi,
  localeDescription: 'chainlink-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: true,
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
  order: 16,
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
  new: true,
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

export const thegraphArb: Erc20Asset = {
  id: 'thegraph-arb',
  order: 17,
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
  new: true,
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
  order: 18,
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
  new: true,
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
  ]
}

export const aaveOp: Erc20Asset = {
  id: 'aave-op',
  order: 19,
  symbol: 'AAVE',
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
  new: true,
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
  symbol: 'UNI',
  symbolImage: uniswapIcon,
  decimals: 18,
  isTestnet: false,
  url: '/currency/optimism/product/assets/uniswap-op',
  type: 'erc20',
  contractAddress: '0x6fd9d7AD17242c41f7131d257212c54A0e816691',
  category: AssetCategory.Defi,
  localeDescription: 'uniswap-op',
  chains: [Chain.OP_MAINNET],
  listed: true,
  enabled: true,
  new: true,
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
  order: 21,
  symbol: 'SSV',
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
  new: true,
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
  order: 22,
  symbol: 'USDC',
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
  new: true,
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
  order: 23,
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
  new: true,
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
  order: 24,
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
  new: true,
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

export const eurtOp: Erc20Asset = {
  id: 'eurt-op',
  order: 25,
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
  new: true,
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
  order: 26,
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
  new: true,
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
  order: 27,
  symbol: 'WSOL',
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
  new: true,
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

export const thorchainEth: Erc20Asset = {
  id: 'thorchain-eth',
  order: 28,
  symbol: 'RUNE',
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
  new: true,
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
  chainlinkOp,
  renderArb,
  thegraphArb,
  worldcoinOp,
  aaveOp,
  uniswapOp,
  ssvEth,
  usdcOp,
  usdtOp,
  brlaMatic,
  eurtOp,
  goldtOp,
  solanaEth,
  thorchainEth
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

export function getAssetById(id: string): Asset {
  const asset = assetsList.find(assetItem => assetItem.id === id)

  if (!asset) {
    throw new Error(`Asset with id ${id} not found`)
  }

  return asset
}
