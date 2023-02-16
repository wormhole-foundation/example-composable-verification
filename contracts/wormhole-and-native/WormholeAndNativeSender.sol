// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";
import { IWormhole } from "../interfaces/IWormhole.sol";
import "../shared/Messages.sol";

contract WormholeAndNativeSender is Messages {
  /// Optimism L1-L2 bridge from https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli
  address public crossDomainMessengerAddr =
    0x5086d1eEF304eb5284A0f6720f79403b4e9bE294;
  /// Optimism bridge requires a recipient address so the message can be relayed
  address public receiverL2Addr;
  /// Address of the Wormhole core contract on this chain
  IWormhole public immutable wormhole;
  /// Stores the last message sent
  string public message;

  /// @param _wormhole The address of the Wormhole core contract
  constructor(address _wormhole) {
    wormhole = IWormhole(_wormhole);
  }

  /// One time setup used to set the receiver address required by the native bridge
  /// Could have done a deterministic deploy but this works for an example
  /// @param _receiverL2Addr The address of the receiving contract on Optimism
  function nativeBridgeSetup(address _receiverL2Addr) public {
    require(receiverL2Addr == address(0), "receiver already set");
    require(
      _receiverL2Addr != address(0),
      "receiver cannot be the zero address"
    );
    receiverL2Addr = _receiverL2Addr;
  }

  /// Used to send a message
  /// @param _message The message to send
  function sendMessage(
    string memory _message
  ) public payable returns (uint64 messageSequence) {
    require(receiverL2Addr != address(0), "receiver not set");
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

    // Send the expected message hash and sequence via the native bridge
    bytes32 messageHash = keccak256(
      abi.encodePacked(encodedMessage, messageSequence)
    );
    ICrossDomainMessenger(crossDomainMessengerAddr).sendMessage(
      receiverL2Addr,
      abi.encodeWithSignature("expectPayload(bytes32)", messageHash),
      1000000 // within the free gas limit amount
    );
  }
}
