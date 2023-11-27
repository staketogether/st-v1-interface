export type STConfig = {
  blocksPerDay: bigint
  depositLimit: bigint
  maxDelegations: bigint
  minDepositAmount: bigint
  minWithdrawAmount: bigint
  poolSize: bigint
  validatorSize: bigint
  withdrawPoolLimit: bigint
  withdrawDelay: bigint
  withdrawalValidatorLimit: bigint
  withdrawBeaconDelay: bigint
  feature: STFeature
}

export type STFeature = {
  AddPool: boolean
  Deposit: boolean
  WithdrawPool: boolean
  WithdrawBeacon: boolean
}
