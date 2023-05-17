export type Delegation = {
  [address: string]: { amount: bigint; percentage: bigint }
}

export type DelegationMap = {
  delegator: string
  balance: bigint
  delegations: Delegation
}
