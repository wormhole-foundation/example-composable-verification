// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import { NativeSender } from "../../contracts/native-only/NativeSender.sol";

contract ContractScript is Script {
  function deploySender() public {
    // deploy the contract and set up the contract
    new NativeSender();
  }

  function run() public {
    // begin sending transactions
    vm.startBroadcast();

    // Sender.sol
    console.log("Deploying sender contract");
    deploySender();

    // finished
    vm.stopBroadcast();
  }
}
