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
  Listener
} from 'ethers'
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod
} from '../../../common'

export declare namespace IRouter {
  export type ReportStruct = {
    reportBlock: BigNumberish
    merkleRoot: BytesLike
    profitAmount: BigNumberish
    profitShares: BigNumberish
    lossAmount: BigNumberish
    withdrawAmount: BigNumberish
    withdrawRefundAmount: BigNumberish
    accumulatedReports: BigNumberish
  }

  export type ReportStructOutput = [
    reportBlock: bigint,
    merkleRoot: string,
    profitAmount: bigint,
    profitShares: bigint,
    lossAmount: bigint,
    withdrawAmount: bigint,
    withdrawRefundAmount: bigint,
    accumulatedReports: bigint
  ] & {
    reportBlock: bigint
    merkleRoot: string
    profitAmount: bigint
    profitShares: bigint
    lossAmount: bigint
    withdrawAmount: bigint
    withdrawRefundAmount: bigint
    accumulatedReports: bigint
  }

  export type ConfigStruct = {
    reportFrequency: BigNumberish
    reportDelayBlock: BigNumberish
    reportNoConsensusMargin: BigNumberish
    oracleQuorum: BigNumberish
  }

  export type ConfigStructOutput = [
    reportFrequency: bigint,
    reportDelayBlock: bigint,
    reportNoConsensusMargin: bigint,
    oracleQuorum: bigint
  ] & {
    reportFrequency: bigint
    reportDelayBlock: bigint
    reportNoConsensusMargin: bigint
    oracleQuorum: bigint
  }
}

export interface IRouterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'addReportOracle'
      | 'addSentinel'
      | 'blacklistReportOracle'
      | 'executeReport'
      | 'forceNextReportBlock'
      | 'getReportHash'
      | 'initialize'
      | 'isReadyToExecute'
      | 'isReadyToSubmit'
      | 'isReportOracle'
      | 'isReportOracleBlackListed'
      | 'pause'
      | 'receiveWithdrawEther'
      | 'removeReportOracle'
      | 'removeSentinel'
      | 'reportBlock'
      | 'revokeConsensusReport'
      | 'setConfig'
      | 'setStakeTogether'
      | 'submitReport'
      | 'unBlacklistReportOracle'
      | 'unpause'
  ): FunctionFragment

  getEvent(
    nameOrSignatureOrTopic:
      | 'AddReportOracle'
      | 'AdvanceNextBlock'
      | 'BlacklistReportOracle'
      | 'ConsensusApprove'
      | 'ConsensusFail'
      | 'ExecuteReport'
      | 'ReceiveEther'
      | 'ReceiveWithdrawEther'
      | 'RemoveReportOracle'
      | 'RevokeConsensusReport'
      | 'SetBunkerMode'
      | 'SetConfig'
      | 'SetStakeTogether'
      | 'SubmitReport'
      | 'UnBlacklistReportOracle'
  ): EventFragment

  encodeFunctionData(functionFragment: 'addReportOracle', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'addSentinel', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'blacklistReportOracle', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'executeReport', values: [IRouter.ReportStruct]): string
  encodeFunctionData(functionFragment: 'forceNextReportBlock', values?: undefined): string
  encodeFunctionData(functionFragment: 'getReportHash', values: [IRouter.ReportStruct]): string
  encodeFunctionData(functionFragment: 'initialize', values: [AddressLike, AddressLike]): string
  encodeFunctionData(functionFragment: 'isReadyToExecute', values: [IRouter.ReportStruct]): string
  encodeFunctionData(functionFragment: 'isReadyToSubmit', values: [IRouter.ReportStruct]): string
  encodeFunctionData(functionFragment: 'isReportOracle', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'isReportOracleBlackListed', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'pause', values?: undefined): string
  encodeFunctionData(functionFragment: 'receiveWithdrawEther', values?: undefined): string
  encodeFunctionData(functionFragment: 'removeReportOracle', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'removeSentinel', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'reportBlock', values?: undefined): string
  encodeFunctionData(functionFragment: 'revokeConsensusReport', values: [BigNumberish]): string
  encodeFunctionData(functionFragment: 'setConfig', values: [IRouter.ConfigStruct]): string
  encodeFunctionData(functionFragment: 'setStakeTogether', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'submitReport', values: [IRouter.ReportStruct]): string
  encodeFunctionData(functionFragment: 'unBlacklistReportOracle', values: [AddressLike]): string
  encodeFunctionData(functionFragment: 'unpause', values?: undefined): string

  decodeFunctionResult(functionFragment: 'addReportOracle', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'addSentinel', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'blacklistReportOracle', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'executeReport', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'forceNextReportBlock', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getReportHash', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isReadyToExecute', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isReadyToSubmit', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isReportOracle', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isReportOracleBlackListed', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'pause', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'receiveWithdrawEther', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'removeReportOracle', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'removeSentinel', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'reportBlock', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'revokeConsensusReport', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setConfig', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setStakeTogether', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'submitReport', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'unBlacklistReportOracle', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'unpause', data: BytesLike): Result
}

export namespace AddReportOracleEvent {
  export type InputTuple = [reportOracle: AddressLike]
  export type OutputTuple = [reportOracle: string]
  export interface OutputObject {
    reportOracle: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace AdvanceNextBlockEvent {
  export type InputTuple = [reportBlock: BigNumberish, reportNextBlock: BigNumberish]
  export type OutputTuple = [reportBlock: bigint, reportNextBlock: bigint]
  export interface OutputObject {
    reportBlock: bigint
    reportNextBlock: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace BlacklistReportOracleEvent {
  export type InputTuple = [reportOracle: AddressLike]
  export type OutputTuple = [reportOracle: string]
  export interface OutputObject {
    reportOracle: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace ConsensusApproveEvent {
  export type InputTuple = [reportBlock: BigNumberish, report: IRouter.ReportStruct]
  export type OutputTuple = [reportBlock: bigint, report: IRouter.ReportStructOutput]
  export interface OutputObject {
    reportBlock: bigint
    report: IRouter.ReportStructOutput
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace ConsensusFailEvent {
  export type InputTuple = [reportBlock: BigNumberish, report: IRouter.ReportStruct]
  export type OutputTuple = [reportBlock: bigint, report: IRouter.ReportStructOutput]
  export interface OutputObject {
    reportBlock: bigint
    report: IRouter.ReportStructOutput
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace ExecuteReportEvent {
  export type InputTuple = [sender: AddressLike, reportBlock: BigNumberish, report: IRouter.ReportStruct]
  export type OutputTuple = [sender: string, reportBlock: bigint, report: IRouter.ReportStructOutput]
  export interface OutputObject {
    sender: string
    reportBlock: bigint
    report: IRouter.ReportStructOutput
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

export namespace RemoveReportOracleEvent {
  export type InputTuple = [reportOracle: AddressLike]
  export type OutputTuple = [reportOracle: string]
  export interface OutputObject {
    reportOracle: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace RevokeConsensusReportEvent {
  export type InputTuple = [sender: AddressLike, reportBlock: BigNumberish]
  export type OutputTuple = [sender: string, reportBlock: bigint]
  export interface OutputObject {
    sender: string
    reportBlock: bigint
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace SetBunkerModeEvent {
  export type InputTuple = [bunkerMode: boolean]
  export type OutputTuple = [bunkerMode: boolean]
  export interface OutputObject {
    bunkerMode: boolean
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace SetConfigEvent {
  export type InputTuple = [config: IRouter.ConfigStruct]
  export type OutputTuple = [config: IRouter.ConfigStructOutput]
  export interface OutputObject {
    config: IRouter.ConfigStructOutput
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

export namespace SubmitReportEvent {
  export type InputTuple = [sender: AddressLike, report: IRouter.ReportStruct]
  export type OutputTuple = [sender: string, report: IRouter.ReportStructOutput]
  export interface OutputObject {
    sender: string
    report: IRouter.ReportStructOutput
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export namespace UnBlacklistReportOracleEvent {
  export type InputTuple = [reportOracle: AddressLike]
  export type OutputTuple = [reportOracle: string]
  export interface OutputObject {
    reportOracle: string
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  export type Filter = TypedDeferredTopicFilter<Event>
  export type Log = TypedEventLog<Event>
  export type LogDescription = TypedLogDescription<Event>
}

export interface IRouter extends BaseContract {
  connect(runner?: ContractRunner | null): IRouter
  waitForDeployment(): Promise<this>

  interface: IRouterInterface

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

  addReportOracle: TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>

  addSentinel: TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>

  blacklistReportOracle: TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>

  executeReport: TypedContractMethod<[_report: IRouter.ReportStruct], [void], 'nonpayable'>

  forceNextReportBlock: TypedContractMethod<[], [void], 'nonpayable'>

  getReportHash: TypedContractMethod<[_report: IRouter.ReportStruct], [string], 'view'>

  initialize: TypedContractMethod<[_airdrop: AddressLike, _withdrawals: AddressLike], [void], 'nonpayable'>

  isReadyToExecute: TypedContractMethod<[_report: IRouter.ReportStruct], [string], 'view'>

  isReadyToSubmit: TypedContractMethod<[_report: IRouter.ReportStruct], [string], 'view'>

  isReportOracle: TypedContractMethod<[_account: AddressLike], [boolean], 'nonpayable'>

  isReportOracleBlackListed: TypedContractMethod<[_account: AddressLike], [boolean], 'view'>

  pause: TypedContractMethod<[], [void], 'nonpayable'>

  receiveWithdrawEther: TypedContractMethod<[], [void], 'payable'>

  removeReportOracle: TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>

  removeSentinel: TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>

  reportBlock: TypedContractMethod<[], [bigint], 'view'>

  revokeConsensusReport: TypedContractMethod<[_reportBlock: BigNumberish], [void], 'nonpayable'>

  setConfig: TypedContractMethod<[_config: IRouter.ConfigStruct], [void], 'nonpayable'>

  setStakeTogether: TypedContractMethod<[_stakeTogether: AddressLike], [void], 'nonpayable'>

  submitReport: TypedContractMethod<[_report: IRouter.ReportStruct], [void], 'nonpayable'>

  unBlacklistReportOracle: TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>

  unpause: TypedContractMethod<[], [void], 'nonpayable'>

  getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T

  getFunction(nameOrSignature: 'addReportOracle'): TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'addSentinel'): TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'blacklistReportOracle'): TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'executeReport'): TypedContractMethod<[_report: IRouter.ReportStruct], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'forceNextReportBlock'): TypedContractMethod<[], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'getReportHash'): TypedContractMethod<[_report: IRouter.ReportStruct], [string], 'view'>
  getFunction(nameOrSignature: 'initialize'): TypedContractMethod<[_airdrop: AddressLike, _withdrawals: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'isReadyToExecute'): TypedContractMethod<[_report: IRouter.ReportStruct], [string], 'view'>
  getFunction(nameOrSignature: 'isReadyToSubmit'): TypedContractMethod<[_report: IRouter.ReportStruct], [string], 'view'>
  getFunction(nameOrSignature: 'isReportOracle'): TypedContractMethod<[_account: AddressLike], [boolean], 'nonpayable'>
  getFunction(nameOrSignature: 'isReportOracleBlackListed'): TypedContractMethod<[_account: AddressLike], [boolean], 'view'>
  getFunction(nameOrSignature: 'pause'): TypedContractMethod<[], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'receiveWithdrawEther'): TypedContractMethod<[], [void], 'payable'>
  getFunction(nameOrSignature: 'removeReportOracle'): TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'removeSentinel'): TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'reportBlock'): TypedContractMethod<[], [bigint], 'view'>
  getFunction(nameOrSignature: 'revokeConsensusReport'): TypedContractMethod<[_reportBlock: BigNumberish], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'setConfig'): TypedContractMethod<[_config: IRouter.ConfigStruct], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'setStakeTogether'): TypedContractMethod<[_stakeTogether: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'submitReport'): TypedContractMethod<[_report: IRouter.ReportStruct], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'unBlacklistReportOracle'): TypedContractMethod<[_account: AddressLike], [void], 'nonpayable'>
  getFunction(nameOrSignature: 'unpause'): TypedContractMethod<[], [void], 'nonpayable'>

  getEvent(
    key: 'AddReportOracle'
  ): TypedContractEvent<AddReportOracleEvent.InputTuple, AddReportOracleEvent.OutputTuple, AddReportOracleEvent.OutputObject>
  getEvent(
    key: 'AdvanceNextBlock'
  ): TypedContractEvent<AdvanceNextBlockEvent.InputTuple, AdvanceNextBlockEvent.OutputTuple, AdvanceNextBlockEvent.OutputObject>
  getEvent(
    key: 'BlacklistReportOracle'
  ): TypedContractEvent<
    BlacklistReportOracleEvent.InputTuple,
    BlacklistReportOracleEvent.OutputTuple,
    BlacklistReportOracleEvent.OutputObject
  >
  getEvent(
    key: 'ConsensusApprove'
  ): TypedContractEvent<ConsensusApproveEvent.InputTuple, ConsensusApproveEvent.OutputTuple, ConsensusApproveEvent.OutputObject>
  getEvent(
    key: 'ConsensusFail'
  ): TypedContractEvent<ConsensusFailEvent.InputTuple, ConsensusFailEvent.OutputTuple, ConsensusFailEvent.OutputObject>
  getEvent(
    key: 'ExecuteReport'
  ): TypedContractEvent<ExecuteReportEvent.InputTuple, ExecuteReportEvent.OutputTuple, ExecuteReportEvent.OutputObject>
  getEvent(
    key: 'ReceiveEther'
  ): TypedContractEvent<ReceiveEtherEvent.InputTuple, ReceiveEtherEvent.OutputTuple, ReceiveEtherEvent.OutputObject>
  getEvent(
    key: 'ReceiveWithdrawEther'
  ): TypedContractEvent<ReceiveWithdrawEtherEvent.InputTuple, ReceiveWithdrawEtherEvent.OutputTuple, ReceiveWithdrawEtherEvent.OutputObject>
  getEvent(
    key: 'RemoveReportOracle'
  ): TypedContractEvent<RemoveReportOracleEvent.InputTuple, RemoveReportOracleEvent.OutputTuple, RemoveReportOracleEvent.OutputObject>
  getEvent(
    key: 'RevokeConsensusReport'
  ): TypedContractEvent<
    RevokeConsensusReportEvent.InputTuple,
    RevokeConsensusReportEvent.OutputTuple,
    RevokeConsensusReportEvent.OutputObject
  >
  getEvent(
    key: 'SetBunkerMode'
  ): TypedContractEvent<SetBunkerModeEvent.InputTuple, SetBunkerModeEvent.OutputTuple, SetBunkerModeEvent.OutputObject>
  getEvent(key: 'SetConfig'): TypedContractEvent<SetConfigEvent.InputTuple, SetConfigEvent.OutputTuple, SetConfigEvent.OutputObject>
  getEvent(
    key: 'SetStakeTogether'
  ): TypedContractEvent<SetStakeTogetherEvent.InputTuple, SetStakeTogetherEvent.OutputTuple, SetStakeTogetherEvent.OutputObject>
  getEvent(
    key: 'SubmitReport'
  ): TypedContractEvent<SubmitReportEvent.InputTuple, SubmitReportEvent.OutputTuple, SubmitReportEvent.OutputObject>
  getEvent(
    key: 'UnBlacklistReportOracle'
  ): TypedContractEvent<
    UnBlacklistReportOracleEvent.InputTuple,
    UnBlacklistReportOracleEvent.OutputTuple,
    UnBlacklistReportOracleEvent.OutputObject
  >

  filters: {
    'AddReportOracle(address)': TypedContractEvent<
      AddReportOracleEvent.InputTuple,
      AddReportOracleEvent.OutputTuple,
      AddReportOracleEvent.OutputObject
    >
    AddReportOracle: TypedContractEvent<
      AddReportOracleEvent.InputTuple,
      AddReportOracleEvent.OutputTuple,
      AddReportOracleEvent.OutputObject
    >

    'AdvanceNextBlock(uint256,uint256)': TypedContractEvent<
      AdvanceNextBlockEvent.InputTuple,
      AdvanceNextBlockEvent.OutputTuple,
      AdvanceNextBlockEvent.OutputObject
    >
    AdvanceNextBlock: TypedContractEvent<
      AdvanceNextBlockEvent.InputTuple,
      AdvanceNextBlockEvent.OutputTuple,
      AdvanceNextBlockEvent.OutputObject
    >

    'BlacklistReportOracle(address)': TypedContractEvent<
      BlacklistReportOracleEvent.InputTuple,
      BlacklistReportOracleEvent.OutputTuple,
      BlacklistReportOracleEvent.OutputObject
    >
    BlacklistReportOracle: TypedContractEvent<
      BlacklistReportOracleEvent.InputTuple,
      BlacklistReportOracleEvent.OutputTuple,
      BlacklistReportOracleEvent.OutputObject
    >

    'ConsensusApprove(uint256,tuple)': TypedContractEvent<
      ConsensusApproveEvent.InputTuple,
      ConsensusApproveEvent.OutputTuple,
      ConsensusApproveEvent.OutputObject
    >
    ConsensusApprove: TypedContractEvent<
      ConsensusApproveEvent.InputTuple,
      ConsensusApproveEvent.OutputTuple,
      ConsensusApproveEvent.OutputObject
    >

    'ConsensusFail(uint256,tuple)': TypedContractEvent<
      ConsensusFailEvent.InputTuple,
      ConsensusFailEvent.OutputTuple,
      ConsensusFailEvent.OutputObject
    >
    ConsensusFail: TypedContractEvent<ConsensusFailEvent.InputTuple, ConsensusFailEvent.OutputTuple, ConsensusFailEvent.OutputObject>

    'ExecuteReport(address,uint256,tuple)': TypedContractEvent<
      ExecuteReportEvent.InputTuple,
      ExecuteReportEvent.OutputTuple,
      ExecuteReportEvent.OutputObject
    >
    ExecuteReport: TypedContractEvent<ExecuteReportEvent.InputTuple, ExecuteReportEvent.OutputTuple, ExecuteReportEvent.OutputObject>

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

    'RemoveReportOracle(address)': TypedContractEvent<
      RemoveReportOracleEvent.InputTuple,
      RemoveReportOracleEvent.OutputTuple,
      RemoveReportOracleEvent.OutputObject
    >
    RemoveReportOracle: TypedContractEvent<
      RemoveReportOracleEvent.InputTuple,
      RemoveReportOracleEvent.OutputTuple,
      RemoveReportOracleEvent.OutputObject
    >

    'RevokeConsensusReport(address,uint256)': TypedContractEvent<
      RevokeConsensusReportEvent.InputTuple,
      RevokeConsensusReportEvent.OutputTuple,
      RevokeConsensusReportEvent.OutputObject
    >
    RevokeConsensusReport: TypedContractEvent<
      RevokeConsensusReportEvent.InputTuple,
      RevokeConsensusReportEvent.OutputTuple,
      RevokeConsensusReportEvent.OutputObject
    >

    'SetBunkerMode(bool)': TypedContractEvent<
      SetBunkerModeEvent.InputTuple,
      SetBunkerModeEvent.OutputTuple,
      SetBunkerModeEvent.OutputObject
    >
    SetBunkerMode: TypedContractEvent<SetBunkerModeEvent.InputTuple, SetBunkerModeEvent.OutputTuple, SetBunkerModeEvent.OutputObject>

    'SetConfig(tuple)': TypedContractEvent<SetConfigEvent.InputTuple, SetConfigEvent.OutputTuple, SetConfigEvent.OutputObject>
    SetConfig: TypedContractEvent<SetConfigEvent.InputTuple, SetConfigEvent.OutputTuple, SetConfigEvent.OutputObject>

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

    'SubmitReport(address,tuple)': TypedContractEvent<
      SubmitReportEvent.InputTuple,
      SubmitReportEvent.OutputTuple,
      SubmitReportEvent.OutputObject
    >
    SubmitReport: TypedContractEvent<SubmitReportEvent.InputTuple, SubmitReportEvent.OutputTuple, SubmitReportEvent.OutputObject>

    'UnBlacklistReportOracle(address)': TypedContractEvent<
      UnBlacklistReportOracleEvent.InputTuple,
      UnBlacklistReportOracleEvent.OutputTuple,
      UnBlacklistReportOracleEvent.OutputObject
    >
    UnBlacklistReportOracle: TypedContractEvent<
      UnBlacklistReportOracleEvent.InputTuple,
      UnBlacklistReportOracleEvent.OutputTuple,
      UnBlacklistReportOracleEvent.OutputObject
    >
  }
}
