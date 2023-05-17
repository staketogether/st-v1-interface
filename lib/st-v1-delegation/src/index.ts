import { ethers } from 'ethers'
import { Delegation, DelegationMap } from './types/delegation'

const OneEther = ethers.parseEther('1')

export function stake(
  delegatorMap: DelegationMap,
  stakeAmount: bigint,
  delegationAddress: string,
  delegationPercentage: bigint
): DelegationMap {
  const { delegator } = delegatorMap
  const newTotalBalance = delegatorMap.balance + stakeAmount

  // eslint-disable-next-line no-console
  console.log('newTotalBalance:', newTotalBalance.toString())

  const delegatorPercentage = (delegatorMap.balance * OneEther) / newTotalBalance
  const newDelegationPercentage = (stakeAmount * OneEther) / newTotalBalance

  // eslint-disable-next-line no-console
  console.log('percentages:', delegatorPercentage.toString(), newDelegationPercentage.toString())

  const newDelegationMap: DelegationMap = {
    delegator,
    balance: stakeAmount,
    delegations: {
      [delegator]: {
        amount: (stakeAmount * (OneEther - delegationPercentage)) / OneEther,
        percentage: OneEther - delegationPercentage
      },
      [delegationAddress]: {
        amount: (stakeAmount * delegationPercentage) / OneEther,
        percentage: delegationPercentage
      }
    }
  }

  const updatedDelegatorMap = updateDelegationMap(delegatorMap, delegatorPercentage)

  const updatedNewDelegationMap = updateDelegationMap(newDelegationMap, newDelegationPercentage)

  const mergedDelegationMap = mergeDelegationMapsWithPercentage(
    updatedDelegatorMap,
    updatedNewDelegationMap
  )

  const adjustedDelegationMap = verifyAndAdjustPercentage(mergedDelegationMap)

  validateDelegationMap(adjustedDelegationMap)

  logMap('adjustedDelegationMap', adjustedDelegationMap)
  return adjustedDelegationMap
}

export function unstake(
  delegatorMap: DelegationMap,
  unstakeAmount: bigint,
  delegationAddress: string,
  delegationPercentage: bigint
): DelegationMap {
  const { delegator } = delegatorMap
  const maxUnstakeAmount = getMaxUnstakeAmount(delegatorMap, delegationAddress, delegationPercentage)

  if (unstakeAmount > maxUnstakeAmount) {
    throw new Error('Unstake amount exceeds the maximum allowed')
  }

  if (!delegatorMap.delegations[delegationAddress]) {
    throw new Error('Delegation address not found')
  }

  logMap('delegatorMap', delegatorMap)

  const newTotalBalance = delegatorMap.balance - unstakeAmount

  const subFromDelegator = (unstakeAmount * delegatorMap.delegations[delegator].percentage) / OneEther

  const delegatorNewAmount = delegatorMap.delegations[delegator].amount - subFromDelegator
  const delegationAddressNewAmount = unstakeAmount - subFromDelegator
  const delegationAddressNewPercentage = (delegationAddressNewAmount * OneEther) / newTotalBalance

  const newDelegationMap: DelegationMap = {
    delegator,
    balance: newTotalBalance,
    delegations: {
      [delegator]: {
        amount: delegatorNewAmount,
        percentage: delegatorMap.delegations[delegator].percentage
      }
    }
  }

  const fullUnstake = unstakeAmount === maxUnstakeAmount

  if (!fullUnstake) {
    newDelegationMap.delegations[delegationAddress] = {
      amount: delegationAddressNewAmount,
      percentage: delegationAddressNewPercentage
    }
  }

  const filteredDelegationMap = getFilteredDelegationMap(delegatorMap, delegator, delegationAddress)

  logMap('filteredDelegationMap', filteredDelegationMap)

  const updatedDelegationMap = updateDelegationsPercentage(filteredDelegationMap, newTotalBalance)

  logMap('updatedDelegationMap', updatedDelegationMap)

  logMap('newDelegationMap', newDelegationMap)

  const mergedDelegationMap = mergeDelegationMaps(newTotalBalance, newDelegationMap, updatedDelegationMap)

  const adjustedDelegationMap = verifyAndAdjustPercentage(mergedDelegationMap)

  logMap('adjustedDelegationMap', adjustedDelegationMap)
  validateDelegationMap(adjustedDelegationMap)
  return adjustedDelegationMap
}

export function getMaxUnstakeAmount(
  delegatorMap: DelegationMap,
  delegationAddress: string,
  delegationPercentage: bigint
): bigint {
  validateDelegationMap(delegatorMap)

  const delegation = delegatorMap.delegations[delegationAddress]
  const delegatorDelegation = delegatorMap.delegations[delegatorMap.delegator]

  // Calculate the percentage of the delegation fee for the specific delegation address
  const delegationAddressPercentage = (delegation.percentage * OneEther) / delegationPercentage

  // Calculate the maximum unstake amount for the delegator based on the delegation address percentage
  const maxDelegatorUnstakeAmount = (delegatorDelegation.amount * delegationAddressPercentage) / OneEther

  // Calculate the maximum unstake amount (sum of delegator and delegation address amounts)
  const maxUnstakeAmount = maxDelegatorUnstakeAmount + delegation.amount

  return maxUnstakeAmount
}

function updateDelegationsPercentage(delegationMap: DelegationMap, newBalance: bigint): DelegationMap {
  const updatedDelegations: Delegation = {}

  Object.keys(delegationMap.delegations).forEach(address => {
    const delegation = delegationMap.delegations[address]
    const updatedPercentage = (delegation.amount * OneEther) / newBalance
    updatedDelegations[address] = {
      amount: delegation.amount,
      percentage: updatedPercentage
    }
  })

  const updatedDelegationMap: DelegationMap = {
    delegator: delegationMap.delegator,
    balance: newBalance,
    delegations: updatedDelegations
  }

  return updatedDelegationMap
}

function getFilteredDelegationMap(
  delegationMap: DelegationMap,
  delegator: string,
  delegationAddress: string
): DelegationMap {
  const filteredDelegations: Delegation = {}

  Object.keys(delegationMap.delegations).forEach(address => {
    if (address !== delegator && address !== delegationAddress) {
      filteredDelegations[address] = delegationMap.delegations[address]
    }
  })

  const filteredDelegationMap: DelegationMap = {
    delegator: delegationMap.delegator,
    balance: delegationMap.balance,
    delegations: filteredDelegations
  }

  return filteredDelegationMap
}

function verifyAndAdjustPercentage(mergedDelegationMap: DelegationMap): DelegationMap {
  const { delegator } = mergedDelegationMap
  const totalPercentage = Object.values(mergedDelegationMap.delegations).reduce((sum, delegation) => {
    return sum + delegation.percentage
  }, 0n)

  const missingPercentage = OneEther - totalPercentage

  if (!missingPercentage) {
    const adjustedDelegationMap: DelegationMap = {
      delegator,
      balance: mergedDelegationMap.balance,
      delegations: { ...mergedDelegationMap.delegations }
    }

    adjustedDelegationMap.delegations[delegator] = {
      ...adjustedDelegationMap.delegations[delegator],
      percentage: adjustedDelegationMap.delegations[delegator].percentage + missingPercentage
    }

    Object.keys(adjustedDelegationMap.delegations).forEach(address => {
      const delegation = adjustedDelegationMap.delegations[address]
      const newAmount = (adjustedDelegationMap.balance * delegation.percentage) / OneEther
      adjustedDelegationMap.delegations[address].amount = newAmount
    })

    return adjustedDelegationMap
  }

  return mergedDelegationMap
}

function mergeDelegationMaps(
  newBalance: bigint,
  map1: DelegationMap,
  map2: DelegationMap
): DelegationMap {
  if (Object.keys(map1.delegations).length === 0) {
    return map2
  }

  if (Object.keys(map2.delegations).length === 0) {
    return map1
  }

  const mergedMap: DelegationMap = {
    delegator: map1.delegator,
    balance: newBalance,
    delegations: {}
  }

  // Add delegations from the first map if their amount and percentage are not 0
  Object.keys(map1.delegations).forEach(address => {
    if (map1.delegations[address].amount > 0n && map1.delegations[address].percentage > 0n) {
      mergedMap.delegations[address] = {
        amount: map1.delegations[address].amount,
        percentage: map1.delegations[address].percentage
      }
    }
  })

  // Add or merge delegations from the second map if their amount and percentage are not 0
  Object.keys(map2.delegations).forEach(address => {
    if (map2.delegations[address].amount > 0n && map2.delegations[address].percentage > 0n) {
      if (!mergedMap.delegations[address]) {
        mergedMap.delegations[address] = {
          amount: map2.delegations[address].amount,
          percentage: map2.delegations[address].percentage
        }
      }
    }
  })

  return mergedMap
}

function mergeDelegationMapsWithPercentage(map1: DelegationMap, map2: DelegationMap): DelegationMap {
  if (Object.keys(map1.delegations).length === 0) {
    return map2
  }

  if (Object.keys(map2.delegations).length === 0) {
    return map1
  }

  const balance = map1.balance + map2.balance

  const mergedMap: DelegationMap = {
    delegator: map1.delegator,
    balance,
    delegations: {}
  }

  Object.keys(map1.delegations).forEach(address => {
    mergedMap.delegations[address] = {
      amount: map1.delegations[address].amount,
      percentage: map1.delegations[address].percentage
    }
  })

  Object.keys(map2.delegations).forEach(address => {
    if (mergedMap.delegations[address]) {
      mergedMap.delegations[address].amount =
        mergedMap.delegations[address].amount + map2.delegations[address].amount

      mergedMap.delegations[address].percentage =
        mergedMap.delegations[address].percentage + map2.delegations[address].percentage
    } else {
      mergedMap.delegations[address] = {
        amount: map2.delegations[address].amount,
        percentage: map2.delegations[address].percentage
      }
    }
  })

  return mergedMap
}

function updateDelegationMap(delegationMap: DelegationMap, delegationPercentage: bigint): DelegationMap {
  const { delegator, balance } = delegationMap

  if (delegationPercentage <= 0n || delegationPercentage === OneEther) {
    return delegationMap
  }

  const updatedDelegation: Delegation = {}

  Object.entries(delegationMap.delegations).forEach(([address, { amount, percentage }]) => {
    const updatedPercentage = (percentage * delegationPercentage) / OneEther

    updatedDelegation[address] = {
      amount,
      percentage: updatedPercentage
    }
  })

  const updatedDelegationMap: DelegationMap = {
    delegator,
    balance,
    delegations: updatedDelegation
  }

  return updatedDelegationMap
}

function validateDelegationMap(delegationMap: DelegationMap): void {
  const { delegator, delegations } = delegationMap

  if (!delegator) {
    throw new Error('Should have a delegator address.')
  }

  const inputKeys = Object.keys(delegations)

  if (inputKeys.length === 0) {
    throw new Error('The delegation object must not be empty.')
  }

  if (inputKeys.length > 100) {
    throw new Error('The delegation object must have at maximum 100 addresses.')
  }

  const addressSet = new Set<string>()
  let totalPercentage = 0n
  let totalAmount = 0n

  inputKeys.forEach(key => {
    const delegation = delegations[key]

    if (addressSet.has(key)) {
      throw new Error('Duplicate wallet address found.')
    }

    addressSet.add(key)

    const { amount, percentage } = delegation

    if (percentage <= 0n || percentage >= OneEther) {
      throw new Error('Each delegation percentage must be greater than 0 and no more than 1 ether 100')
    }

    totalPercentage = totalPercentage + percentage
    totalAmount = totalAmount + amount
  })

  if (totalPercentage !== OneEther) {
    throw new Error("The sum of the delegations' percentages must equal 100.")
  }

  if (totalAmount !== delegationMap.balance) {
    throw new Error("The sum of the delegations' amounts must equal the balance.")
  }
}

function logMap(key: string, map: DelegationMap) {
  // eslint-disable-next-line no-console
  console.log(`
  ***** ${key} *****
  -
  - balance: ${map.balance.toString()} ether (100%)
  - delegations: 
${Object.entries(map.delegations)
  .map(([address, { amount, percentage }], i) => {
    const etherAmount = ethers.formatEther(amount)
    const percentageOfTotal = (amount * 10000n) / OneEther / 100n
    const percentageOfWeiPerEther = (percentage * 10000n) / OneEther / 100n
    return `    ${i}: 
      - address: ${address}
      - amount: ${amount.toString()} ether | ${etherAmount} ether | ${percentageOfTotal}% of total balance
      - percentage: ${percentage.toString()} | ${percentageOfWeiPerEther}%`
  })
  .join('\n')}
`)
}
