import { ethers } from "ethers";
import { NativeReceiver__factory, NativeSender__factory } from "./contracts";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is required!");
const SENDER_ADDRESS = process.env.SENDER_ADDRESS;
if (!SENDER_ADDRESS) throw new Error("SENDER_ADDRESS is required!");
const RECIEVER_ADDRESS = process.env.RECEIVER_ADDRESS;
if (!RECIEVER_ADDRESS) throw new Error("RECIEVER_ADDRESS is required!");

(async () => {
  console.log("Step 1. Send a message");
  const ethProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );
  const ethSigner = new ethers.Wallet(PRIVATE_KEY, ethProvider);
  const ethContract = NativeSender__factory.connect(SENDER_ADDRESS, ethSigner);
  const ethTx = await ethContract.sendMessage("hello world");
  const ethReceipt = await ethTx.wait();
  console.log(ethReceipt.transactionHash);

  console.log("Step 2. Check if message to arrived");
  const optProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/optimism_testnet"
  );
  const optContract = NativeReceiver__factory.connect(
    RECIEVER_ADDRESS,
    optProvider
  );
  console.log("received:", await optContract.expectedPayloadHash());
})();
