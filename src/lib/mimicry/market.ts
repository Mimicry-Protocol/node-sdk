import { Contract, Signer, ContractTransactionResponse } from 'ethers';
import { CurrencyInfo, MarketInfo, Skew, Value } from '../types';
import { CurrencySymbol, Direction } from '../enums';
import { Currency } from './currency';
import { bigIntToValue } from '../utils/bigIntToValue';
import * as MarketABI from './abi/market.json';

export class Market {
  private contract: Contract;
  private signer: Signer;

  constructor(_contract: Contract, _signer: Signer) {
    this.contract = _contract;
    this.signer = _signer;
  }

  static async initialize(_address: string, _signer: Signer): Promise<Market> {
    if (__DEV__) {
      console.log(`Initialize Market: ${_address}`);
    }

    const contract = new Contract(_address, MarketABI.abi as any, _signer);

    return new Market(contract, _signer);
  }

  // ---- MARKET INFO ---------------------------------------------------------
  public async getInfo(): Promise<MarketInfo> {
    const metadata = await this.getMetadata();
    const currencyInfo = await this.getCurrencyInfo(metadata.currency);

    const info: MarketInfo = {
      name: metadata.name,
      address: await this.getAddress(),
      description: metadata.description,
      image: metadata.image,
      metric: metadata.metric,
      referenceValue: await this.getReferenceValue(currencyInfo),
      skew: await this.getSkew(),
    };
    return info;
  }

  public async getMetadata(): Promise<any> {
    const url = await this.contract.metadataURI();
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  public async getAddress(): Promise<string> {
    return await this.contract.getAddress();
  }

  public async getReferenceValue(_currencyInfo: CurrencyInfo): Promise<Value> {
    return bigIntToValue(await this.contract.getIndexValue(), _currencyInfo);
  }

  public async getSkew(): Promise<Skew> {
    const positionValues = await this.contract.calculatePositionValues();
    const currencyInfo = await this.getCurrencyInfo(CurrencySymbol.USD);
    const long: Value = bigIntToValue(positionValues[0], currencyInfo);
    const short: Value = bigIntToValue(positionValues[1], currencyInfo);
    return {
      currency: currencyInfo,
      long: long.amount,
      short: short.amount,
    };
  }

  // TODO: Add addMarket()

  // ---- CURRENCY INFO -------------------------------------------------------
  public async getCurrencyInfo(
    _address: string | CurrencySymbol
  ): Promise<CurrencyInfo> {
    if (_address === 'usd') {
      // TODO: Remove this hack when metadata has decimals
      return {
        name: 'US Dollar',
        symbol: CurrencySymbol.USD,
        decimals: BigInt(0),
      };
    } else if (_address === CurrencySymbol.USD) {
      return {
        name: 'US Dollar',
        symbol: CurrencySymbol.USD,
        decimals: BigInt(8),
      };
    }

    const currency = await Currency.initialize(_address, this.signer);
    return await currency.getInfo();
  }

  // ---- POSITIONS -----------------------------------------------------------
  public async getPositionValue(_positionId: number): Promise<Value> {
    const currencyInfo = await this.getCurrencyInfo(CurrencySymbol.USD);
    return bigIntToValue(
      await this.contract.getPositionValue(_positionId),
      currencyInfo
    );
  }

  public async closePosition(
    _positionId: number
  ): Promise<ContractTransactionResponse> {
    if (await !this.contract.isPositionEditable(_positionId)) {
      throw new Error('Position is not editable.');
    }
    if (await !this.contract.isPositionLiquidated(_positionId)) {
      throw new Error('Position has been liquidated.');
    }

    return await this.contract.closePosition(_positionId);
  }

  // public async openPosition(
  //   _direction: Direction,
  //   _currencyAddress: string,
  //   _amount: BigInt
  // ): Promise<ContractTransactionResponse> {
  //   // TODO: Account for spending approvals
  //   return await this.contract.openPosition(
  //     _direction,
  //     _currencyAddress,
  //     _amount
  //   );
  // }

  // public async increasePosition(
  //   _positionId: number,
  //   _amount: BigInt
  // ): Promise<ContractTransactionResponse> {
  //   // TODO: Account for spending approvals
  //   if (await !this.contract.isPositionEditable(_positionId)) {
  //     throw new Error('Position is not editable.');
  //   }

  //   return await this.contract.increasePosition(_positionId, _amount);
  // }

  // ---- VALUE TRANSFERS -----------------------------------------------------
  public async commitValueTransfer(): Promise<ContractTransactionResponse> {
    return await this.contract.commitValueTransfer();
  }
}
