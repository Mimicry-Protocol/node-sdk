import { Signer, Contract } from 'ethers';
import * as MimicryABI from './abi/mimicry.json';
import { Market } from './market';
import { Currency } from './currency';
import { ChainId } from '../enums';

export class Mimicry {
  private signer: Signer;
  private contract: Contract;

  constructor(_signer: Signer, _network: ChainId) {
    this.signer = _signer;

    const _address =
      _network === ChainId.POLYGON_POS
        ? '0x5aeDa339237eE646aFbDbc7E9E9eBab15f7660D9' // Mainnet
        : '0x3fF86EEc088ea07464E5329db10f94AC859be633'; // Mumbai

    this.contract = new Contract(_address, MimicryABI.abi as any, _signer);

    if (__DEV__) {
      console.log('Mimicry Constructor');
    }
  }

  // ---- MARKETS ---------------------------------------------------------------
  public async getMarkets(): Promise<Market[]> {
    const marketAddresses = await this.contract.getMarkets();
    let markets = [];
    for (const address of marketAddresses) {
      const market = await this.getMarket(address);
      markets.push(market);
    }
    return markets;
  }

  public async getMarket(_address: string): Promise<Market> {
    return await Market.initialize(_address, this.signer);
  }

  // ---- CURRENCIES ------------------------------------------------------------
  public async getCurrencies(): Promise<Currency[]> {
    const currencyAddresses = await this.contract.getValidCurrenciesList();
    let currencies = [];
    for (const address of currencyAddresses) {
      const currency = await this.getCurrency(address);
      currencies.push(currency);
    }
    return currencies;
  }

  public async getCurrency(_address: string): Promise<Currency> {
    return await Currency.initialize(_address, this.signer);
  }

  // ---- PLAYERS ---------------------------------------------------------------
  // public async getPlayers(): Promise<Player[]> { return []; }
  // public async getPlayer(_address: string): Promise<Player> {}
}
