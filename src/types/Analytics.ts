export interface AnalyticsData {
  totalValueLocked: number
  totalValueLockedUSD: string
  accountsCount: number
  totalRewards: number
  totalRewardsUSD: number
  contractBalance: number
  contractBalanceUSD: number
  depositsCount: number
  totalDeposited: number
  totalDepositedUSD: number
  poolsCount: number
  totalPoolRewards: number
  validatorsCount: number
  validatorsAmountTotal: number
  validatorsAmountTotalUSD: number
  validatorMeanPerformance: number
  withdrawalsCount: number
}

export interface ValidatorsData {
  validatorindex: number
  attestationEfficiency: number
  effectivenessPercentage: number
  publicKey: string
  balance: number
}

export interface StakeTogetherAnalytics {
  stakeTogether: AnalyticsData
  validators: ValidatorsData[]
}

export interface Analytics {
  analytics: StakeTogetherAnalytics
}
