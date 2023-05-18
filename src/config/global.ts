import { BigNumber, utils } from 'ethers'

export interface GlobalConfig {
  app: {
    name: string
  }
  fee: {
    account: BigNumber
    protocol: BigNumber
  }
  eth: {
    name: string
    symbol: string
  }
  ceth: {
    name: string
    symbol: string
  }
}

export const globalConfig = {
  app: {
    name: process.env.APP_NAME as string
  },
  fee: {
    delegation: utils.parseEther('0.03'),
    protocol: utils.parseEther('0.03'),
    operator: utils.parseEther('0.03')
  },
  eth: {
    name: 'Ether',
    symbol: 'ETH'
  },
  ceth: {
    name: 'Community Ether',
    symbol: 'CETH'
  }
}
