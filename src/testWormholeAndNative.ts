import axios from "axios";
import { ethers } from "ethers";
import {
  WormholeAndNativeReceiver__factory,
  WormholeAndNativeSender__factory,
} from "./contracts";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is required!");
const SENDER_ADDRESS = process.env.SENDER_ADDRESS;
if (!SENDER_ADDRESS) throw new Error("SENDER_ADDRESS is required!");
const RECIEVER_ADDRESS = process.env.RECEIVER_ADDRESS;
if (!RECIEVER_ADDRESS) throw new Error("RECIEVER_ADDRESS is required!");
const SENDER_EMITTER = SENDER_ADDRESS.slice(2).toLowerCase().padStart(64, "0");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  // console.log("Step 1. Send a message");
  // const ethProvider = new ethers.providers.JsonRpcProvider(
  //   "https://rpc.ankr.com/eth_goerli"
  // );
  // const ethSigner = new ethers.Wallet(PRIVATE_KEY, ethProvider);
  // const ethContract = WormholeAndNativeSender__factory.connect(
  //   SENDER_ADDRESS,
  //   ethSigner
  // );
  // const ethTx = await ethContract.sendMessage("hello world");
  // const ethReceipt = await ethTx.wait();
  // console.log(ethReceipt.transactionHash);
  // const sequence = BigInt(`${ethReceipt.logs[0].data.slice(0, 66)}`);
  const sequence = 0;
  console.log(`Step 2. Fetching VAA 2/${SENDER_EMITTER}/${sequence}`);
  let vaa = "";
  while (!vaa) {
    await sleep(5000);
    try {
      const response = await axios.get(
        `https://wormhole-v2-testnet-api.certus.one/v1/signed_vaa/2/${SENDER_EMITTER}/${sequence}`
      );
      vaa = Buffer.from(response.data.vaaBytes, "base64").toString("hex");
    } catch (e) {}
  }
  console.log(vaa);

  console.log("Step 3. Receive the message");
  const optProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/optimism_testnet"
  );
  const optSigner = new ethers.Wallet(PRIVATE_KEY, optProvider);
  const optContract = WormholeAndNativeReceiver__factory.connect(
    RECIEVER_ADDRESS,
    optSigner
  );
  const optTx = await optContract.receiveMessage(`0x${vaa}`);
  const optReceipt = await optTx.wait();
  console.log(optReceipt.transactionHash);
  console.log("received:", await optContract.message());
})();
