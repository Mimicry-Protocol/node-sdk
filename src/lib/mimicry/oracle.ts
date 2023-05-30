import { isAddress, Contract } from 'ethers';
import { resampleTicksByTime } from 'ohlc-resample';
import { OracleType, Timeframe } from '../enums';
import { IOHLCV, Tick } from '../types';

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

  getOHLCVFromTicks(_ticks: Tick[], _timeframe: Timeframe): IOHLCV[] {
    if (__DEV__) {
      console.log(`Oracle.getOHLCVFromTicks(${_timeframe})`);
    }
    const candles = resampleTicksByTime(_ticks, {
      timeframe: _timeframe,
      includeLatestCandle: false,
      fillGaps: true,
    });

    return candles;
  }

  getContract(): Contract {
    return this.contract;
  }

  getMetadata(): any {
    return this.metadata;
  }

  getTick(_time: BigInt, _price: BigInt, _quantity?: BigInt): Tick {
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
