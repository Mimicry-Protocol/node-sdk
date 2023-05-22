import { Signer, Contract } from 'ethers';
import * as MimicryABI from './abi/mimicry.json';
// import { Market } from './market';
// import { MarketInfo } from '../types';

export class Mimicry {
  private signer: Signer;
  private contract: Contract;

  constructor(_signer: Signer, _network: number) {
    this.signer = _signer;

    this.contract = new Contract(
      '0x3fF86EEc088ea07464E5329db10f94AC859be633',
      MimicryABI.abi as any,
      _signer
    );

    if (__DEV__) {
      console.log('MimicrySDK constructor');
    }
  }

  public async getMarkets() {
    const markets = await this.contract.getMarkets();
    return markets;
  }

  // ---- MARKETS ---------------------------------------------------------------
  // public async addMarket(_info: MarketInfo): Promise<Market> {
  //     return new Market(this.signer, _info);
  // }
  // public async getMarkets(): Promise<Market[]> {
  //     const markets = await this.factory.getMarkets();
  //     return [];
  // }
  // public async getMarket(_address: string): Promise<Market> {
  //     const marketInfo = await this.factory.getMarkets();
  //     return Market;
  // }

  // ---- CURRENCIES ------------------------------------------------------------
  // public async getCurrencies(): Promise<Currency[]> { return []; }
  // public async getCurrency(_address: string): Promise<Currency> {}

  // ---- PLAYERS ---------------------------------------------------------------
  // public async getPlayers(): Promise<Player[]> { return []; }
  // public async getPlayer(_address: string): Promise<Player> {}
}
