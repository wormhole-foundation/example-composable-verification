import axios from "axios";
import { ethers } from "ethers";
import ora from "ora";
import {
  WormholeAndSignerReceiver__factory,
  WormholeAndSignerSender__factory,
} from "./contracts";
import addressToEmitter from "./utils/addressToEmitter";
import {
  ETH_RPC,
  ETH_SCAN,
  GUARDIAN_RPC,
  OPT_RPC,
  OPT_SCAN,
} from "./utils/consts";
import { DEPLOYMENTS } from "./utils/deployments";
import parseSequenceFromReceipt from "./utils/parseSequenceFromReceipt";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is required!");
const SENDER_ADDRESS = DEPLOYMENTS.wormholeAndSigner.eth;
if (!SENDER_ADDRESS) throw new Error("SENDER_ADDRESS is required!");
const RECIEVER_ADDRESS = DEPLOYMENTS.wormholeAndSigner.opt;
if (!RECIEVER_ADDRESS) throw new Error("RECIEVER_ADDRESS is required!");
const SENDER_EMITTER = addressToEmitter(SENDER_ADDRESS);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const ethProvider = new ethers.providers.JsonRpcProvider(ETH_RPC);
  const ethSigner = new ethers.Wallet(PRIVATE_KEY, ethProvider);
  const ethContract = WormholeAndSignerSender__factory.connect(
    SENDER_ADDRESS,
    ethSigner
  );
  const optProvider = new ethers.providers.JsonRpcProvider(OPT_RPC);
  const optSigner = new ethers.Wallet(PRIVATE_KEY, optProvider);
  const optContract = WormholeAndSignerReceiver__factory.connect(
    RECIEVER_ADDRESS,
    optSigner
  );

  let log;
  log = ora("Sending message from Ethereum").start();
  const ethTx = await ethContract.sendMessage("hello world");
  const ethReceipt = await ethTx.wait();
  log.succeed();
  console.log(`${ETH_SCAN}/tx/${ethReceipt.transactionHash}\n`);
  const sequence = parseSequenceFromReceipt(ethReceipt);
  const {
    args: { hash },
  } = ethContract.interface.parseLog(ethReceipt.logs[1]);

  log = ora(`Fetching VAA 2/${SENDER_EMITTER}/${sequence}`).start();
  const vaaUrl = `${GUARDIAN_RPC}/v1/signed_vaa/2/${SENDER_EMITTER}/${sequence}`;
  let vaa = "";
  while (!vaa) {
    await sleep(5000);
    try {
      const response = await axios.get(vaaUrl);
      vaa = Buffer.from(response.data.vaaBytes, "base64").toString("hex");
    } catch (e) {}
  }
  log.succeed();
  console.log(`${vaaUrl}\n`);

  const signingHash = await optContract.getSigningHash(hash);
  const additionalSignature = await ethSigner.signMessage(
    ethers.utils.arrayify(signingHash)
  );
  log = ora("Receiving message on Optimism").start();
  const optTx = await optContract.receiveMessage(
    `0x${vaa}`,
    additionalSignature
  );
  const optReceipt = await optTx.wait();
  log.succeed();
  console.log(`${OPT_SCAN}/tx/${optReceipt.transactionHash}\n`);
  console.log(`received: ${await optContract.message()}\n`);
})();
