export type ContactConfig = {
  poolSize: bigint
  minDepositAmount: bigint
  minLockDays: bigint
  maxLockDays: bigint
  depositLimit: bigint
  withdrawalLimit: bigint
  blocksPerDay: bigint
  maxDelegations: bigint
  feature: {
    AddPool: boolean
    Deposit: boolean
    Lock: boolean
    WithdrawLiquidity: boolean
    WithdrawPool: boolean
    WithdrawValidator: boolean
  }
}
