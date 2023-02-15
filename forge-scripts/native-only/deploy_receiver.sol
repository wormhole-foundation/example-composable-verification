// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import { NativeReceiver } from "../../contracts/native-only/NativeReceiver.sol";

contract ContractScript is Script {
  function deployReceiver() public {
    // read environment variables
    address emitterAddress = vm.envAddress("EMITTER_ADDRESS");

    // deploy the contract and set up the contract
    new NativeReceiver(emitterAddress);
  }

  function run() public {
    // begin sending transactions
    vm.startBroadcast();

    // Receiver.sol
    console.log("Deploying receiver contract");
    deployReceiver();

    // finished
    vm.stopBroadcast();
  }
}
