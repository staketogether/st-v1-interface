/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers'
import type { IDepositContract, IDepositContractInterface } from '../../../../contracts/ethereum/interfaces/IDepositContract'

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'pubkey',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'withdrawal_credentials',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'amount',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'index',
        type: 'bytes'
      }
    ],
    name: 'DepositEvent',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'pubkey',
        type: 'bytes'
      },
      {
        internalType: 'bytes',
        name: 'withdrawal_credentials',
        type: 'bytes'
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes'
      },
      {
        internalType: 'bytes32',
        name: 'deposit_data_root',
        type: 'bytes32'
      }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'get_deposit_count',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'get_deposit_root',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export class IDepositContract__factory {
  static readonly abi = _abi
  static createInterface(): IDepositContractInterface {
    return new Interface(_abi) as IDepositContractInterface
  }
  static connect(address: string, runner?: ContractRunner | null): IDepositContract {
    return new Contract(address, _abi, runner) as unknown as IDepositContract
  }
}
