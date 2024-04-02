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
} from "../../../common";

export interface IStakeTogetherWrapperInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "setStakeTogether"
      | "stpEthPerWstpETH"
      | "transfer"
      | "transferExtraAmount"
      | "transferFrom"
      | "unwrap"
      | "wrap"
      | "wstpETHPerStpETH"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ReceiveEther"
      | "SetStakeTogether"
      | "Unwrapped"
      | "Wrapped"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "setStakeTogether",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "stpEthPerWstpETH",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferExtraAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unwrap",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "wrap", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "wstpETHPerStpETH",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "setStakeTogether",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stpEthPerWstpETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferExtraAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unwrap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "wstpETHPerStpETH",
    data: BytesLike
  ): Result;
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

export namespace UnwrappedEvent {
  export type InputTuple = [
    user: AddressLike,
    wstpETHAmount: BigNumberish,
    stpETHAmount: BigNumberish
  ];
  export type OutputTuple = [
    user: string,
    wstpETHAmount: bigint,
    stpETHAmount: bigint
  ];
  export interface OutputObject {
    user: string;
    wstpETHAmount: bigint;
    stpETHAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WrappedEvent {
  export type InputTuple = [
    user: AddressLike,
    stpETHAmount: BigNumberish,
    wstpETHAmount: BigNumberish
  ];
  export type OutputTuple = [
    user: string,
    stpETHAmount: bigint,
    wstpETHAmount: bigint
  ];
  export interface OutputObject {
    user: string;
    stpETHAmount: bigint;
    wstpETHAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IStakeTogetherWrapper extends BaseContract {
  connect(runner?: ContractRunner | null): IStakeTogetherWrapper;
  waitForDeployment(): Promise<this>;

  interface: IStakeTogetherWrapperInterface;

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

  setStakeTogether: TypedContractMethod<
    [_stakeTogether: AddressLike],
    [void],
    "nonpayable"
  >;

  stpEthPerWstpETH: TypedContractMethod<
    [_wstpETH: BigNumberish],
    [bigint],
    "view"
  >;

  transfer: TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferExtraAmount: TypedContractMethod<[], [void], "nonpayable">;

  transferFrom: TypedContractMethod<
    [_from: AddressLike, _to: AddressLike, _amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  unwrap: TypedContractMethod<[_wstpETH: BigNumberish], [bigint], "nonpayable">;

  wrap: TypedContractMethod<[_stpETH: BigNumberish], [bigint], "nonpayable">;

  wstpETHPerStpETH: TypedContractMethod<
    [_stpETH: BigNumberish],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "setStakeTogether"
  ): TypedContractMethod<[_stakeTogether: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stpEthPerWstpETH"
  ): TypedContractMethod<[_wstpETH: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferExtraAmount"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [_from: AddressLike, _to: AddressLike, _amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "unwrap"
  ): TypedContractMethod<[_wstpETH: BigNumberish], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "wrap"
  ): TypedContractMethod<[_stpETH: BigNumberish], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "wstpETHPerStpETH"
  ): TypedContractMethod<[_stpETH: BigNumberish], [bigint], "view">;

  getEvent(
    key: "ReceiveEther"
  ): TypedContractEvent<
    ReceiveEtherEvent.InputTuple,
    ReceiveEtherEvent.OutputTuple,
    ReceiveEtherEvent.OutputObject
  >;
  getEvent(
    key: "SetStakeTogether"
  ): TypedContractEvent<
    SetStakeTogetherEvent.InputTuple,
    SetStakeTogetherEvent.OutputTuple,
    SetStakeTogetherEvent.OutputObject
  >;
  getEvent(
    key: "Unwrapped"
  ): TypedContractEvent<
    UnwrappedEvent.InputTuple,
    UnwrappedEvent.OutputTuple,
    UnwrappedEvent.OutputObject
  >;
  getEvent(
    key: "Wrapped"
  ): TypedContractEvent<
    WrappedEvent.InputTuple,
    WrappedEvent.OutputTuple,
    WrappedEvent.OutputObject
  >;

  filters: {
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

    "Unwrapped(address,uint256,uint256)": TypedContractEvent<
      UnwrappedEvent.InputTuple,
      UnwrappedEvent.OutputTuple,
      UnwrappedEvent.OutputObject
    >;
    Unwrapped: TypedContractEvent<
      UnwrappedEvent.InputTuple,
      UnwrappedEvent.OutputTuple,
      UnwrappedEvent.OutputObject
    >;

    "Wrapped(address,uint256,uint256)": TypedContractEvent<
      WrappedEvent.InputTuple,
      WrappedEvent.OutputTuple,
      WrappedEvent.OutputObject
    >;
    Wrapped: TypedContractEvent<
      WrappedEvent.InputTuple,
      WrappedEvent.OutputTuple,
      WrappedEvent.OutputObject
    >;
  };
}
