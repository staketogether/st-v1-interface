import { gql } from '@apollo/client'

export const queryAnalytics = gql`
  query StakeTogetherAnalytics($chainId: Int!) {
    analytics(chainId: $chainId) {
      stakeTogether {
        totalValueLocked
        totalValueLockedUSD
        accountsCount
        totalRewards
        totalRewardsUSD
        contractBalance
        contractBalanceUSD
        depositsCount
        totalDeposited
        totalDepositedUSD
        poolsCount
        totalPoolRewards
        totalValueLocked
        totalValueLockedUSD
        validatorsCount
        validatorsAmountTotal
        validatorsAmountTotalUSD
        validatorMeanPerformance
        withdrawalsCount
      }
      validators {
        validatorindex
        attestationEfficiency
        effectivenessPercentage
        publicKey
        balance
      }
    }
  }
`
