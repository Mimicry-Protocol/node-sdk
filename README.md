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

## Setup
The SDK allows developers to instantiate an instance in a few lines of code. For example:
```typescript
import { MimicrySDK } from "@mimicry/mimicry-sdk";
import { ethers } from "ethers";
import 'dotenv/config';

const privateKey = process.env.PRIVATE_KEY;
const providerUrl = process.env.PROVIDER_URL;
const provider = new ethers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(privateKey, provider);
const mimicry = new MimicrySDK(signer, 80001);
```


## For Contributors

To run TSDX, use:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

- Use `yarn build` to do a one-off build.
- Use `yarn test` to fix linting issues, run tests, and check distribution size.
- Use `yarn publish` to publish to NPM.
