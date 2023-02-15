// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { IWormhole } from "../interfaces/IWormhole.sol";
import "../shared/Messages.sol";

contract WormholeReceiver is Messages {
  /// Address of the Wormhole core contract on this chain
  IWormhole public immutable wormhole;
  /// Wormhole chain id of the emitter to accept
  uint16 public immutable emitterChainId;
  /// Wormhole formatted address of the emitter to accept
  bytes32 public immutable emitterAddress;
  /// Stores the last message received
  string public message;
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
  }

  /// Used to receive a message
  /// @param _encodedMessage The encoded wormhole message (VAA) to receive
  function receiveMessage(bytes memory _encodedMessage) public {
    // call the Wormhole core contract to parse and verify the encodedMessage
    (
      IWormhole.VM memory wormholeMessage,
      bool valid,
      string memory reason
    ) = wormhole.parseAndVerifyVM(_encodedMessage);

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
}
