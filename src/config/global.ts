import { BigNumber, utils } from 'ethers'

export interface GlobalConfig {
  fee: {
    account: BigNumber
    protocol: BigNumber
  }
}

export const globalConfig = {
  fee: {
    delegation: utils.parseEther('0.03'),
    protocol: utils.parseEther('0.03'),
    operator: utils.parseEther('0.03')
  }
}
