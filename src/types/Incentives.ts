export interface Incentives {
  accountClaimableReports: AccountClaimableReports[]
}

export interface AccountClaimableReports {
  id: string
  reportBlock: string
  merkleRoot: string
  timestamp: string
  claimed: boolean
  account: {
    address: `0x${string}`
  }
}
