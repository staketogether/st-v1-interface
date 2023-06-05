import { BigNumber, utils } from 'ethers'

interface GlobalConfig {
  url: string
  fee: {
    protocol: BigNumber
  }
}

export const globalConfig: GlobalConfig = {
  url: 'https://beta.staketogether.app',
  fee: {
    protocol: utils.parseEther('0.09')
  }
}
