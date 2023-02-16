import { ethers } from "ethers";
import ora from "ora";
import {
  WormholeAndSignerReceiver__factory,
  WormholeAndSignerSender__factory,
} from "../contracts";
import addressToEmitter from "../utils/addressToEmitter";
import {
  ETH_RPC,
  ETH_SCAN,
  ETH_WORMHOLE,
  OPT_RPC,
  OPT_SCAN,
  OPT_WORMHOLE,
} from "../utils/consts";
import updateDeployments from "../utils/updateDeployments";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is required!");

(async () => {
  let log;
  log = ora("Deploying Sender on Ethereum").start();
  const ethProvider = new ethers.providers.JsonRpcProvider(ETH_RPC);
  const ethSigner = new ethers.Wallet(PRIVATE_KEY, ethProvider);
  const ethFactory = new WormholeAndSignerSender__factory(ethSigner);
  const ethContract = await ethFactory.deploy(ETH_WORMHOLE);
  log.succeed();
  console.log(`${ETH_SCAN}/tx/${ethContract.deployTransaction.hash}`);
  console.log(`${ETH_SCAN}/address/${ethContract.address}\n`);

  log = ora("Deploying Receiver on Optimism").start();
  const optProvider = new ethers.providers.JsonRpcProvider(OPT_RPC);
  const optSigner = new ethers.Wallet(PRIVATE_KEY, optProvider);
  const optFactory = new WormholeAndSignerReceiver__factory(optSigner);
  const optContract = await optFactory.deploy(
    OPT_WORMHOLE,
    2,
    `0x${addressToEmitter(ethContract.address)}`,
    ethSigner.address
  );
  log.succeed();
  console.log(`${OPT_SCAN}/tx/${optContract.deployTransaction.hash}`);
  console.log(`${OPT_SCAN}/address/${optContract.address}\n`);

  await updateDeployments(
    "wormholeAndSigner",
    ethContract.address,
    optContract.address
  );
})();
