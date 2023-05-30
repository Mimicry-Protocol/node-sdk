import { Contract } from 'ethers';
import { Timeframe } from '../../../enums';

export abstract class AbstractOracle  {
    abstract getCandles(timeframe: Timeframe): Promise<any>;
    abstract getContract(): Contract;
    abstract getLatestValue(): Promise<any>;
    abstract getMetadata(): any;
    abstract getTicks(): Promise<any>;
    abstract validate(_metadata: any): void;
}