// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import { WormholeAndNativeReceiver } from "../../contracts/wormhole-and-native/WormholeAndNativeReceiver.sol";

contract ContractScript is Script {
  function deployReceiver() public {
    // read environment variables
    address wormhole = vm.envAddress("WORMHOLE_ADDRESS");
    uint16 emitterChainId = uint16(vm.envUint("EMITTER_CHAIN_ID"));
    bytes32 emitterAddress = bytes32(vm.envBytes("EMITTER_ADDRESS"));

    // deploy the contract and set up the contract
    new WormholeAndNativeReceiver(wormhole, emitterChainId, emitterAddress);
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
