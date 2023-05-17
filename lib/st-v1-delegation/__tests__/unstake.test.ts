import { ethers } from 'ethers'
import { Delegation, DelegationMap } from '../../../src/types/delegation'
import { getMaxUnstakeAmount, unstake } from '../src' // Make sure to import the function from the correct file

describe('unstake', () => {
  it('should correctly calculate the maximum unstake amount', () => {
    const delegator = '0xabc'
    const delegationAddress = '0x100'
    const delegatorMap: DelegationMap = {
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

    const delegationPercentage = ethers.parseEther('0.03')

    const expectedMaxUnstakeAmount = ethers.parseEther('1')

    const maxUnstakeAmount = getMaxUnstakeAmount(delegatorMap, delegationAddress, delegationPercentage)

    expect(maxUnstakeAmount).toEqual(expectedMaxUnstakeAmount)
  })

  it('should correctly calculate the maximum unstake amount for multiple delegation addresses', () => {
    const delegator = '0xabc'
    const delegatorMap: DelegationMap = {
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
        '0x100': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.0075')
        },
        '0x200': {
          amount: ethers.parseEther('0.06'),
          percentage: ethers.parseEther('0.015')
        }
      }
    }

    const delegationPercentage = ethers.parseEther('0.03')

    const expectedMaxUnstakeAmount000 = ethers.parseEther('1')
    const expectedMaxUnstakeAmount100 = ethers.parseEther('1')
    const expectedMaxUnstakeAmount200 = ethers.parseEther('2')

    const maxUnstakeAmount000 = getMaxUnstakeAmount(delegatorMap, '0x000', delegationPercentage)
    const maxUnstakeAmount100 = getMaxUnstakeAmount(delegatorMap, '0x100', delegationPercentage)
    const maxUnstakeAmount200 = getMaxUnstakeAmount(delegatorMap, '0x200', delegationPercentage)

    expect(maxUnstakeAmount000).toEqual(expectedMaxUnstakeAmount000)
    expect(maxUnstakeAmount100).toEqual(expectedMaxUnstakeAmount100)
    expect(maxUnstakeAmount200).toEqual(expectedMaxUnstakeAmount200)
  })

  it('should correctly calculate the maximum unstake amount for multiple delegation addresses', () => {
    const delegator = '0xabc'
    const delegationAddress100 = '0x100'
    const delegationAddress200 = '0x200'
    const delegationAddress300 = '0x300'

    const delegatorMap = {
      delegator,
      balance: 3000000000000000000n,
      delegations: {
        [delegator]: {
          amount: 2910000000000000009n,
          percentage: 970000000000000003n
        },
        [delegationAddress100]: {
          amount: 29999999999999997n,
          percentage: 9999999999999999n
        },
        [delegationAddress200]: {
          amount: 29999999999999997n,
          percentage: 9999999999999999n
        },
        [delegationAddress300]: {
          amount: 29999999999999997n,
          percentage: 9999999999999999n
        }
      }
    }

    const delegationPercentage = ethers.parseEther('0.03')

    const expectedMaxUnstakeAmount100 = 999999999999999902n
    const expectedMaxUnstakeAmount200 = 999999999999999902n
    const expectedMaxUnstakeAmount300 = 999999999999999902n

    const maxUnstakeAmount100 = getMaxUnstakeAmount(
      delegatorMap,
      delegationAddress100,
      delegationPercentage
    )
    const maxUnstakeAmount200 = getMaxUnstakeAmount(
      delegatorMap,
      delegationAddress200,
      delegationPercentage
    )
    const maxUnstakeAmount300 = getMaxUnstakeAmount(
      delegatorMap,
      delegationAddress300,
      delegationPercentage
    )

    expect(maxUnstakeAmount100).toEqual(expectedMaxUnstakeAmount100)
    expect(maxUnstakeAmount200).toEqual(expectedMaxUnstakeAmount200)
    expect(maxUnstakeAmount300).toEqual(expectedMaxUnstakeAmount300)
  })

  it('should correctly unstake and update delegations', () => {
    const delegator = '0xabc'
    const delegatorBalance = ethers.parseEther('4')
    const delegatorDelegations: Delegation = {
      [delegator]: {
        amount: ethers.parseEther('3.88'),
        percentage: ethers.parseEther('0.97')
      },
      '0x000': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.0075')
      },
      '0x100': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.0075')
      },
      '0x200': {
        amount: ethers.parseEther('0.06'),
        percentage: ethers.parseEther('0.015')
      }
    }

    const unstakeAmount = ethers.parseEther('1')
    const delegationAddress = '0x200'
    const delegationPercentage = ethers.parseEther('0.03')

    const expectedDelegations: DelegationMap = {
      delegator,
      balance: ethers.parseEther('3'),
      delegations: {
        [delegator]: {
          amount: ethers.parseEther('2.91'),
          percentage: ethers.parseEther('0.97')
        },
        '0x000': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.01')
        },
        '0x100': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.01')
        },
        '0x200': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.01')
        }
      }
    }

    const delegationMap: DelegationMap = unstake(
      { delegator, balance: delegatorBalance, delegations: delegatorDelegations },
      unstakeAmount,
      delegationAddress,
      delegationPercentage
    )

    expect(delegationMap).toEqual(expectedDelegations)
  })

  it('should correctly unstake all for delegation', () => {
    const delegator = '0xabc'
    const delegatorBalance = ethers.parseEther('4')
    const delegatorDelegations: Delegation = {
      [delegator]: {
        amount: ethers.parseEther('3.88'),
        percentage: ethers.parseEther('0.97')
      },
      '0x000': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.0075')
      },
      '0x100': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.0075')
      },
      '0x200': {
        amount: ethers.parseEther('0.06'),
        percentage: ethers.parseEther('0.015')
      }
    }

    const unstakeAmount = ethers.parseEther('2')
    const delegationAddress = '0x200'
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
        '0x100': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.015')
        }
      }
    }

    const delegationMap: DelegationMap = unstake(
      { delegator, balance: delegatorBalance, delegations: delegatorDelegations },
      unstakeAmount,
      delegationAddress,
      delegationPercentage
    )

    expect(delegationMap).toEqual(expectedDelegations)
  })

  xit('should correctly unstake and update delegations when unstaking 0.001 ether', () => {
    const delegator = '0xabc'
    const delegatorBalance = ethers.parseEther('4')
    const delegatorDelegations: Delegation = {
      [delegator]: {
        amount: ethers.parseEther('3.88'),
        percentage: ethers.parseEther('0.97')
      },
      '0x000': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.0075')
      },
      '0x100': {
        amount: ethers.parseEther('0.03'),
        percentage: ethers.parseEther('0.0075')
      },
      '0x200': {
        amount: ethers.parseEther('0.06'),
        percentage: ethers.parseEther('0.015')
      }
    }

    const unstakeAmount = ethers.parseEther('0.001')
    const delegationAddress = '0x200'
    const delegationPercentage = ethers.parseEther('0.03')

    const expectedDelegations: DelegationMap = {
      delegator,
      balance: ethers.parseEther('3.999'),
      delegations: {
        [delegator]: {
          amount: ethers.parseEther('3.8899'),
          percentage: ethers.parseEther('0.97')
        },
        '0x000': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.0075')
        },
        '0x100': {
          amount: ethers.parseEther('0.03'),
          percentage: ethers.parseEther('0.0075')
        },
        '0x200': {
          amount: ethers.parseEther('0.0599'),
          percentage: ethers.parseEther('0.014995')
        }
      }
    }

    const delegationMap: DelegationMap = unstake(
      { delegator, balance: delegatorBalance, delegations: delegatorDelegations },
      unstakeAmount,
      delegationAddress,
      delegationPercentage
    )

    expect(delegationMap).toEqual(expectedDelegations)
  })
})
