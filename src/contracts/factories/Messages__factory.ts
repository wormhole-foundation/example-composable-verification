/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Messages, MessagesInterface } from "../Messages";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedMessage",
        type: "bytes",
      },
    ],
    name: "decodeMessage",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "payloadID",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct Messages.UpdateMessage",
        name: "parsedMessage",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "payloadID",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct Messages.UpdateMessage",
        name: "parsedMessage",
        type: "tuple",
      },
    ],
    name: "encodeMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "encodedMessage",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506106ab806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063634d45b21461003b578063c0d4a13514610064575b600080fd5b61004e61004936600461046e565b610084565b60405161005b919061050f565b60405180910390f35b610077610072366004610537565b610192565b60405161005b91906105d4565b60408051808201909152600081526060602082015260006100a583826101ed565b60ff168083526001146100f35760405162461bcd60e51b81526020600482015260116024820152701a5b9d985b1a59081c185e5b1bd8591251607a1b60448201526064015b60405180910390fd5b6100fe6001826105ee565b9050600061010c848361024f565b61ffff16905061011d6002836105ee565b9150600061012c8584846102ac565b60208501819052905061013f82846105ee565b92508451831461018a5760405162461bcd60e51b81526020600482015260166024820152750d2dcecc2d8d2c840dacae6e6c2ceca40d8cadccee8d60531b60448201526064016100ea565b505050919050565b6060600082602001516040516020016101ab919061060f565b604051602081830303815290604052905082600001518151826040516020016101d69392919061062b565b604051602081830303815290604052915050919050565b60006101fa8260016105ee565b835110156102405760405162461bcd60e51b8152602060048201526013602482015272746f55696e74385f6f75744f66426f756e647360681b60448201526064016100ea565b50818101600101515b92915050565b600061025c8260026105ee565b835110156102a35760405162461bcd60e51b8152602060048201526014602482015273746f55696e7431365f6f75744f66426f756e647360601b60448201526064016100ea565b50016002015190565b6060816102ba81601f6105ee565b10156102f95760405162461bcd60e51b815260206004820152600e60248201526d736c6963655f6f766572666c6f7760901b60448201526064016100ea565b61030382846105ee565b845110156103475760405162461bcd60e51b8152602060048201526011602482015270736c6963655f6f75744f66426f756e647360781b60448201526064016100ea565b60608215801561036657604051915060008252602082016040526103b0565b6040519150601f8416801560200281840101858101878315602002848b0101015b8183101561039f578051835260209283019201610387565b5050858452601f01601f1916604052505b50949350505050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156103f2576103f26103b9565b60405290565b600067ffffffffffffffff80841115610413576104136103b9565b604051601f8501601f19908116603f0116810190828211818310171561043b5761043b6103b9565b8160405280935085815286868601111561045457600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561048057600080fd5b813567ffffffffffffffff81111561049757600080fd5b8201601f810184136104a857600080fd5b6104b7848235602084016103f8565b949350505050565b60005b838110156104da5781810151838201526020016104c2565b50506000910152565b600081518084526104fb8160208601602086016104bf565b601f01601f19169290920160200192915050565b6020815260ff8251166020820152600060208301516040808401526104b760608401826104e3565b60006020828403121561054957600080fd5b813567ffffffffffffffff8082111561056157600080fd5b908301906040828603121561057557600080fd5b61057d6103cf565b823560ff8116811461058e57600080fd5b81526020830135828111156105a257600080fd5b80840193505085601f8401126105b757600080fd5b6105c6868435602086016103f8565b602082015295945050505050565b6020815260006105e760208301846104e3565b9392505050565b8082018082111561024957634e487b7160e01b600052601160045260246000fd5b600082516106218184602087016104bf565b9190910192915050565b60f884901b6001600160f81b031916815260f083901b6001600160f01b031916600182015281516000906106668160038501602087016104bf565b9190910160030194935050505056fea26469706673582212204ceed8acbb396227e876a45dbc8d562b496e6e607931beafba916bf5980fb13d64736f6c63430008120033";

type MessagesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MessagesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Messages__factory extends ContractFactory {
  constructor(...args: MessagesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Messages> {
    return super.deploy(overrides || {}) as Promise<Messages>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Messages {
    return super.attach(address) as Messages;
  }
  override connect(signer: Signer): Messages__factory {
    return super.connect(signer) as Messages__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MessagesInterface {
    return new utils.Interface(_abi) as MessagesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Messages {
    return new Contract(address, _abi, signerOrProvider) as Messages;
  }
}