/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace IELAdapter {
  export type ConfigStruct = { validatorSize: BigNumberish };

  export type ConfigStructOutput = [validatorSize: bigint] & {
    validatorSize: bigint;
  };
}

export interface ELAdapterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ADAPTER_ORACLE_MANAGER_ROLE"
      | "ADAPTER_ORACLE_ROLE"
      | "ADMIN_ROLE"
      | "DEFAULT_ADMIN_ROLE"
      | "UPGRADER_ROLE"
      | "UPGRADE_INTERFACE_VERSION"
      | "VALIDATOR_ORACLE_SENTINEL_ROLE"
      | "addAdapterOracle"
      | "addValidator"
      | "bridge"
      | "config"
      | "currentOracleIndex"
      | "deposit"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "isAdapterOracle"
      | "l2Router"
      | "l2Withdraw"
      | "pause"
      | "paused"
      | "proxiableUUID"
      | "removeAdapterOracle"
      | "renounceRole"
      | "revokeRole"
      | "setConfig"
      | "setL2Router"
      | "supportsInterface"
      | "unpause"
      | "upgradeToAndCall"
      | "validators"
      | "version"
      | "withdrawalCredentials"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddAdapterOracle"
      | "AddValidator"
      | "Initialized"
      | "L2Withdraw"
      | "NextAdapterOracle"
      | "Paused"
      | "ReceiveEther"
      | "RemoveAdapterOracle"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "SetConfig"
      | "SetL2Router"
      | "Unpaused"
      | "Upgraded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ADAPTER_ORACLE_MANAGER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ADAPTER_ORACLE_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "UPGRADER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "VALIDATOR_ORACLE_SENTINEL_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addAdapterOracle",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "addValidator",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
  encodeFunctionData(functionFragment: "config", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "currentOracleIndex",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isAdapterOracle",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "l2Router", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "l2Withdraw",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeAdapterOracle",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setConfig",
    values: [IELAdapter.ConfigStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "setL2Router",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "validators",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawalCredentials",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "ADAPTER_ORACLE_MANAGER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ADAPTER_ORACLE_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ADMIN_ROLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "UPGRADER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "VALIDATOR_ORACLE_SENTINEL_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAdapterOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addValidator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "config", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "currentOracleIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isAdapterOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "l2Router", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "l2Withdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeAdapterOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setConfig", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setL2Router",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "validators", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawalCredentials",
    data: BytesLike
  ): Result;
}

export namespace AddAdapterOracleEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AddValidatorEvent {
  export type InputTuple = [
    oracle: AddressLike,
    amount: BigNumberish,
    publicKey: BytesLike,
    withdrawalCredentials: BytesLike,
    signature: BytesLike,
    depositDataRoot: BytesLike
  ];
  export type OutputTuple = [
    oracle: string,
    amount: bigint,
    publicKey: string,
    withdrawalCredentials: string,
    signature: string,
    depositDataRoot: string
  ];
  export interface OutputObject {
    oracle: string;
    amount: bigint;
    publicKey: string;
    withdrawalCredentials: string;
    signature: string;
    depositDataRoot: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace L2WithdrawEvent {
  export type InputTuple = [
    amount: BigNumberish,
    minGasLimit: BigNumberish,
    extraData: BytesLike
  ];
  export type OutputTuple = [
    amount: bigint,
    minGasLimit: bigint,
    extraData: string
  ];
  export interface OutputObject {
    amount: bigint;
    minGasLimit: bigint;
    extraData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NextAdapterOracleEvent {
  export type InputTuple = [index: BigNumberish, account: AddressLike];
  export type OutputTuple = [index: bigint, account: string];
  export interface OutputObject {
    index: bigint;
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ReceiveEtherEvent {
  export type InputTuple = [amount: BigNumberish];
  export type OutputTuple = [amount: bigint];
  export interface OutputObject {
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RemoveAdapterOracleEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetConfigEvent {
  export type InputTuple = [config: IELAdapter.ConfigStruct];
  export type OutputTuple = [config: IELAdapter.ConfigStructOutput];
  export interface OutputObject {
    config: IELAdapter.ConfigStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetL2RouterEvent {
  export type InputTuple = [l2Router: AddressLike];
  export type OutputTuple = [l2Router: string];
  export interface OutputObject {
    l2Router: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpgradedEvent {
  export type InputTuple = [implementation: AddressLike];
  export type OutputTuple = [implementation: string];
  export interface OutputObject {
    implementation: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ELAdapter extends BaseContract {
  connect(runner?: ContractRunner | null): ELAdapter;
  waitForDeployment(): Promise<this>;

  interface: ELAdapterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  ADAPTER_ORACLE_MANAGER_ROLE: TypedContractMethod<[], [string], "view">;

  ADAPTER_ORACLE_ROLE: TypedContractMethod<[], [string], "view">;

  ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  UPGRADER_ROLE: TypedContractMethod<[], [string], "view">;

  UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], "view">;

  VALIDATOR_ORACLE_SENTINEL_ROLE: TypedContractMethod<[], [string], "view">;

  addAdapterOracle: TypedContractMethod<
    [_account: AddressLike],
    [void],
    "nonpayable"
  >;

  addValidator: TypedContractMethod<
    [_publicKey: BytesLike, _signature: BytesLike, _depositDataRoot: BytesLike],
    [void],
    "nonpayable"
  >;

  bridge: TypedContractMethod<[], [string], "view">;

  config: TypedContractMethod<[], [bigint], "view">;

  currentOracleIndex: TypedContractMethod<[], [bigint], "view">;

  deposit: TypedContractMethod<[], [string], "view">;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  initialize: TypedContractMethod<
    [
      _bridge: AddressLike,
      _deposit: AddressLike,
      _withdrawalCredentials: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  isAdapterOracle: TypedContractMethod<
    [_account: AddressLike],
    [boolean],
    "view"
  >;

  l2Router: TypedContractMethod<[], [string], "view">;

  l2Withdraw: TypedContractMethod<
    [_amount: BigNumberish, _minGasLimit: BigNumberish, _extraData: BytesLike],
    [void],
    "nonpayable"
  >;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  proxiableUUID: TypedContractMethod<[], [string], "view">;

  removeAdapterOracle: TypedContractMethod<
    [_account: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  setConfig: TypedContractMethod<
    [_config: IELAdapter.ConfigStruct],
    [void],
    "nonpayable"
  >;

  setL2Router: TypedContractMethod<
    [_l2Router: AddressLike],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  upgradeToAndCall: TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;

  validators: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  version: TypedContractMethod<[], [bigint], "view">;

  withdrawalCredentials: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "ADAPTER_ORACLE_MANAGER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ADAPTER_ORACLE_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "UPGRADER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "UPGRADE_INTERFACE_VERSION"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "VALIDATOR_ORACLE_SENTINEL_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "addAdapterOracle"
  ): TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "addValidator"
  ): TypedContractMethod<
    [_publicKey: BytesLike, _signature: BytesLike, _depositDataRoot: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "bridge"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "config"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "currentOracleIndex"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      _bridge: AddressLike,
      _deposit: AddressLike,
      _withdrawalCredentials: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isAdapterOracle"
  ): TypedContractMethod<[_account: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "l2Router"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "l2Withdraw"
  ): TypedContractMethod<
    [_amount: BigNumberish, _minGasLimit: BigNumberish, _extraData: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "proxiableUUID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "removeAdapterOracle"
  ): TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setConfig"
  ): TypedContractMethod<
    [_config: IELAdapter.ConfigStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setL2Router"
  ): TypedContractMethod<[_l2Router: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "upgradeToAndCall"
  ): TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "validators"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdrawalCredentials"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "AddAdapterOracle"
  ): TypedContractEvent<
    AddAdapterOracleEvent.InputTuple,
    AddAdapterOracleEvent.OutputTuple,
    AddAdapterOracleEvent.OutputObject
  >;
  getEvent(
    key: "AddValidator"
  ): TypedContractEvent<
    AddValidatorEvent.InputTuple,
    AddValidatorEvent.OutputTuple,
    AddValidatorEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "L2Withdraw"
  ): TypedContractEvent<
    L2WithdrawEvent.InputTuple,
    L2WithdrawEvent.OutputTuple,
    L2WithdrawEvent.OutputObject
  >;
  getEvent(
    key: "NextAdapterOracle"
  ): TypedContractEvent<
    NextAdapterOracleEvent.InputTuple,
    NextAdapterOracleEvent.OutputTuple,
    NextAdapterOracleEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "ReceiveEther"
  ): TypedContractEvent<
    ReceiveEtherEvent.InputTuple,
    ReceiveEtherEvent.OutputTuple,
    ReceiveEtherEvent.OutputObject
  >;
  getEvent(
    key: "RemoveAdapterOracle"
  ): TypedContractEvent<
    RemoveAdapterOracleEvent.InputTuple,
    RemoveAdapterOracleEvent.OutputTuple,
    RemoveAdapterOracleEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: "SetConfig"
  ): TypedContractEvent<
    SetConfigEvent.InputTuple,
    SetConfigEvent.OutputTuple,
    SetConfigEvent.OutputObject
  >;
  getEvent(
    key: "SetL2Router"
  ): TypedContractEvent<
    SetL2RouterEvent.InputTuple,
    SetL2RouterEvent.OutputTuple,
    SetL2RouterEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;
  getEvent(
    key: "Upgraded"
  ): TypedContractEvent<
    UpgradedEvent.InputTuple,
    UpgradedEvent.OutputTuple,
    UpgradedEvent.OutputObject
  >;

  filters: {
    "AddAdapterOracle(address)": TypedContractEvent<
      AddAdapterOracleEvent.InputTuple,
      AddAdapterOracleEvent.OutputTuple,
      AddAdapterOracleEvent.OutputObject
    >;
    AddAdapterOracle: TypedContractEvent<
      AddAdapterOracleEvent.InputTuple,
      AddAdapterOracleEvent.OutputTuple,
      AddAdapterOracleEvent.OutputObject
    >;

    "AddValidator(address,uint256,bytes,bytes,bytes,bytes32)": TypedContractEvent<
      AddValidatorEvent.InputTuple,
      AddValidatorEvent.OutputTuple,
      AddValidatorEvent.OutputObject
    >;
    AddValidator: TypedContractEvent<
      AddValidatorEvent.InputTuple,
      AddValidatorEvent.OutputTuple,
      AddValidatorEvent.OutputObject
    >;

    "Initialized(uint64)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "L2Withdraw(uint256,uint32,bytes)": TypedContractEvent<
      L2WithdrawEvent.InputTuple,
      L2WithdrawEvent.OutputTuple,
      L2WithdrawEvent.OutputObject
    >;
    L2Withdraw: TypedContractEvent<
      L2WithdrawEvent.InputTuple,
      L2WithdrawEvent.OutputTuple,
      L2WithdrawEvent.OutputObject
    >;

    "NextAdapterOracle(uint256,address)": TypedContractEvent<
      NextAdapterOracleEvent.InputTuple,
      NextAdapterOracleEvent.OutputTuple,
      NextAdapterOracleEvent.OutputObject
    >;
    NextAdapterOracle: TypedContractEvent<
      NextAdapterOracleEvent.InputTuple,
      NextAdapterOracleEvent.OutputTuple,
      NextAdapterOracleEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "ReceiveEther(uint256)": TypedContractEvent<
      ReceiveEtherEvent.InputTuple,
      ReceiveEtherEvent.OutputTuple,
      ReceiveEtherEvent.OutputObject
    >;
    ReceiveEther: TypedContractEvent<
      ReceiveEtherEvent.InputTuple,
      ReceiveEtherEvent.OutputTuple,
      ReceiveEtherEvent.OutputObject
    >;

    "RemoveAdapterOracle(address)": TypedContractEvent<
      RemoveAdapterOracleEvent.InputTuple,
      RemoveAdapterOracleEvent.OutputTuple,
      RemoveAdapterOracleEvent.OutputObject
    >;
    RemoveAdapterOracle: TypedContractEvent<
      RemoveAdapterOracleEvent.InputTuple,
      RemoveAdapterOracleEvent.OutputTuple,
      RemoveAdapterOracleEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    "SetConfig(tuple)": TypedContractEvent<
      SetConfigEvent.InputTuple,
      SetConfigEvent.OutputTuple,
      SetConfigEvent.OutputObject
    >;
    SetConfig: TypedContractEvent<
      SetConfigEvent.InputTuple,
      SetConfigEvent.OutputTuple,
      SetConfigEvent.OutputObject
    >;

    "SetL2Router(address)": TypedContractEvent<
      SetL2RouterEvent.InputTuple,
      SetL2RouterEvent.OutputTuple,
      SetL2RouterEvent.OutputObject
    >;
    SetL2Router: TypedContractEvent<
      SetL2RouterEvent.InputTuple,
      SetL2RouterEvent.OutputTuple,
      SetL2RouterEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;

    "Upgraded(address)": TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
    Upgraded: TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
  };
}
