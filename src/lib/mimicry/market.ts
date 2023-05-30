import { Contract, Signer, ContractTransactionResponse } from 'ethers';
import { CurrencyInfo, IOHLCV, MarketInfo, Skew, Value } from '../types';
import { CurrencySymbol, Direction, OracleType, Timeframe } from '../enums';
import { Currency } from './currency';
import { Oracle } from './oracle';
import { OpenMarketsOracle } from './vendors/oracles/openMarketsOracle';
import { bigIntToValue } from '../utils/bigIntToValue';
import { numberToBigInt } from '../utils/numberToBigInt';
import * as MarketABI from './abi/market.json';

export class Market {
  private contract: Contract;
  private signer: Signer;
  private metadata?: any;
  private oracle?: Oracle;

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

  public async getMetadata(force: boolean = false): Promise<any> {
    if (this.metadata && !force) {
      return this.metadata;
    }

    const url = await this.contract.metadataURI();
    if (__DEV__) {
      console.log(`Market Metadata URL: ${url}`);
    }
    const response = await fetch(url);
    const json = await response.json();
    this.metadata = json;
    return json;
  }

  public async getAddress(): Promise<string> {
    return await this.contract.getAddress();
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

  // ---- ORACLE --------------------------------------------------------------
  public async getReferenceValue(_currencyInfo: CurrencyInfo): Promise<Value> {
    return bigIntToValue(await this.contract.getIndexValue(), _currencyInfo);
  }

  public async getOracle(): Promise<Oracle> {
    if (this.oracle) {
      return this.oracle;
    }
    const metadata = await this.getMetadata();
    if (metadata.oracle.type !== OracleType.OMO) {
      throw new Error('Only OMO oracles are supported');
    }
    const oracle = await OpenMarketsOracle.initialize(
      metadata.oracle,
      this.signer
    );
    this.oracle = oracle;
    return oracle;
  }

  public async getTicks(): Promise<any> {
    const oracle = await this.getOracle();
    return await oracle.getTicks();
  }

  public async getOHLCV(_timeframe: Timeframe): Promise<IOHLCV[]> {
    const oracle = await this.getOracle();
    return await oracle.getOHLCV(_timeframe);
  }

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

    const tx = await this.contract.closePosition(_positionId);
    return await tx.wait();
  }

  public async openPosition(
    _direction: Direction,
    _currency: Currency,
    _amount: number
  ): Promise<ContractTransactionResponse[]> {
    const txApproveReceipt = await _currency.approveSpending(
      await this.getAddress(),
      _amount
    );
    const currencyInfo = await _currency.getInfo();
    const amount = numberToBigInt(_amount, currencyInfo);

    const tx = await this.contract.openPosition(
      _direction,
      currencyInfo.address,
      amount
    );
    const txOpenPositionReceipt = await tx.wait();
    return [txApproveReceipt, txOpenPositionReceipt];
  }

  // public async increasePosition(
  //   _positionId: number,
  //   _amount: BigInt
  // ): Promise<ContractTransactionResponse> {
  //   // TODO: Get the currency used to open the position
  //   // TODO: Account for spending approvals
  //   if (await !this.contract.isPositionEditable(_positionId)) {
  //     throw new Error('Position is not editable.');
  //   }

  //   const tx = await this.contract.increasePosition(_positionId, _amount);
  //   return await tx.wait();
  // }

  // ---- VALUE TRANSFERS -----------------------------------------------------
  public async commitValueTransfer(): Promise<ContractTransactionResponse> {
    const tx = await this.contract.commitValueTransfer();
    return await tx.wait();
  }
}
