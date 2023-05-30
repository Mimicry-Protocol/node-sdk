import { Contract } from 'ethers';
import { Timeframe } from '../../../enums';
import { IOHLCV } from 'candlestick-convert';


export abstract class AbstractOracle {
  abstract getOHLCV(_timeframe: Timeframe): Promise<IOHLCV[]>;
  abstract getContract(): Contract;
  abstract getLatestValue(): Promise<any>;
  abstract getMetadata(): any;
  abstract getTicks(): Promise<any>;
  abstract validate(_metadata: any): void;
}
