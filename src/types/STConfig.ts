export type STConfig = {
  blocksPerDay: bigint
  depositLimit: bigint
  maxDelegations: bigint
  minDepositAmount: bigint
  minWithdrawAmount: bigint
  poolSize: bigint
  validatorSize: bigint
  withdrawalLimit: bigint
  feature: STFeature
}

export type STFeature = {
  AddPool: boolean
  Deposit: boolean
  WithdrawPool: boolean
  WithdrawValidator: boolean
}
