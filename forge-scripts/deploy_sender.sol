// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import { Sender } from "../src/wormhole-only/Sender.sol";

contract ContractScript is Script {
  function deploySender() public {
    // read environment variables
    address wormhole = vm.envAddress("WORMHOLE_ADDRESS");

    // deploy the contract and set up the contract
    new Sender(wormhole);
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
