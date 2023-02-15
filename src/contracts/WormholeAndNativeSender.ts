/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace Messages {
  export type UpdateMessageStruct = {
    payloadID: PromiseOrValue<BigNumberish>;
    message: PromiseOrValue<string>;
  };

  export type UpdateMessageStructOutput = [number, string] & {
    payloadID: number;
    message: string;
  };
}

export interface WormholeAndNativeSenderInterface extends utils.Interface {
  functions: {
    "crossDomainMessengerAddr()": FunctionFragment;
    "decodeMessage(bytes)": FunctionFragment;
    "encodeMessage((uint8,string))": FunctionFragment;
    "message()": FunctionFragment;
    "nativeBridgeSetup(address)": FunctionFragment;
    "receiverL2Addr()": FunctionFragment;
    "sendMessage(string)": FunctionFragment;
    "wormhole()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "crossDomainMessengerAddr"
      | "decodeMessage"
      | "encodeMessage"
      | "message"
      | "nativeBridgeSetup"
      | "receiverL2Addr"
      | "sendMessage"
      | "wormhole"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "crossDomainMessengerAddr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decodeMessage",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeMessage",
    values: [Messages.UpdateMessageStruct]
  ): string;
  encodeFunctionData(functionFragment: "message", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nativeBridgeSetup",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "receiverL2Addr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sendMessage",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "wormhole", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "crossDomainMessengerAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "message", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nativeBridgeSetup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receiverL2Addr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wormhole", data: BytesLike): Result;

  events: {};
}

export interface WormholeAndNativeSender extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WormholeAndNativeSenderInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    crossDomainMessengerAddr(overrides?: CallOverrides): Promise<[string]>;

    decodeMessage(
      encodedMessage: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [Messages.UpdateMessageStructOutput] & {
        parsedMessage: Messages.UpdateMessageStructOutput;
      }
    >;

    encodeMessage(
      parsedMessage: Messages.UpdateMessageStruct,
      overrides?: CallOverrides
    ): Promise<[string] & { encodedMessage: string }>;

    message(overrides?: CallOverrides): Promise<[string]>;

    nativeBridgeSetup(
      _receiverL2Addr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    receiverL2Addr(overrides?: CallOverrides): Promise<[string]>;

    sendMessage(
      _message: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    wormhole(overrides?: CallOverrides): Promise<[string]>;
  };

  crossDomainMessengerAddr(overrides?: CallOverrides): Promise<string>;

  decodeMessage(
    encodedMessage: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<Messages.UpdateMessageStructOutput>;

  encodeMessage(
    parsedMessage: Messages.UpdateMessageStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  message(overrides?: CallOverrides): Promise<string>;

  nativeBridgeSetup(
    _receiverL2Addr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  receiverL2Addr(overrides?: CallOverrides): Promise<string>;

  sendMessage(
    _message: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  wormhole(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    crossDomainMessengerAddr(overrides?: CallOverrides): Promise<string>;

    decodeMessage(
      encodedMessage: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<Messages.UpdateMessageStructOutput>;

    encodeMessage(
      parsedMessage: Messages.UpdateMessageStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    message(overrides?: CallOverrides): Promise<string>;

    nativeBridgeSetup(
      _receiverL2Addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    receiverL2Addr(overrides?: CallOverrides): Promise<string>;

    sendMessage(
      _message: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wormhole(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    crossDomainMessengerAddr(overrides?: CallOverrides): Promise<BigNumber>;

    decodeMessage(
      encodedMessage: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeMessage(
      parsedMessage: Messages.UpdateMessageStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    message(overrides?: CallOverrides): Promise<BigNumber>;

    nativeBridgeSetup(
      _receiverL2Addr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    receiverL2Addr(overrides?: CallOverrides): Promise<BigNumber>;

    sendMessage(
      _message: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    wormhole(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    crossDomainMessengerAddr(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decodeMessage(
      encodedMessage: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeMessage(
      parsedMessage: Messages.UpdateMessageStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    message(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nativeBridgeSetup(
      _receiverL2Addr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    receiverL2Addr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sendMessage(
      _message: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    wormhole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}