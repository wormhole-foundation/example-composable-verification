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

Deploy and test "Wormhole only" contracts

```bash
PRIVATE_KEY=<YOUR_PRIVATE_KEY> npm run deploy-wormhole-only
PRIVATE_KEY=<YOUR_PRIVATE_KEY> npm run test-wormhole-only
```

Deploy and test "Wormhole and Native" contracts

```bash
PRIVATE_KEY=<YOUR_PRIVATE_KEY> npm run deploy-wormhole-and-native
PRIVATE_KEY=<YOUR_PRIVATE_KEY> npm run test-wormhole-and-native
```
