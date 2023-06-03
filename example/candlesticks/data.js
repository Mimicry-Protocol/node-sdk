// data.js
// export const candlestickData = [
//     { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
//     { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
//     { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
//     { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
//     { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
//     { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
//     { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
//     { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
//     { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
//     { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
// ];

import { Mimicry, ChainId, Timeframe } from 'https://unpkg.com/@mimicry/sdk@1.0.5/dist/sdk.cjs.production.min.js';
import { ethers } from "https://unpkg.com/ethers@6.4.1/dist/ethers.js";
import 'https://unpkg.com/dotenv@16.1.3/config.js';

try {
    const privateKey = process.env.PRIVATE_KEY;
    const providerUrl = process.env.PROVIDER_URL;
    if (!privateKey || !providerUrl) {
        throw new Error('Please set PRIVATE_KEY and PROVIDER_URL in the .env file');
    }

    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);
    const mimicry = new Mimicry(signer, ChainId.MUMBAI);
    const remilio = await mimicry.getMarket('0x1887c38229e4f87768fddc847ce70dec7ddf7cb6');
} catch (error) {
    console.log(error);
}

export const candlestickData = await remilio.getOHLCV(Timeframe.FIVE_MINUTES);