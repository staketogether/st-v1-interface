import { ethers } from 'ethers'
import { stake } from '../src'
import { Delegation, DelegationMap } from '../src/types/delegation'

xdescribe('stake', () => {
  it('should correctly stake with no delegation', () => {
    const delegator = '0xabc'
    const delegatorBalance = ethers.parseEther('0')
    const delegatorDelegations: Delegation = {}
    const stakeAmount = ethers.parseEther('1')
    const delegationAddress = '0x100'
    const delegationPercentage = ethers.parseEther('0.03')

    const expectedDelegations: DelegationMap = {
      delegator,
      balance: ethers.parseEther('1'),
      delegations: {
        [delegator]: {
          amount: ethers.parseEther('0.97'),
          percentage: ethers.parseEther('0.97')
        },
        [delegationAddress]: {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.03')
        }
      }
    }

    const delegationMap: DelegationMap = stake(
      { delegator, balance: delegatorBalance, delegations: delegatorDelegations },
      stakeAmount,
      delegationAddress,
      delegationPercentage
    )

    expect(delegationMap).toEqual(expectedDelegations)
  })

  it('should correctly stake with one delegation', () => {
    const delegator = '0xabc'
    const delegatorBalance = ethers.parseEther('1')
    const delegatorDelegations: Delegation = {
      [delegator]: {
        amount: ethers.parseEther('0.97'),
        percentage: ethers.parseEther('0.97')
      },
      '0x000': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.03')
      }
    }

    const stakeAmount = ethers.parseEther('1')
    const delegationAddress = '0x100'
    const delegationPercentage = ethers.parseEther('0.03')

    const expectedDelegations: DelegationMap = {
      delegator,
      balance: ethers.parseEther('2'),
      delegations: {
        [delegator]: {
          amount: ethers.parseEther('1.94'),
          percentage: ethers.parseEther('0.97')
        },
        '0x000': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.015')
        },
        [delegationAddress]: {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.015')
        }
      }
    }

    const delegationMap: DelegationMap = stake(
      { delegator, balance: delegatorBalance, delegations: delegatorDelegations },
      stakeAmount,
      delegationAddress,
      delegationPercentage
    )

    expect(delegationMap).toEqual(expectedDelegations)
  })

  it('should correctly stake with multiples delegations', () => {
    const delegator = '0xabc'
    const delegatorBalance = ethers.parseEther('1')
    const delegatorDelegations: Delegation = {
      [delegator]: {
        amount: ethers.parseEther('0.97'),
        percentage: ethers.parseEther('0.97')
      },
      '0x000': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.03')
      }
    }

    const stakeAmount = ethers.parseEther('1')
    const delegationAddress = '0x100'
    const delegationPercentage = ethers.parseEther('0.03')

    const expectedDelegations: DelegationMap = {
      delegator,
      balance: ethers.parseEther('2'),
      delegations: {
        [delegator]: {
          amount: ethers.parseEther('1.94'),
          percentage: ethers.parseEther('0.97')
        },
        '0x000': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.015')
        },
        [delegationAddress]: {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.015')
        }
      }
    }

    const delegationMap: DelegationMap = stake(
      { delegator, balance: delegatorBalance, delegations: delegatorDelegations },
      stakeAmount,
      delegationAddress,
      delegationPercentage
    )

    expect(delegationMap).toEqual(expectedDelegations)

    const delegatorBalance2 = expectedDelegations.balance
    const delegatorDelegations2 = expectedDelegations.delegations
    const stakeAmount2 = ethers.parseEther('2')
    const delegationAddress2 = '0x200'
    const delegationPercentage2 = ethers.parseEther('0.03')

    const expectedDelegations2: DelegationMap = {
      delegator,
      balance: ethers.parseEther('4'),
      delegations: {
        [delegator]: {
          amount: ethers.parseEther('3.88'),
          percentage: ethers.parseEther('0.97')
        },
        '0x000': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.0075')
        },
        [delegationAddress]: {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.0075')
        },
        [delegationAddress2]: {
          amount: ethers.parseEther('0.06'),
          percentage: ethers.parseEther('0.015')
        }
      }
    }

    const delegationMap2: DelegationMap = stake(
      { delegator, balance: delegatorBalance2, delegations: delegatorDelegations2 },
      stakeAmount2,
      delegationAddress2,
      delegationPercentage2
    )

    expect(delegationMap2).toEqual(expectedDelegations2)
  })

  it('should correctly stake with multiples delegations fractional', () => {
    const delegator = '0xabc'
    const delegatorBalance = ethers.parseEther('1')
    const delegatorDelegations: Delegation = {
      [delegator]: {
        amount: ethers.parseEther('0.97'),
        percentage: ethers.parseEther('0.97')
      },
      '0x000': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.03')
      }
    }

    const stakeAmount = ethers.parseEther('1')
    const delegationAddress = '0x100'
    const delegationPercentage = ethers.parseEther('0.03')

    const expectedDelegations: DelegationMap = {
      delegator,
      balance: ethers.parseEther('2'),
      delegations: {
        [delegator]: {
          amount: ethers.parseEther('1.94'),
          percentage: ethers.parseEther('0.97')
        },
        '0x000': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.015')
        },
        [delegationAddress]: {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.015')
        }
      }
    }

    const delegationMap: DelegationMap = stake(
      { delegator, balance: delegatorBalance, delegations: delegatorDelegations },
      stakeAmount,
      delegationAddress,
      delegationPercentage
    )

    expect(delegationMap).toEqual(expectedDelegations)

    const delegatorBalance2 = expectedDelegations.balance
    const delegatorDelegations2 = expectedDelegations.delegations
    const stakeAmount2 = ethers.parseEther('1')
    const delegationAddress2 = '0x200'
    const delegationPercentage2 = ethers.parseEther('0.03')

    const expectedDelegations2: DelegationMap = {
      delegator,
      balance: ethers.parseEther('3'),
      delegations: {
        [delegator]: {
          amount: 2910000000000000009n,
          percentage: 970000000000000003n
        },
        '0x000': {
          amount: 29999999999999997n,
          percentage: 9999999999999999n
        },
        [delegationAddress]: {
          amount: 29999999999999997n,
          percentage: 9999999999999999n
        },
        [delegationAddress2]: {
          amount: 29999999999999997n,
          percentage: 9999999999999999n
        }
      }
    }

    const delegationMap2: DelegationMap = stake(
      { delegator, balance: delegatorBalance2, delegations: delegatorDelegations2 },
      stakeAmount2,
      delegationAddress2,
      delegationPercentage2
    )

    expect(delegationMap2).toEqual(expectedDelegations2)
  })
})
