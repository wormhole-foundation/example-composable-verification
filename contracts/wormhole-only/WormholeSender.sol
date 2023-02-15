// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { IWormhole } from "../interfaces/IWormhole.sol";
import "../shared/Messages.sol";

contract WormholeSender is Messages {
  /// Address of the Wormhole core contract on this chain
  IWormhole public immutable wormhole;
  /// Stores the last message sent
  string public message;

  /// @param _wormhole The address of the Wormhole core contract
  constructor(address _wormhole) {
    wormhole = IWormhole(_wormhole);
  }

  /// Used to send a message
  /// @param _message The message to send
  function sendMessage(
    string memory _message
  ) public payable returns (uint64 messageSequence) {
    // enforce a max size for the arbitrary message
    require(
      abi.encodePacked(_message).length < type(uint16).max,
      "message too large"
    );

    // create the UpdateMessage struct
    UpdateMessage memory parsedMessage = UpdateMessage({
      payloadID: uint8(1),
      message: _message
    });

    // encode the HelloWorldMessage struct into bytes
    bytes memory encodedMessage = encodeMessage(parsedMessage);

    // set the last message
    message = _message;

    // Send the UpdateMessage message by calling publishMessage on the
    // Wormhole core contract and paying the Wormhole protocol fee.
    messageSequence = wormhole.publishMessage{ value: msg.value }(
      0, // batchID
      encodedMessage,
      200 // "instant" - this is just an example, do not wait for finality
    );
  }
}
