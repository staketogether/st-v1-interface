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

export interface AirdropInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ADMIN_ROLE"
      | "DEFAULT_ADMIN_ROLE"
      | "UPGRADER_ROLE"
      | "UPGRADE_INTERFACE_VERSION"
      | "addMerkleRoot"
      | "claim"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "isClaimed"
      | "merkleRoots"
      | "pause"
      | "paused"
      | "proxiableUUID"
      | "renounceRole"
      | "revokeRole"
      | "router"
      | "setRouter"
      | "setStakeTogether"
      | "stakeTogether"
      | "supportsInterface"
      | "transferExtraAmount"
      | "unpause"
      | "upgradeToAndCall"
      | "version"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddMerkleRoot"
      | "Claim"
      | "ClaimBatch"
      | "Initialized"
      | "Paused"
      | "ReceiveEther"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "SetRouter"
      | "SetStakeTogether"
      | "Unpaused"
      | "Upgraded"
  ): EventFragment;

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
    functionFragment: "addMerkleRoot",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [BigNumberish, BigNumberish, AddressLike, BigNumberish, BytesLike[]]
  ): string;
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
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isClaimed",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "merkleRoots",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "router", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setRouter",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setStakeTogether",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeTogether",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferExtraAmount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

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
    functionFragment: "addMerkleRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isClaimed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "merkleRoots",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "router", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRouter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setStakeTogether",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakeTogether",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferExtraAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
}

export namespace AddMerkleRootEvent {
  export type InputTuple = [reportBlock: BigNumberish, merkleRoot: BytesLike];
  export type OutputTuple = [reportBlock: bigint, merkleRoot: string];
  export interface OutputObject {
    reportBlock: bigint;
    merkleRoot: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ClaimEvent {
  export type InputTuple = [
    blockNumber: BigNumberish,
    index: BigNumberish,
    account: AddressLike,
    sharesAmount: BigNumberish,
    merkleProof: BytesLike[]
  ];
  export type OutputTuple = [
    blockNumber: bigint,
    index: bigint,
    account: string,
    sharesAmount: bigint,
    merkleProof: string[]
  ];
  export interface OutputObject {
    blockNumber: bigint;
    index: bigint;
    account: string;
    sharesAmount: bigint;
    merkleProof: string[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ClaimBatchEvent {
  export type InputTuple = [
    claimer: AddressLike,
    numClaims: BigNumberish,
    totalAmount: BigNumberish
  ];
  export type OutputTuple = [
    claimer: string,
    numClaims: bigint,
    totalAmount: bigint
  ];
  export interface OutputObject {
    claimer: string;
    numClaims: bigint;
    totalAmount: bigint;
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

export namespace SetRouterEvent {
  export type InputTuple = [router: AddressLike];
  export type OutputTuple = [router: string];
  export interface OutputObject {
    router: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SetStakeTogetherEvent {
  export type InputTuple = [stakeTogether: AddressLike];
  export type OutputTuple = [stakeTogether: string];
  export interface OutputObject {
    stakeTogether: string;
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

export interface Airdrop extends BaseContract {
  connect(runner?: ContractRunner | null): Airdrop;
  waitForDeployment(): Promise<this>;

  interface: AirdropInterface;

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

  ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  UPGRADER_ROLE: TypedContractMethod<[], [string], "view">;

  UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], "view">;

  addMerkleRoot: TypedContractMethod<
    [_reportBlock: BigNumberish, _root: BytesLike],
    [void],
    "nonpayable"
  >;

  claim: TypedContractMethod<
    [
      _reportBlock: BigNumberish,
      _index: BigNumberish,
      _account: AddressLike,
      _sharesAmount: BigNumberish,
      merkleProof: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;

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

  initialize: TypedContractMethod<[], [void], "nonpayable">;

  isClaimed: TypedContractMethod<
    [_blockNumber: BigNumberish, _index: BigNumberish],
    [boolean],
    "view"
  >;

  merkleRoots: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  proxiableUUID: TypedContractMethod<[], [string], "view">;

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

  router: TypedContractMethod<[], [string], "view">;

  setRouter: TypedContractMethod<[_router: AddressLike], [void], "nonpayable">;

  setStakeTogether: TypedContractMethod<
    [_stakeTogether: AddressLike],
    [void],
    "nonpayable"
  >;

  stakeTogether: TypedContractMethod<[], [string], "view">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  transferExtraAmount: TypedContractMethod<[], [void], "nonpayable">;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  upgradeToAndCall: TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;

  version: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

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
    nameOrSignature: "addMerkleRoot"
  ): TypedContractMethod<
    [_reportBlock: BigNumberish, _root: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<
    [
      _reportBlock: BigNumberish,
      _index: BigNumberish,
      _account: AddressLike,
      _sharesAmount: BigNumberish,
      merkleProof: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;
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
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isClaimed"
  ): TypedContractMethod<
    [_blockNumber: BigNumberish, _index: BigNumberish],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "merkleRoots"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
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
    nameOrSignature: "router"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setRouter"
  ): TypedContractMethod<[_router: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setStakeTogether"
  ): TypedContractMethod<[_stakeTogether: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stakeTogether"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "transferExtraAmount"
  ): TypedContractMethod<[], [void], "nonpayable">;
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
    nameOrSignature: "version"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "AddMerkleRoot"
  ): TypedContractEvent<
    AddMerkleRootEvent.InputTuple,
    AddMerkleRootEvent.OutputTuple,
    AddMerkleRootEvent.OutputObject
  >;
  getEvent(
    key: "Claim"
  ): TypedContractEvent<
    ClaimEvent.InputTuple,
    ClaimEvent.OutputTuple,
    ClaimEvent.OutputObject
  >;
  getEvent(
    key: "ClaimBatch"
  ): TypedContractEvent<
    ClaimBatchEvent.InputTuple,
    ClaimBatchEvent.OutputTuple,
    ClaimBatchEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
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
    key: "SetRouter"
  ): TypedContractEvent<
    SetRouterEvent.InputTuple,
    SetRouterEvent.OutputTuple,
    SetRouterEvent.OutputObject
  >;
  getEvent(
    key: "SetStakeTogether"
  ): TypedContractEvent<
    SetStakeTogetherEvent.InputTuple,
    SetStakeTogetherEvent.OutputTuple,
    SetStakeTogetherEvent.OutputObject
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
    "AddMerkleRoot(uint256,bytes32)": TypedContractEvent<
      AddMerkleRootEvent.InputTuple,
      AddMerkleRootEvent.OutputTuple,
      AddMerkleRootEvent.OutputObject
    >;
    AddMerkleRoot: TypedContractEvent<
      AddMerkleRootEvent.InputTuple,
      AddMerkleRootEvent.OutputTuple,
      AddMerkleRootEvent.OutputObject
    >;

    "Claim(uint256,uint256,address,uint256,bytes32[])": TypedContractEvent<
      ClaimEvent.InputTuple,
      ClaimEvent.OutputTuple,
      ClaimEvent.OutputObject
    >;
    Claim: TypedContractEvent<
      ClaimEvent.InputTuple,
      ClaimEvent.OutputTuple,
      ClaimEvent.OutputObject
    >;

    "ClaimBatch(address,uint256,uint256)": TypedContractEvent<
      ClaimBatchEvent.InputTuple,
      ClaimBatchEvent.OutputTuple,
      ClaimBatchEvent.OutputObject
    >;
    ClaimBatch: TypedContractEvent<
      ClaimBatchEvent.InputTuple,
      ClaimBatchEvent.OutputTuple,
      ClaimBatchEvent.OutputObject
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

    "SetRouter(address)": TypedContractEvent<
      SetRouterEvent.InputTuple,
      SetRouterEvent.OutputTuple,
      SetRouterEvent.OutputObject
    >;
    SetRouter: TypedContractEvent<
      SetRouterEvent.InputTuple,
      SetRouterEvent.OutputTuple,
      SetRouterEvent.OutputObject
    >;

    "SetStakeTogether(address)": TypedContractEvent<
      SetStakeTogetherEvent.InputTuple,
      SetStakeTogetherEvent.OutputTuple,
      SetStakeTogetherEvent.OutputObject
    >;
    SetStakeTogether: TypedContractEvent<
      SetStakeTogetherEvent.InputTuple,
      SetStakeTogetherEvent.OutputTuple,
      SetStakeTogetherEvent.OutputObject
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