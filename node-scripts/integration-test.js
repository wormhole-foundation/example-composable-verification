const axios = require("axios");
const { ethers } = require("ethers");

const SENDER_ADDRESS = process.env.SENDER_ADDRESS;
const RECIEVER_ADDRESS = process.env.RECEIVER_ADDRESS;
const SENDER_EMITTER = SENDER_ADDRESS.slice(2).toLowerCase().padStart(64, "0");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  console.log("Step 1. Send a message");
  const ethProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );
  const ethSigner = new ethers.Wallet(process.env.PRIVATE_KEY, ethProvider);
  const ethContract = new ethers.Contract(
    SENDER_ADDRESS,
    [
      "function sendMessage(string memory _message) public payable returns (uint64 messageSequence)",
    ],
    ethSigner
  );
  const ethTx = await ethContract.sendMessage("hello world");
  const ethReceipt = await ethTx.wait();
  console.log(ethReceipt.transactionHash);
  const sequence = BigInt(`${ethReceipt.logs[0].data.slice(0, 66)}`);
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
  const optSigner = new ethers.Wallet(process.env.PRIVATE_KEY, optProvider);
  const optContract = new ethers.Contract(
    RECIEVER_ADDRESS,
    ["function receiveMessage(bytes memory _encodedMessage) public"],
    optSigner
  );
  const optTx = await optContract.receiveMessage(`0x${vaa}`);
  const optReceipt = await optTx.wait();
  console.log(optReceipt.transactionHash);
})();
