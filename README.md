# Composable Verification Example

See [Hello World](https://github.com/wormhole-foundation/wormhole-scaffolding/blob/main/docs/01_hello_world.md) for a more complete example of sending and receiving messages.

Install dependencies

```bash
# Download and install foundryup
curl -L https://foundry.paradigm.xyz | bash
# Install foundry
foundryup
# Install forge-std
forge install foundry-rs/forge-std --no-git --no-commit
# Install prettier
npm ci
```

To use Docker for foundry dependencies

```bash
# Pull foundry image
docker pull ghcr.io/foundry-rs/foundry:latest
# Tag for shorter commands
docker tag ghcr.io/foundry-rs/foundry:latest foundry:latest
# Example build
docker run -v $PWD:/app foundry "forge build --root /app -c contracts"
```

Build the contracts and typescript bindings

```bash
forge build -c contracts
npm run typechain
```

Deploy Sender on Ethereum

```bash
WORMHOLE_ADDRESS=0x706abc4E45D419950511e474C7B9Ed348A4a716c forge script forge-scripts/deploy_sender.sol --rpc-url https://rpc.ankr.com/eth_goerli --private-key <YOUR_PRIVATE_KEY> --broadcast --slow
```

Deploy Receiver on Optimism

```bash
WORMHOLE_ADDRESS=0x6b9C8671cdDC8dEab9c719bB87cBd3e782bA6a35 EMITTER_CHAIN_ID=2 EMITTER_ADDRESS=0x<32-byte padded contract address> forge script forge-scripts/deploy_receiver.sol --rpc-url https://rpc.ankr.com/optimism_testnet --private-key <YOUR_PRIVATE_KEY> --broadcast --slow
```

Test End-to-End

```bash
SENDER_ADDRESS=<ETH_CONTRACT_ADDRESS> RECEIVER_ADDRESS=<OPT_CONTRACT_ADDRESS> PRIVATE_KEY=<YOUR_PRIVATE_KEY> npm test
```
