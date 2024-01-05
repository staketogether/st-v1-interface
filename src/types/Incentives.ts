export interface Incentives {
  reportIncentives: ReportIncentive[]
}

export interface ReportIncentive {
  id: string
  account: {
    address: string
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
