import chzIcon from '@assets/network/chiliz.svg'
import ethIcon from '@assets/network/ethereum.svg'
import restakingIcon from '@assets/assets/restaking.svg'
import { spicyChiliz, ethMainnet, ethOp } from '@/config/product/asset'
import { Staking } from '@/types/Staking'

export const ethStaking: Staking = {
  asset: ethMainnet,
  enabled: true,
  listed: false,
  new: false,
  id: 'eth-staking',
  order: 4,
  symbol: 'stpETH',
  symbolImage: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
  logoImage: ethIcon,
  isTestnet: false,
  points: {
    stPoints: true,
    elPoints: false
  },
  localeDescription: 'ethereumDescription',
  url: '/currency/ethereum/product/staking/eth-staking',
  apy: 5.7,
  contracts: {
    Airdrop: '0x0d6aa18d513dE2173Faf8618669Ec072d23aa0CE',
    Withdrawals: '0x1699D4fa4308cdbf4cc1EaAC9626D4b78842fa27',
    Router: '0x315BAc15CB13f77223900d970b507eCBBAA3c3C4',
    StakeTogether: '0x218dE5E6324c5351C3a2bf0c40d76f585B8dE04d',
    StakeTogetherWrapper: '0xB8cfc0BDdcE60b12b3E6aB9A885C498B2C1ee806'
  },
  stakeTogetherPool: '0x7d316ef9d95649fd2d8be426b01ff531c560379a',
  subgraph: 'https://api.studio.thegraph.com/query/60033/stake-together/version/latest'
}

export const ethRestaking: Staking = {
  id: 'eth-restaking',
  order: 5,
  symbol: 'strETH',
  symbolImage:
    'https://raw.githubusercontent.com/staketogether/st-v1-interface/faa3dcdbf60ea06f922c3c9dd1ed1d8f20fa1cbb/public/assets/stpRETHIcon.svg',
  logoImage: restakingIcon,
  url: '/currency/optimism/product/staking/eth-restaking',
  listed: true,
  isTestnet: false,
  enabled: true,
  new: true,
  apy: 5.7,
  points: {
    stPoints: true,
    elPoints: true
  },
  asset: ethOp,
  localeDescription: 'restakingDescription',
  contracts: {
    Airdrop: '0x9A967118f216eCE6B5853915691b96d28df19b4A',
    Withdrawals: '0xB01fD1CDd2fDfa3cC4955635776733A8abaad8F8',
    Router: '0x3B5f4719d701D905ab206C2255476bC37AfdcfdD',
    StakeTogether: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
    StakeTogetherWrapper: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508'
  },
  stakeTogetherPool: '0xE00553D4aEd5d90DaC7ebC7f763a7a61Fd28d508',
  subgraph: 'https://api.studio.thegraph.com/query/60033/stake-together-optimism/version/latest'
}

export const chzStaking: Staking = {
  id: 'chz-staking',
  order: 6,
  symbol: 'stpCHZ',
  symbolImage: 'https://raw.githubusercontent.com/staketogether/st-v1-interface/dev/public/assets/st-icon.png',
  logoImage: chzIcon,
  url: '/currency/chiliz-spicy/product/staking/chz-staking',
  listed: true,
  isTestnet: false,
  enabled: true,
  new: true,
  apy: 5.7,
  points: {
    stPoints: true,
    elPoints: false
  },
  asset: spicyChiliz,
  localeDescription: 'chilizStakingDescription',
  contracts: {
    Airdrop: '0xc3bE66C9dA5f669D104345a9C10064867265De09',
    Withdrawals: '0x5384cF13B2eB115B4fbd3F3c91a7Eab275Be5974',
    Router: '0x59270aC214141f3c879aFc4F6Eef2B2DAF8EB6E2',
    StakeTogether: '0x4B3098C2A9Bd72f0c6103d26FE8087563C7B3F4D',
    StakeTogetherWrapper: '0x4B3098C2A9Bd72f0c6103d26FE8087563C7B3F4D'
  },
  stakeTogetherPool: '0x4B3098C2A9Bd72f0c6103d26FE8087563C7B3F4D',
  subgraph: ''
}

export const stakingList: Staking[] = [ethStaking, ethRestaking, chzStaking]

export function getListedStaking() {
  return stakingList.filter(staking => staking.listed).sort((a, b) => a.order - b.order)
}

export function getStakingById(id: string): Staking {
  const staking = stakingList.find(s => s.id === id)

  if (!staking) {
    throw new Error(`Staking with id ${id} not found`)
  }

  return staking
}
