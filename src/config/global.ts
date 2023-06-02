import { BigNumber, utils } from 'ethers'

interface GlobalConfig {
  fee: {
    community: BigNumber
    protocol: BigNumber
    operator: BigNumber
  }
}

export const globalConfig: GlobalConfig = {
  fee: {
    community: utils.parseEther('0.03'),
    protocol: utils.parseEther('0.03'),
    operator: utils.parseEther('0.03')
  }
}
