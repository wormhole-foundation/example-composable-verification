// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import { WormholeAndNativeSender } from "../../contracts/wormhole-and-native/WormholeAndNativeSender.sol";

interface IWormholeAndNativeSender {
  function nativeBridgeSetup(address _receiverL2Addr) external;
}

contract ContractScript is Script {
  function deploySender() public {
    // read environment variables
    address sender = vm.envAddress("SENDER_ADDRESS");
    address receiver = vm.envAddress("RECEIVER_ADDRESS");

    IWormholeAndNativeSender(sender).nativeBridgeSetup(receiver);
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
