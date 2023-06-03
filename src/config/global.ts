import { BigNumber, utils } from 'ethers'

interface GlobalConfig {
  fee: {
    protocol: BigNumber
  }
}

export const globalConfig: GlobalConfig = {
  fee: {
    protocol: utils.parseEther('0.09')
  }
}
