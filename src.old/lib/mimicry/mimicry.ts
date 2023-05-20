import { Contract, Network, Wallet } from 'ethers';
import { Market } from './market';
import { MarketInfo } from '../types';
const MIMICRY_ABI = require('./abi/mimicry.json');

export class MimicrySDK {
    private signer: Wallet;
    private network: number
    private factory: Contract;

    private addressBook = {
        137: {
            mimicry: '0x123',
            factory: '0x123',
        },
        80001: {
            mimicry: '0x123',
            factory: '0x123',
        },
    };

    constructor(_signer: Wallet, _network: number) {
        this.signer = _signer;
        this.network = _network;

        this.factory = new Contract(
            this.addressBook[_network].mimicry, 
            MIMICRY_ABI, 
            this.signer
        );
    }

    // ---- MARKETS ---------------------------------------------------------------
    // public async addMarket(_info: MarketInfo): Promise<Market> {
    //     return new Market(this.signer, _info);
    // }
    public async getMarkets(): Promise<Market[]> { 
        const markets = await this.factory.getMarkets();
        return []; 
    }
    public async getMarket(_address: string): Promise<Market> {
        const marketInfo = await this.factory.getMarkets();
        return Market;
    }

    // ---- CURRENCIES ------------------------------------------------------------
    // public async getCurrencies(): Promise<Currency[]> { return []; }
    // public async getCurrency(_address: string): Promise<Currency> {}

    // ---- PLAYERS ---------------------------------------------------------------
    // public async getPlayers(): Promise<Player[]> { return []; }
    // public async getPlayer(_address: string): Promise<Player> {}
}
