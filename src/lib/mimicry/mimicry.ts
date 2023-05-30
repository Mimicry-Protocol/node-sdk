import { Signer, Contract } from 'ethers';
import { ChainId, CurrencySymbol } from '../enums';
import { Currency } from './currency';
import { Market } from './market';
import { Player } from './player';
import { bigIntToValue } from '../utils/bigIntToValue';
import * as MimicryABI from './abi/mimicry.json';

export class Mimicry {
  private signer: Signer;
  private contract: Contract;
  private network: ChainId;

  constructor(_signer: Signer, _network: ChainId) {
    this.signer = _signer;
    this.network = _network;

    _signer.provider?.getBalance(_signer.getAddress()).then(balance => {
      console.log(
        'Matic Balance for Gas: ',
        bigIntToValue(balance, {
          symbol: CurrencySymbol.MATIC,
          name: 'Matic',
          decimals: BigInt(18),
        })
      );
    });

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

  public async getPlayer(_address?: string): Promise<Player> {
    if (!_address) {
      _address = await this.signer.getAddress();
    }
    return await Player.initialize(_address, this.signer, this.network);
  }
}
