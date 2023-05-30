import { Mimicry, ChainId, Direction, Timeframe } from '../dist/index.js';
// import { Mimicry, ChainId } from '@mimicry/sdk';
import { ethers } from "ethers";
import 'dotenv/config';

try {
    const privateKey = process.env.PRIVATE_KEY;
    const providerUrl = process.env.PROVIDER_URL;
    if (!privateKey || !providerUrl) {
        throw new Error('Please set PRIVATE_KEY and PROVIDER_URL in the .env file');
    }

    const provider = new ethers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);
    const mimicry = new Mimicry(signer, ChainId.MUMBAI);

    // const mockUsdc = await mimicry.getCurrency('0x7bc699a078b3A6FD386835b3b5C9a10BF53f894C');
    // console.log(await mockUsdc.getInfo());
    
    const remilio = await mimicry.getMarket('0x1887c38229e4f87768fddc847ce70dec7ddf7cb6');
    // console.log(await remilio.getInfo());

    console.log(await remilio.getTicks());
    console.log(await remilio.getOHLCV(Timeframe.FIVE_MINUTES));

    // console.log("\nPosition Value:");
    // console.log(await remilio.getPositionValue(28));

    // console.log(await milady.closePosition(14));
    // console.log(await remilio.openPosition(Direction.SHORT, mockUsdc, 13.75));

    // console.log(await remilio.commitValueTransfer());

} catch (error) {
    console.log(error);
}