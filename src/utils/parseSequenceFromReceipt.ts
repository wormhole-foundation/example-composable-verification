import { ContractReceipt } from "ethers";

// This just parses where the sequence would be if the first log is from Wormhole
// Since the contracts are in this repo, this is known to be the case
// In most cases it would be better to use the wormhole sdk,
// But this is included for transparency sake.
export default function parseSequenceFromReceipt(receipt: ContractReceipt) {
  return BigInt(`${receipt.logs[0].data.slice(0, 66)}`);
}
