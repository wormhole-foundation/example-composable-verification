// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";
import { IWormhole } from "../interfaces/IWormhole.sol";
import "../shared/Messages.sol";

contract WormholeAndNativeReceiver is Messages {
  /// Address of the Wormhole core contract on this chain
  IWormhole public immutable wormhole;
  /// Wormhole chain id of the emitter to accept
  uint16 public immutable emitterChainId;
  /// Wormhole formatted address of the emitter to accept
  bytes32 public immutable emitterAddress;
  /// Sender contract address for confirming validity of native bridge messages
  address public immutable l1SenderAddress;
  /// Stores the last message received
  string public message;
  /// Stores the expected payload hash
  bytes32 public expectedPayloadHash;
  /// Verified message hash to boolean
  mapping(bytes32 => bool) public consumedMessages;

  /// @param _wormhole The address of the Wormhole core contract
  /// @param _emitterChainId The emitter chain id to accept messages from
  /// @param _emitterAddress The emitter address to accept message from
  constructor(
    address _wormhole,
    uint16 _emitterChainId,
    bytes32 _emitterAddress
  ) {
    wormhole = IWormhole(_wormhole);
    emitterChainId = _emitterChainId;
    emitterAddress = _emitterAddress;
    l1SenderAddress = address(uint160(uint256(_emitterAddress)));
  }

  /// Used by the native bridge to set the expected payload hash
  /// This signature must match the ICrossDomainMessenger.sendMessage call in the Sender
  /// @param _expectedPayloadHash The hash of the expected payload for the corresponding Wormhole message
  function expectPayload(bytes32 _expectedPayloadHash) public {
    require(getXorig() == l1SenderAddress, "invalid sender");
    expectedPayloadHash = _expectedPayloadHash;
  }

  /// Used to receive a message
  /// @param _vaa The encoded wormhole message (VAA) to receive
  function receiveMessage(bytes memory _vaa) public {
    // call the Wormhole core contract to parse and verify the encodedMessage
    (
      IWormhole.VM memory wormholeMessage,
      bool valid,
      string memory reason
    ) = wormhole.parseAndVerifyVM(_vaa);

    // confirm that the Wormhole core contract verified the message
    require(valid, reason);

    // verify that this message was emitted by a registered emitter
    require(
      wormholeMessage.emitterChainId == emitterChainId,
      "invalid emitter chain"
    );
    require(
      wormholeMessage.emitterAddress == emitterAddress,
      "invalid emitter address"
    );

    // verify that the payload and sequence is the one we expected
    require(
      keccak256(
        abi.encodePacked(wormholeMessage.payload, wormholeMessage.sequence)
      ) == expectedPayloadHash,
      "unexpected payload"
    );

    // decode the message payload into the UpdateMessage struct
    UpdateMessage memory parsedMessage = decodeMessage(wormholeMessage.payload);

    /**
     * Check to see if this message has been consumed already. If not,
     * save the parsed message in the receivedMessages mapping.
     *
     * This check can protect against replay attacks in xDapps where messages are
     * only meant to be consumed once.
     */
    require(
      !consumedMessages[wormholeMessage.hash],
      "message already consumed"
    );
    message = parsedMessage.message;
    consumedMessages[wormholeMessage.hash] = true;
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
