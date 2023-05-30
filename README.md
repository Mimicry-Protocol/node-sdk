<p align="center">
  <a href="https://mimicry.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Mimicry-Protocol/brand-assets/main/animated-logos/Gifs/Web-Res/Circles/Mimicry_logo-color-black_circle_bg-animated.gif">
      <img src="https://raw.githubusercontent.com/Mimicry-Protocol/brand-assets/main/animated-logos/Gifs/Web-Res/Circles/Mimicry_logo-color-black_circle_bg-animated.gif" height="128">
    </picture>
    <h1 align="center">Mimicry - Node SDK</h1>
  </a>
</p>
<p align="center">
  <a aria-label="License" href="LICENSE">
    <img src="https://badgen.net/badge/license/GPLv3/pink">
  </a>&nbsp;
  <a aria-label="Size Test" href="https://github.com/Mimicry-Protocol/node-sdk/actions/workflows/size.yml">
    <img alt="" src="https://github.com/Mimicry-Protocol/node-sdk/actions/workflows/size.yml/badge.svg">
  </a>&nbsp;
  <a aria-label="CI Test" href="https://github.com/Mimicry-Protocol/node-sdk/actions/workflows/main.yml">
    <img alt="" src="https://github.com/Mimicry-Protocol/node-sdk/actions/workflows/main.yml/badge.svg">
  </a>
</p>

This NPM library provides convenient access to smart contracts used by the Mimicry Protocol. 

The intended audience is professional traders and market makers who wish to programmatically manage positions, and application developers who wish to integrate Mimicry Markets into their apps.

## Installation
Run `yarn add @mimicry/mimicry-sdk@latest` to install the SDK.

## Setup
The SDK allows developers to instantiate an instance in a few lines of code. For example:
```typescript
import { Mimicry, ChainId, Direction } from "@mimicry/mimicry-sdk";
import { ethers } from "ethers";
import 'dotenv/config';

const privateKey = process.env.PRIVATE_KEY;
const providerUrl = process.env.PROVIDER_URL;
const provider = new ethers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(privateKey, provider);
const mimicry = new Mimicry(signer, ChainId.MUMBAI);
```

## Usage
The SDK provides a number of methods to interact with the Mimicry Protocol. See [`./example/`](https://github.com/Mimicry-Protocol/node-sdk/blob/main/example/) for a full example.

Here is a summary of the methods available:

### Currencies - [link to Currency class](https://github.com/Mimicry-Protocol/node-sdk/blob/main/src/lib/mimicry/currency.ts)
```typescript
// Get all supported currencies
const currencies = await mimicry.getCurrencies();

// Get a specific currency by address
const mockUsdc = await mimicry.getCurrency('0x123'); 

// Get currency name, symbol, address, decimals
const infoObject = await mockUsdc.getInfo(); 

// Approve spending of a currency; 
// note this is done automatically when opening a position
const tx = await mockUsdc.approveSpending('0x456', 10.50); 
```

### Markets - [link to Market class](https://github.com/Mimicry-Protocol/node-sdk/blob/main/src/lib/mimicry/market.ts)
```typescript
// Get all known markets
const markets = await mimicry.getMarkets();

// Get one market
const remilio = await mimicry.getMarket('0x123');

// Get market name, address, description, image, metric, reference value, and skew of deposited capital
const marketInfo = await remilio.getInfo();

// Get market price history
const priceHistory = await remilio.getTicks();

// Open a position
const tx = await remilio.openPosition(Direction.SHORT, mockUsdc, 13.75);

// Close a specific position
const tx = await remilio.closePosition(15);

// Commit a value transfer in a market based on the current skew
const tx = await remilio.commitValueTransfer();

// Get the value of a specific position
const positionValue = await remilio.getPositionValue(28);
```


## For Contributors

To run TSDX, use:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

- Use `yarn build` to do a one-off build.
- Use `yarn analyize` to fix linting issues, run tests, and check distribution size.
- Use `yarn publish` to publish to NPM. Note there is a weird quirk where you need to commit and sync the `package.json` version number at the start of the process, before entering the NPM 2FA code. Otherwise, the version number will be out of sync with the published package.


## Roadmap
- [ ] Add support for returning the token id and url when opening a position
- [ ] Add support for querying a market's price history as candles with pagination and filtering
- [ ] Add support for subgraph querying a player's position history with pagination and filtering
- [ ] Add support for subgraph querying a market's position history with pagination and filtering
- [ ] Add support for adding new markets
- [ ] Add support for editing market name, description, or image
- [ ] Add support for querying markets more efficiently
- [ ] Add support for subgraph querying player earning statistics