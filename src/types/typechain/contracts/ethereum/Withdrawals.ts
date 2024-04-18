/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  AddressLike,
  BaseContract,
  BigNumberish,
  BytesLike,
  ContractMethod,
  ContractRunner,
  EventFragment,
  FunctionFragment,
  Interface,
  Listener,
  Result
} from 'ethers'
import type {
  TypedContractEvent,
  TypedContractMethod,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedLogDescription
} from '../../common'

export interface WithdrawalsInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'ADMIN_ROLE'
      | 'DEFAULT_ADMIN_ROLE'
      | 'DOMAIN_SEPARATOR'
      | 'UPGRADER_ROLE'
      | 'UPGRADE_INTERFACE_VERSION'
      | 'allowance'
      | 'approve'
      | 'balanceOf'
      | 'burn'
      | 'burnFrom'
      | 'decimals'
      | 'eip712Domain'
      | 'getRoleAdmin'
      | 'grantRole'
      | 'hasRole'
      | 'initialize'
      | 'isWithdrawReady'
      | 'mint'
      | 'name'
      | 'nonces'
      | 'pause'
      | 'paused'
      | 'permit'
      | 'proxiableUUID'
      | 'receiveWithdrawEther'
      | 'renounceRole'
      | 'revokeRole'
      | 'router'
      | 'setRouter'
      | 'setStakeTogether'
      | 'stakeTogether'
      | 'supportsInterface'
      | 'symbol'
      | 'totalSupply'
      | 'transfer'
      | 'transferExtraAmount'
      | 'transferFrom'
      | 'unpause'
      | 'upgradeToAndCall'
      | 'version'
      | 'withdraw'
  ): FunctionFragment

  getEvent(
    nameOrSignatureOrTopic:
      | 'Approval'
      | 'EIP712DomainChanged'
      | 'Initialized'
      | 'Paused'
      | 'ReceiveEther'
      | 'ReceiveWithdrawEther'
      | 'RoleAdminChanged'
      | 'RoleGranted'
      | 'RoleRevoked'
      | 'SetRouter'
      | 'SetStakeTogether'
      | 'Transfer'
      | 'Unpaused'
      | 'Upgraded'
      | 'Withdraw'
  ): EventFragment

  encodeFunctionData(functionFragment: 'ADMIN_ROLE', values?: undefined): string
  encodeFunctionData(functionFragment: 'DEFAULT_ADMIN_ROLE', values?: undefined): string
  encodeFunctionData(functionFragment: 'DOMAIN_SEPARATOR', values?: undefined): string
  encodeFunctionData(functionFragment: 'UPGRADER_ROLE', values?: undefined): string
  encodeFunctionData(functionFragment: 'UPGRADE_INTERFACE_VERSION', values?: undefined): string
  encodeFunctionData(functionFragment: 'allowance', values: [AddressLike, AddressLike]): string
  encodeFunctionData(functionFragment: 'approve', values: [AddressLike, BigNumberish]): string
  encodeFunctionData(functionFragment: 'balanceOf', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'burn', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'burnFrom', values: [AddressLike, BigNumberish]): string
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string
  encodeFunctionData(functionFragment: 'eip712Domain', values?: undefined): string
  encodeFunctionData(functionFragment: 'getRoleAdmin', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'grantRole', values: [BytesLike, AddressLike]): string
  encodeFunctionData(functionFragment: 'hasRole', values: [BytesLike, AddressLike]): string
  encodeFunctionData(functionFragment: 'initialize', values?: undefined): string
  encodeFunctionData(functionFragment: 'isWithdrawReady', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'mint', values: [AddressLike, BigNumberish]): string
  encodeFunctionData(functionFragment: 'name', values?: undefined): string
  encodeFunctionData(functionFragment: 'nonces', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'pause', values?: undefined): string
  encodeFunctionData(functionFragment: 'paused', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'permit',
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string
  encodeFunctionData(functionFragment: 'proxiableUUID', values?: undefined): string
  encodeFunctionData(functionFragment: 'receiveWithdrawEther', values?: undefined): string
  encodeFunctionData(functionFragment: 'renounceRole', values: [BytesLike, AddressLike]): string
  encodeFunctionData(functionFragment: 'revokeRole', values: [BytesLike, AddressLike]): string
  encodeFunctionData(functionFragment: 'router', values?: undefined): string
  encodeFunctionData(functionFragment: 'setRouter', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'setStakeTogether', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'stakeTogether', values?: undefined): string
  encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string
  encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string
  encodeFunctionData(functionFragment: 'transfer', values: [AddressLike, BigNumberish]): string
  encodeFunctionData(functionFragment: 'transferExtraAmount', values?: undefined): string
  encodeFunctionData(functionFragment: 'transferFrom', values: [AddressLike, AddressLike, BigNumberish]): string
  encodeFunctionData(functionFragment: 'unpause', values?: undefined): string
  encodeFunctionData(functionFragment: 'upgradeToAndCall', values: [AddressLike, BytesLike]): string
  encodeFunctionData(functionFragment: 'version', values?: undefined): string
  encodeFunctionData(functionFragment: 'withdraw', values: [BigNumberish]): string

  decodeFunctionResult(functionFragment: 'ADMIN_ROLE', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'DEFAULT_ADMIN_ROLE', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'DOMAIN_SEPARATOR', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'UPGRADER_ROLE', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'UPGRADE_INTERFACE_VERSION', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'burn', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'burnFrom', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'eip712Domain', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getRoleAdmin', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'grantRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'hasRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isWithdrawReady', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'nonces', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'pause', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'paused', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'permit', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'proxiableUUID', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'receiveWithdrawEther', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'renounceRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'revokeRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'router', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setRouter', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setStakeTogether', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'stakeTogether', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transferExtraAmount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'unpause', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'upgradeToAndCall', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'version', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result
}

export namespace ApprovalEvent {
  export type InputTuple = [owner: AddressLike, spender: AddressLike, value: BigNumberish]
  export type OutputTuple = [owner: string, spender: string, value: bigint]
  export interface OutputObject {
    owner: string
    spender: string
    value: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace EIP712DomainChangedEvent {
  export type InputTuple = []
  export type OutputTuple = []
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish]
  export type OutputTuple = [version: bigint]
  export interface OutputObject {
    version: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike]
  export type OutputTuple = [account: string]
  export interface OutputObject {
    account: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace ReceiveEtherEvent {
  export type InputTuple = [amount: BigNumberish]
  export type OutputTuple = [amount: bigint]
  export interface OutputObject {
    amount: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace ReceiveWithdrawEtherEvent {
  export type InputTuple = [amount: BigNumberish]
  export type OutputTuple = [amount: bigint]
  export interface OutputObject {
    amount: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [role: BytesLike, previousAdminRole: BytesLike, newAdminRole: BytesLike]
  export type OutputTuple = [role: string, previousAdminRole: string, newAdminRole: string]
  export interface OutputObject {
    role: string
    previousAdminRole: string
    newAdminRole: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace RoleGrantedEvent {
  export type InputTuple = [role: BytesLike, account: AddressLike, sender: AddressLike]
  export type OutputTuple = [role: string, account: string, sender: string]
  export interface OutputObject {
    role: string
    account: string
    sender: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace RoleRevokedEvent {
  export type InputTuple = [role: BytesLike, account: AddressLike, sender: AddressLike]
  export type OutputTuple = [role: string, account: string, sender: string]
  export interface OutputObject {
    role: string
    account: string
    sender: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace SetRouterEvent {
  export type InputTuple = [router: AddressLike]
  export type OutputTuple = [router: string]
  export interface OutputObject {
    router: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace SetStakeTogetherEvent {
  export type InputTuple = [stakeTogether: AddressLike]
  export type OutputTuple = [stakeTogether: string]
  export interface OutputObject {
    stakeTogether: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace TransferEvent {
  export type InputTuple = [from: AddressLike, to: AddressLike, value: BigNumberish]
  export type OutputTuple = [from: string, to: string, value: bigint]
  export interface OutputObject {
    from: string
    to: string
    value: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike]
  export type OutputTuple = [account: string]
  export interface OutputObject {
    account: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace UpgradedEvent {
  export type InputTuple = [implementation: AddressLike]
  export type OutputTuple = [implementation: string]
  export interface OutputObject {
    implementation: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace WithdrawEvent {
  export type InputTuple = [user: AddressLike, amount: BigNumberish]
  export type OutputTuple = [user: string, amount: bigint]
  export interface OutputObject {
    user: string
    amount: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export interface Withdrawals extends BaseContract {
  connect(runner?: ContractRunner | null): Withdrawals
  waitForDeployment(): Promise<this>

  interface: WithdrawalsInterface

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>

  on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>
  on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>

  once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>
  once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>

  listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>
  listeners(eventName?: string): Promise<Array<Listener>>
  removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>

  ADMIN_ROLE: TypedContractMethod<[], [string], 'view'>

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], 'view'>

  DOMAIN_SEPARATOR: TypedContractMethod<[], [string], 'view'>

  UPGRADER_ROLE: TypedContractMethod<[], [string], 'view'>

  UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], 'view'>

  allowance: TypedContractMethod<[owner: AddressLike, spender: AddressLike], [bigint], 'view'>

  approve: TypedContractMethod<[spender: AddressLike, value: BigNumberish], [boolean], 'nonpayable'>

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], 'view'>

  burn: TypedContractMethod<[value: BigNumberish], [void], 'nonpayable'>

  burnFrom: TypedContractMethod<[account: AddressLike, value: BigNumberish], [void], 'nonpayable'>

  decimals: TypedContractMethod<[], [bigint], 'view'>

  eip712Domain: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string
        name: string
        version: string
        chainId: bigint
        verifyingContract: string
        salt: string
        extensions: bigint[]
      }
    ],
    'view'
  >

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], 'view'>

  grantRole: TypedContractMethod<[role: BytesLike, account: AddressLike], [void], 'nonpayable'>

  hasRole: TypedContractMethod<[role: BytesLike, account: AddressLike], [boolean], 'view'>

  initialize: TypedContractMethod<[], [void], 'nonpayable'>

  isWithdrawReady: TypedContractMethod<[_amount: BigNumberish], [boolean], 'view'>

  mint: TypedContractMethod<[_to: AddressLike, _amount: BigNumberish], [void], 'nonpayable'>

  name: TypedContractMethod<[], [string], 'view'>

  nonces: TypedContractMethod<[owner: AddressLike], [bigint], 'view'>

  pause: TypedContractMethod<[], [void], 'nonpayable'>

  paused: TypedContractMethod<[], [boolean], 'view'>

  permit: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike, value: BigNumberish, deadline: BigNumberish, v: BigNumberish, r: BytesLike, s: BytesLike],
    [void],
    'nonpayable'
  >

  proxiableUUID: TypedContractMethod<[], [string], 'view'>

  receiveWithdrawEther: TypedContractMethod<[], [void], 'payable'>

  renounceRole: TypedContractMethod<[role: BytesLike, callerConfirmation: AddressLike], [void], 'nonpayable'>

  revokeRole: TypedContractMethod<[role: BytesLike, account: AddressLike], [void], 'nonpayable'>

  router: TypedContractMethod<[], [string], 'view'>

  setRouter: TypedContractMethod<[_router: AddressLike], [void], 'nonpayable'>

  setStakeTogether: TypedContractMethod<[_stakeTogether: AddressLike], [void], 'nonpayable'>

  stakeTogether: TypedContractMethod<[], [string], 'view'>

  supportsInterface: TypedContractMethod<[interfaceId: BytesLike], [boolean], 'view'>

  symbol: TypedContractMethod<[], [string], 'view'>

  totalSupply: TypedContractMethod<[], [bigint], 'view'>

  transfer: TypedContractMethod<[_to: AddressLike, _amount: BigNumberish], [boolean], 'nonpayable'>

  transferExtraAmount: TypedContractMethod<[], [void], 'nonpayable'>

  transferFrom: TypedContractMethod<[_from: AddressLike, _to: AddressLike, _amount: BigNumberish], [boolean], 'nonpayable'>

  unpause: TypedContractMethod<[], [void], 'nonpayable'>

  upgradeToAndCall: TypedContractMethod<[newImplementation: AddressLike, data: BytesLike], [void], 'payable'>

  version: TypedContractMethod<[], [bigint], 'view'>

  withdraw: TypedContractMethod<[_amount: BigNumberish], [void], 'nonpayable'>

  getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T

  getFunction(nameOrSignature: 'ADMIN_ROLE'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'DEFAULT_ADMIN_ROLE'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'DOMAIN_SEPARATOR'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'UPGRADER_ROLE'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'UPGRADE_INTERFACE_VERSION'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'allowance'): TypedContractMethod<[owner: AddressLike, spender: AddressLike], [bigint], 'view'>
  getFunction(nameOrSignature: 'approve'): TypedContractMethod<[spender: AddressLike, value: BigNumberish], [boolean], 'nonpayable'>
  getFunction(nameOrSignature: 'balanceOf'): TypedContractMethod<[account: AddressLike], [bigint], 'view'>
  getFunction(nameOrSignature: 'burn'): TypedContractMethod<[value: BigNumberish], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'burnFrom'): TypedContractMethod<[account: AddressLike, value: BigNumberish], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'decimals'): TypedContractMethod<[], [bigint], 'view'>
  getFunction(nameOrSignature: 'eip712Domain'): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string
        name: string
        version: string
        chainId: bigint
        verifyingContract: string
        salt: string
        extensions: bigint[]
      }
    ],
    'view'
  >
  getFunction(nameOrSignature: 'getRoleAdmin'): TypedContractMethod<[role: BytesLike], [string], 'view'>
  getFunction(nameOrSignature: 'grantRole'): TypedContractMethod<[role: BytesLike, account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'hasRole'): TypedContractMethod<[role: BytesLike, account: AddressLike], [boolean], 'view'>
  getFunction(nameOrSignature: 'initialize'): TypedContractMethod<[], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'isWithdrawReady'): TypedContractMethod<[_amount: BigNumberish], [boolean], 'view'>
  getFunction(nameOrSignature: 'mint'): TypedContractMethod<[_to: AddressLike, _amount: BigNumberish], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'name'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'nonces'): TypedContractMethod<[owner: AddressLike], [bigint], 'view'>
  getFunction(nameOrSignature: 'pause'): TypedContractMethod<[], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'paused'): TypedContractMethod<[], [boolean], 'view'>
  getFunction(
    nameOrSignature: 'permit'
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike, value: BigNumberish, deadline: BigNumberish, v: BigNumberish, r: BytesLike, s: BytesLike],
    [void],
    'nonpayable'
  >
  getFunction(nameOrSignature: 'proxiableUUID'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'receiveWithdrawEther'): TypedContractMethod<[], [void], 'payable'>
  getFunction(
    nameOrSignature: 'renounceRole'
  ): TypedContractMethod<[role: BytesLike, callerConfirmation: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'revokeRole'): TypedContractMethod<[role: BytesLike, account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'router'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'setRouter'): TypedContractMethod<[_router: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'setStakeTogether'): TypedContractMethod<[_stakeTogether: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'stakeTogether'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'supportsInterface'): TypedContractMethod<[interfaceId: BytesLike], [boolean], 'view'>
  getFunction(nameOrSignature: 'symbol'): TypedContractMethod<[], [string], 'view'>
  getFunction(nameOrSignature: 'totalSupply'): TypedContractMethod<[], [bigint], 'view'>
  getFunction(nameOrSignature: 'transfer'): TypedContractMethod<[_to: AddressLike, _amount: BigNumberish], [boolean], 'nonpayable'>
  getFunction(nameOrSignature: 'transferExtraAmount'): TypedContractMethod<[], [void], 'nonpayable'>
  getFunction(
    nameOrSignature: 'transferFrom'
  ): TypedContractMethod<[_from: AddressLike, _to: AddressLike, _amount: BigNumberish], [boolean], 'nonpayable'>
  getFunction(nameOrSignature: 'unpause'): TypedContractMethod<[], [void], 'nonpayable'>
  getFunction(
    nameOrSignature: 'upgradeToAndCall'
  ): TypedContractMethod<[newImplementation: AddressLike, data: BytesLike], [void], 'payable'>
  getFunction(nameOrSignature: 'version'): TypedContractMethod<[], [bigint], 'view'>
  getFunction(nameOrSignature: 'withdraw'): TypedContractMethod<[_amount: BigNumberish], [void], 'nonpayable'>

  getEvent(key: 'Approval'): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>
  getEvent(
    key: 'EIP712DomainChanged'
  ): TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>
  getEvent(key: 'Initialized'): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>
  getEvent(key: 'Paused'): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>
  getEvent(
    key: 'ReceiveEther'
  ): TypedContractEvent<ReceiveEtherEvent.InputTuple, ReceiveEtherEvent.OutputTuple, ReceiveEtherEvent.OutputObject>
  getEvent(
    key: 'ReceiveWithdrawEther'
  ): TypedContractEvent<ReceiveWithdrawEtherEvent.InputTuple, ReceiveWithdrawEtherEvent.OutputTuple, ReceiveWithdrawEtherEvent.OutputObject>
  getEvent(
    key: 'RoleAdminChanged'
  ): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>
  getEvent(key: 'RoleGranted'): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>
  getEvent(key: 'RoleRevoked'): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>
  getEvent(key: 'SetRouter'): TypedContractEvent<SetRouterEvent.InputTuple, SetRouterEvent.OutputTuple, SetRouterEvent.OutputObject>
  getEvent(
    key: 'SetStakeTogether'
  ): TypedContractEvent<SetStakeTogetherEvent.InputTuple, SetStakeTogetherEvent.OutputTuple, SetStakeTogetherEvent.OutputObject>
  getEvent(key: 'Transfer'): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>
  getEvent(key: 'Unpaused'): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>
  getEvent(key: 'Upgraded'): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>
  getEvent(key: 'Withdraw'): TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>

  filters: {
    'Approval(address,address,uint256)': TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>
    Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>

    'EIP712DomainChanged()': TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >
    EIP712DomainChanged: TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >

    'Initialized(uint64)': TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>
    Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>

    'Paused(address)': TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>
    Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>

    'ReceiveEther(uint256)': TypedContractEvent<ReceiveEtherEvent.InputTuple, ReceiveEtherEvent.OutputTuple, ReceiveEtherEvent.OutputObject>
    ReceiveEther: TypedContractEvent<ReceiveEtherEvent.InputTuple, ReceiveEtherEvent.OutputTuple, ReceiveEtherEvent.OutputObject>

    'ReceiveWithdrawEther(uint256)': TypedContractEvent<
      ReceiveWithdrawEtherEvent.InputTuple,
      ReceiveWithdrawEtherEvent.OutputTuple,
      ReceiveWithdrawEtherEvent.OutputObject
    >
    ReceiveWithdrawEther: TypedContractEvent<
      ReceiveWithdrawEtherEvent.InputTuple,
      ReceiveWithdrawEtherEvent.OutputTuple,
      ReceiveWithdrawEtherEvent.OutputObject
    >

    'RoleAdminChanged(bytes32,bytes32,bytes32)': TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >

    'RoleGranted(bytes32,address,address)': TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >
    RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>

    'RoleRevoked(bytes32,address,address)': TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >
    RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>

    'SetRouter(address)': TypedContractEvent<SetRouterEvent.InputTuple, SetRouterEvent.OutputTuple, SetRouterEvent.OutputObject>
    SetRouter: TypedContractEvent<SetRouterEvent.InputTuple, SetRouterEvent.OutputTuple, SetRouterEvent.OutputObject>

    'SetStakeTogether(address)': TypedContractEvent<
      SetStakeTogetherEvent.InputTuple,
      SetStakeTogetherEvent.OutputTuple,
      SetStakeTogetherEvent.OutputObject
    >
    SetStakeTogether: TypedContractEvent<
      SetStakeTogetherEvent.InputTuple,
      SetStakeTogetherEvent.OutputTuple,
      SetStakeTogetherEvent.OutputObject
    >

    'Transfer(address,address,uint256)': TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>
    Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>

    'Unpaused(address)': TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>
    Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>

    'Upgraded(address)': TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>
    Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>

    'Withdraw(address,uint256)': TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>
    Withdraw: TypedContractEvent<WithdrawEvent.InputTuple, WithdrawEvent.OutputTuple, WithdrawEvent.OutputObject>
  }
}
