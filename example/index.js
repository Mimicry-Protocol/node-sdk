import { MimicrySDK, sum } from '../dist/index.js';

console.log(sum(1, 2));

import { MimicrySDK } from '../dist/index.js';
import { ethers } from "ethers";

const privateKey = process.env.PRIVATE_KEY;
const providerUrl = process.env.PROVIDER_URL;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(privateKey, provider);
const mimicry = new MimicrySDK(signer, 80001);