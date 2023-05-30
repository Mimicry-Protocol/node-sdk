import { isAddress, Contract } from 'ethers';
import { batchTicksToCandle, ticksToTickChart, TradeTick, IOHLCV } from 'candlestick-convert';
import { OracleType, Timeframe } from '../enums';

export class Oracle {
  private contract: Contract;
  private metadata: any;

  constructor(_contract: Contract, _metadata: any) {
    this.validate(_metadata);
    this.contract = _contract;
    this.metadata = _metadata;
  }

  async getTicks(): Promise<any> {
    throw new Error('getTicks() method not implemented.');
  }

  async getOHLCV(_timeframe: Timeframe): Promise<IOHLCV[]> {
    throw new Error('getOHLCV() method not implemented.');
  }

  getOHLCVFromTicks(_ticks: TradeTick[], _timeframe: Timeframe): IOHLCV[] {
    if (__DEV__) {
      console.log(`Oracle.getOHLCVFromTicks(${_timeframe})`);
    }
    const candles = batchTicksToCandle(_ticks, 60, true);
    console.log(candles);
    const ohlcv = ticksToTickChart(_ticks, 100);
    return ohlcv;
  }

  getContract(): Contract {
    return this.contract;
  }

  getMetadata(): any {
    return this.metadata;
  }

  getTick(_time: BigInt, _price: BigInt, _quantity?: BigInt): TradeTick {
    if (!_quantity) {
      _quantity = BigInt(0);
    }
    return {
      time: Number(_time),
      price: Number(_price),
      quantity: Number(_quantity),
    };
  }

  validate(_metadata: any): void {
    if (!Object.values(OracleType).includes(_metadata.type)) {
      throw new Error('metadata.type must be a valid OracleType');
    }
    if (!isAddress(_metadata.address)) {
      throw new Error('metadata.address must be a valid address');
    }
    if (__DEV__) {
      console.log(`Oracle.validate() passed.`);
    }
  }
}
