interface GlobalConfig {
  url: string
  fee: {
    protocol: bigint
  }
}

export const globalConfig: GlobalConfig = {
  url: 'https://alpha.staketogether.app',
  fee: {
    protocol: 90000000000000000n
  }
}
