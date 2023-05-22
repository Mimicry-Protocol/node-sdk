import { Mimicry, ChainId } from '../dist/index.js';
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

    const mockUsdc = await mimicry.getCurrency('0x7bc699a078b3A6FD386835b3b5C9a10BF53f894C');
    console.log(await mockUsdc.getInfo());
    
    const milady = await mimicry.getMarket('0x36833452D397EEc74D98d423C154B85332E65eB2');
    console.log(await milady.getInfo());

    console.log("\nPosition Value:");
    console.log(await milady.getPositionValue(14));

} catch (error) {
    console.log(error);
}