import { Wallet } from 'ethers';
import { Market } from './market';
import { MarketInfo } from '../types';
export declare class MimicrySDK {
    private signer;
    private factory;
    private addressBook;
    constructor(_signer: Wallet);
    createMarket(_info: MarketInfo): Promise<Market>;
    getMarkets(): Promise<void>;
    getMarket(_address: string): Promise<Market>;
}
