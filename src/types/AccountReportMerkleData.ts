export interface AccountReportMerkleData {
  account: `0x${string}`
  index: bigint
  proof: string[]
  reportBlock: bigint
  sharesAmount: string
  weiAmount: string
}

export interface ReportMerkle {
  accountReportMerkleData: AccountReportMerkleData
}
