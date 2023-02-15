/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ContractScript,
  ContractScriptInterface,
} from "../../deploy_receiver.sol/ContractScript";

const _abi = [
  {
    inputs: [],
    name: "IS_SCRIPT",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deployReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "run",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260048054600160ff199182168117909255600c8054909116909117905534801561002d57600080fd5b506118ae8061003d6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063841f902414610046578063c040622614610050578063f8ccbf4714610058575b600080fd5b61004e610079565b005b61004e6102a4565b600c546100659060ff1681565b604051901515815260200160405180910390f35b60405163350d56bf60e01b815260206004820152601060248201526f574f524d484f4c455f4144445245535360801b6044820152600090737109709ecfa91a80626ff3989d68f67f5b1dd12d9063350d56bf90606401602060405180830381865afa1580156100ec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610110919061044c565b60405163c1978d1f60e01b815260206004820152601060248201526f1153525515115497d0d210525397d25160821b6044820152909150600090737109709ecfa91a80626ff3989d68f67f5b1dd12d9063c1978d1f90606401602060405180830381865afa158015610186573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101aa919061047c565b6040516326bdd78360e11b815260206004820152600f60248201526e454d49545445525f4144445245535360881b6044820152909150600090737109709ecfa91a80626ff3989d68f67f5b1dd12d90634d7baf0690606401600060405180830381865afa15801561021f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261024791908101906104cf565b6102509061057c565b90508282826040516102619061043f565b6001600160a01b03909316835261ffff90911660208301526040820152606001604051809103906000f08015801561029d573d6000803e3d6000fd5b5050505050565b7f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b0316637fb5297f6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561030257600080fd5b505af1158015610316573d6000803e3d6000fd5b505050506103586040518060400160405280601b81526020017f4465706c6f79696e6720726563656976657220636f6e747261637400000000008152506103d8565b610360610079565b7f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b03166376eadd366040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156103be57600080fd5b505af11580156103d2573d6000803e3d6000fd5b50505050565b61041b816040516024016103ec91906105a3565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b17905261041e565b50565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b6112a2806105d783390190565b60006020828403121561045e57600080fd5b81516001600160a01b038116811461047557600080fd5b9392505050565b60006020828403121561048e57600080fd5b5051919050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156104c65781810151838201526020016104ae565b50506000910152565b6000602082840312156104e157600080fd5b815167ffffffffffffffff808211156104f957600080fd5b818401915084601f83011261050d57600080fd5b81518181111561051f5761051f610495565b604051601f8201601f19908116603f0116810190838211818310171561054757610547610495565b8160405282815287602084870101111561056057600080fd5b6105718360208301602088016104ab565b979650505050505050565b8051602080830151919081101561059d576000198160200360031b1b821691505b50919050565b60208152600082518060208401526105c28160408501602087016104ab565b601f01601f1916919091016040019291505056fe61010060405234801561001157600080fd5b506040516112a23803806112a283398101604081905261003091610055565b6001600160a01b0392831660805261ffff90911660a05260c08190521660e0526100ab565b60008060006060848603121561006a57600080fd5b83516001600160a01b038116811461008157600080fd5b602085015190935061ffff8116811461009957600080fd5b80925050604084015190509250925092565b60805160a05160c05160e0516111a261010060003960008181610102015261023601526000818161019d01526105db0152600081816101c4015261056801526000818161017601526104b001526111a26000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806384acd1bb1161007157806384acd1bb1461017157806398542ae214610198578063afbbef50146101bf578063c0d4a135146101f9578063e21f37ce14610219578063f953cec71461022157600080fd5b80630b0021f5146100ae57806339bc3c81146100ca5780634a07f03c146100fd5780634ef82d691461013c578063634d45b214610151575b600080fd5b6100b760015481565b6040519081526020015b60405180910390f35b6100ed6100d83660046109f9565b60026020526000908152604090205460ff1681565b60405190151581526020016100c1565b6101247f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016100c1565b61014f61014a3660046109f9565b610234565b005b61016461015f366004610b0c565b6102b7565b6040516100c19190610bad565b6101247f000000000000000000000000000000000000000000000000000000000000000081565b6100b77f000000000000000000000000000000000000000000000000000000000000000081565b6101e67f000000000000000000000000000000000000000000000000000000000000000081565b60405161ffff90911681526020016100c1565b61020c610207366004610be7565b6103c0565b6040516100c19190610c94565b61020c61041b565b61014f61022f366004610b0c565b6104a9565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661026661074d565b6001600160a01b0316146102b25760405162461bcd60e51b815260206004820152600e60248201526d34b73b30b634b21039b2b73232b960911b60448201526064015b60405180910390fd5b600155565b60408051808201909152600081526060602082015260006102d8838261082d565b60ff168083526001146103215760405162461bcd60e51b81526020600482015260116024820152701a5b9d985b1a59081c185e5b1bd8591251607a1b60448201526064016102a9565b61032c600182610cae565b9050600061033a848361088f565b61ffff16905061034b600283610cae565b9150600061035a8584846108ec565b60208501819052905061036d8284610cae565b9250845183146103b85760405162461bcd60e51b81526020600482015260166024820152750d2dcecc2d8d2c840dacae6e6c2ceca40d8cadccee8d60531b60448201526064016102a9565b505050919050565b6060600082602001516040516020016103d99190610ccf565b6040516020818303038152906040529050826000015181518260405160200161040493929190610ceb565b604051602081830303815290604052915050919050565b6000805461042890610d35565b80601f016020809104026020016040519081016040528092919081815260200182805461045490610d35565b80156104a15780601f10610476576101008083540402835291602001916104a1565b820191906000526020600020905b81548152906001019060200180831161048457829003601f168201915b505050505081565b60008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663c0fd8bde856040518263ffffffff1660e01b81526004016104fa9190610c94565b600060405180830381865afa158015610517573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261053f9190810190610edc565b9250925092508181906105655760405162461bcd60e51b81526004016102a99190610c94565b507f000000000000000000000000000000000000000000000000000000000000000061ffff16836060015161ffff16146105d95760405162461bcd60e51b815260206004820152601560248201527434b73b30b634b21032b6b4ba3a32b91031b430b4b760591b60448201526064016102a9565b7f000000000000000000000000000000000000000000000000000000000000000083608001511461064c5760405162461bcd60e51b815260206004820152601760248201527f696e76616c696420656d6974746572206164647265737300000000000000000060448201526064016102a9565b6001548360e00151805190602001201461069d5760405162461bcd60e51b81526020600482015260126024820152711d5b995e1c1958dd1959081c185e5b1bd85960721b60448201526064016102a9565b60006106ac8460e001516102b7565b61014085015160009081526002602052604090205490915060ff16156107145760405162461bcd60e51b815260206004820152601860248201527f6d65737361676520616c726561647920636f6e73756d6564000000000000000060448201526064016102a9565b60208101516000906107269082611083565b505050610140909101516000908152600260205260409020805460ff191660011790555050565b6000804660010361076f57507325ace71c97b33cc4729cf772ae268934f7ab5fa15b4660050361078e5750735086d1eef304eb5284a0f6720f79403b4e9be2945b46600a148061079e5750466101a4145b156107ad57506007602160991b015b336001600160a01b038216146107c557600091505090565b806001600160a01b0316636e296e456040518163ffffffff1660e01b8152600401602060405180830381865afa158015610803573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108279190611143565b91505090565b600061083a826001610cae565b835110156108805760405162461bcd60e51b8152602060048201526013602482015272746f55696e74385f6f75744f66426f756e647360681b60448201526064016102a9565b50818101600101515b92915050565b600061089c826002610cae565b835110156108e35760405162461bcd60e51b8152602060048201526014602482015273746f55696e7431365f6f75744f66426f756e647360601b60448201526064016102a9565b50016002015190565b6060816108fa81601f610cae565b10156109395760405162461bcd60e51b815260206004820152600e60248201526d736c6963655f6f766572666c6f7760901b60448201526064016102a9565b6109438284610cae565b845110156109875760405162461bcd60e51b8152602060048201526011602482015270736c6963655f6f75744f66426f756e647360781b60448201526064016102a9565b6060821580156109a657604051915060008252602082016040526109f0565b6040519150601f8416801560200281840101858101878315602002848b0101015b818310156109df5780518352602092830192016109c7565b5050858452601f01601f1916604052505b50949350505050565b600060208284031215610a0b57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff81118282101715610a4b57610a4b610a12565b60405290565b604051610160810167ffffffffffffffff81118282101715610a4b57610a4b610a12565b604051601f8201601f1916810167ffffffffffffffff81118282101715610a9e57610a9e610a12565b604052919050565b600067ffffffffffffffff821115610ac057610ac0610a12565b50601f01601f191660200190565b6000610ae1610adc84610aa6565b610a75565b9050828152838383011115610af557600080fd5b828260208301376000602084830101529392505050565b600060208284031215610b1e57600080fd5b813567ffffffffffffffff811115610b3557600080fd5b8201601f81018413610b4657600080fd5b610b5584823560208401610ace565b949350505050565b60005b83811015610b78578181015183820152602001610b60565b50506000910152565b60008151808452610b99816020860160208601610b5d565b601f01601f19169290920160200192915050565b6020815260ff825116602082015260006020830151604080840152610b556060840182610b81565b60ff81168114610be457600080fd5b50565b600060208284031215610bf957600080fd5b813567ffffffffffffffff80821115610c1157600080fd5b9083019060408286031215610c2557600080fd5b604051604081018181108382111715610c4057610c40610a12565b6040528235610c4e81610bd5565b8152602083013582811115610c6257600080fd5b80840193505085601f840112610c7757600080fd5b610c8686843560208601610ace565b602082015295945050505050565b602081526000610ca76020830184610b81565b9392505050565b8082018082111561088957634e487b7160e01b600052601160045260246000fd5b60008251610ce1818460208701610b5d565b9190910192915050565b60f884901b6001600160f81b031916815260f083901b6001600160f01b03191660018201528151600090610d26816003850160208701610b5d565b91909101600301949350505050565b600181811c90821680610d4957607f821691505b602082108103610d6957634e487b7160e01b600052602260045260246000fd5b50919050565b8051610d7a81610bd5565b919050565b805163ffffffff81168114610d7a57600080fd5b805161ffff81168114610d7a57600080fd5b805167ffffffffffffffff81168114610d7a57600080fd5b600082601f830112610dce57600080fd5b8151610ddc610adc82610aa6565b818152846020838601011115610df157600080fd5b610b55826020830160208701610b5d565b600082601f830112610e1357600080fd5b8151602067ffffffffffffffff821115610e2f57610e2f610a12565b610e3d818360051b01610a75565b82815260079290921b84018101918181019086841115610e5c57600080fd5b8286015b84811015610ec15760808189031215610e795760008081fd5b610e81610a28565b815181528482015185820152604080830151610e9c81610bd5565b90820152606082810151610eaf81610bd5565b90820152835291830191608001610e60565b509695505050505050565b80518015158114610d7a57600080fd5b600080600060608486031215610ef157600080fd5b835167ffffffffffffffff80821115610f0957600080fd5b908501906101608288031215610f1e57600080fd5b610f26610a51565b610f2f83610d6f565b8152610f3d60208401610d7f565b6020820152610f4e60408401610d7f565b6040820152610f5f60608401610d93565b606082015260808301516080820152610f7a60a08401610da5565b60a0820152610f8b60c08401610d6f565b60c082015260e083015182811115610fa257600080fd5b610fae89828601610dbd565b60e083015250610100610fc2818501610d7f565b908201526101208381015183811115610fda57600080fd5b610fe68a828701610e02565b91830191909152506101408381015190820152945061100760208701610ecc565b9350604086015191508082111561101d57600080fd5b5061102a86828701610dbd565b9150509250925092565b601f82111561107e57600081815260208120601f850160051c8101602086101561105b5750805b601f850160051c820191505b8181101561107a57828155600101611067565b5050505b505050565b815167ffffffffffffffff81111561109d5761109d610a12565b6110b1816110ab8454610d35565b84611034565b602080601f8311600181146110e657600084156110ce5750858301515b600019600386901b1c1916600185901b17855561107a565b600085815260208120601f198616915b82811015611115578886015182559484019460019091019084016110f6565b50858210156111335787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006020828403121561115557600080fd5b81516001600160a01b0381168114610ca757600080fdfea26469706673582212207c881bad73504acdc7bfa4b1f2006190dff5756039ab6b8fb8ef3158488c0c1d64736f6c63430008120033a2646970667358221220bef6271da54e751d8d8480383125879d6dbb87e14acd567b7fc293004614836f64736f6c63430008120033";

type ContractScriptConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ContractScriptConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ContractScript__factory extends ContractFactory {
  constructor(...args: ContractScriptConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractScript> {
    return super.deploy(overrides || {}) as Promise<ContractScript>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ContractScript {
    return super.attach(address) as ContractScript;
  }
  override connect(signer: Signer): ContractScript__factory {
    return super.connect(signer) as ContractScript__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ContractScriptInterface {
    return new utils.Interface(_abi) as ContractScriptInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ContractScript {
    return new Contract(address, _abi, signerOrProvider) as ContractScript;
  }
}
