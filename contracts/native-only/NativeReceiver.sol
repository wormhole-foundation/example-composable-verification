// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";
import "../shared/Messages.sol";

contract NativeReceiver is Messages {
  /// Sender contract address for confirming validity of native bridge messages
  address public immutable l1SenderAddress;
  /// Stores the expected payload hash
  bytes32 public expectedPayloadHash;

  /// @param _emitterAddress The emitter address to accept message from
  constructor(address _emitterAddress) {
    l1SenderAddress = _emitterAddress;
  }

  /// Used by the native bridge to set the expected payload hash
  /// This signature must match the ICrossDomainMessenger.sendMessage call in the Sender
  /// @param _expectedPayloadHash The hash of the expected payload for the corresponding Wormhole message
  function expectPayload(bytes32 _expectedPayloadHash) public {
    require(getXorig() == l1SenderAddress, "invalid sender");
    expectedPayloadHash = _expectedPayloadHash;
  }

  // Get the cross domain origin, if any
  // From https://github.com/ethereum-optimism/optimism-tutorial/blob/main/cross-dom-comm/hardhat/contracts/Greeter.sol
  function getXorig() private view returns (address) {
    // Get the cross domain messenger's address each time.
    // This is less resource intensive than writing to storage.
    address cdmAddr = address(0);

    // Mainnet
    if (block.chainid == 1)
      cdmAddr = 0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1;

    // Goerli
    if (block.chainid == 5)
      cdmAddr = 0x5086d1eEF304eb5284A0f6720f79403b4e9bE294;

    // L2 (same address on every network)
    if (block.chainid == 10 || block.chainid == 420)
      cdmAddr = 0x4200000000000000000000000000000000000007;

    // If this isn't a cross domain message
    if (msg.sender != cdmAddr) return address(0);

    // If it is a cross domain message, find out where it is from
    return ICrossDomainMessenger(cdmAddr).xDomainMessageSender();
  }
}
