export interface Incentives {
  reportIncentives: ReportIncentive[]
}

export interface ReportIncentive {
  id: string
  account: {
    address: `0x${string}`
  }
  poolOwnerAmount: bigint
  earlyAdopterAmount: bigint
  socialImpactAmount: bigint
  totalAmount: bigint
  reportBlock: string

  index: number
  redeemBlock: number
  sharesAmount: bigint
}
