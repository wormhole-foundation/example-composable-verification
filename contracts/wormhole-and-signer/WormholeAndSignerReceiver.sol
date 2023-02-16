// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { IWormhole } from "../interfaces/IWormhole.sol";
import "../shared/Messages.sol";

contract WormholeAndSignerReceiver is Messages {
  /// Address of the Wormhole core contract on this chain
  IWormhole public immutable wormhole;
  /// Wormhole chain id of the emitter to accept
  uint16 public immutable emitterChainId;
  /// Wormhole formatted address of the emitter to accept
  bytes32 public immutable emitterAddress;
  /// Additional signer address for confirming validity
  address public immutable signerAddress;
  /// Stores the last message received
  string public message;
  /// Verified message hash to boolean
  mapping(bytes32 => bool) public consumedMessages;

  /// @param _wormhole The address of the Wormhole core contract
  /// @param _emitterChainId The emitter chain id to accept messages from
  /// @param _emitterAddress The emitter address to accept message from
  /// @param _signerAddress The additional signer for confirming message validity
  constructor(
    address _wormhole,
    uint16 _emitterChainId,
    bytes32 _emitterAddress,
    address _signerAddress
  ) {
    require(_signerAddress != address(0), "invalid signer");
    wormhole = IWormhole(_wormhole);
    emitterChainId = _emitterChainId;
    emitterAddress = _emitterAddress;
    signerAddress = _signerAddress;
  }

  /// Used to receive a message
  /// @param _encodedMessage The encoded wormhole message (VAA) to receive
  /// @param _additionalSignature The signature from signerAddress to additionally verify
  function receiveMessage(
    bytes memory _encodedMessage,
    bytes memory _additionalSignature
  ) public {
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

    // verify that the payload and sequence is the one we expected
    require(
      verify(
        keccak256(
          abi.encodePacked(wormholeMessage.payload, wormholeMessage.sequence)
        ),
        _additionalSignature
      ),
      "invalid additional signature"
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

  // Signature methods

  // Prevent signature replay attacks by including this chain and contract address
  // Could potentially use https://eips.ethereum.org/EIPS/eip-712
  // Wormhole messages are not targeted to a particular chain,
  // but we could add that to the Wormhole message payload instead
  // and add additional verification there
  function getSigningHash(bytes32 _messageHash) public view returns (bytes32) {
    return
      keccak256(abi.encodePacked(_messageHash, block.chainid, address(this)));
  }

  // Ensure the additional signature was signed by the designated signer
  function verify(
    bytes32 _messageHash,
    bytes memory _signature
  ) public view returns (bool) {
    bytes32 signingHash = getSigningHash(_messageHash);
    bytes32 ethSignedMessageHash = getEthSignedMessageHash(signingHash);

    return recoverSigner(ethSignedMessageHash, _signature) == signerAddress;
  }

  // From https://solidity-by-example.org/signature/

  function getEthSignedMessageHash(
    bytes32 _signingHash
  ) public pure returns (bytes32) {
    return
      keccak256(
        abi.encodePacked("\x19Ethereum Signed Message:\n32", _signingHash)
      );
  }

  function recoverSigner(
    bytes32 _ethSignedMessageHash,
    bytes memory _signature
  ) public pure returns (address) {
    (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

    return ecrecover(_ethSignedMessageHash, v, r, s);
  }

  function splitSignature(
    bytes memory _sig
  ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
    require(_sig.length == 65, "invalid signature length");

    assembly {
      r := mload(add(_sig, 32))
      s := mload(add(_sig, 64))
      v := byte(0, mload(add(_sig, 96)))
    }
  }
}
