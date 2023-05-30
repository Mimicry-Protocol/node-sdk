import { isAddress, Contract } from 'ethers';
import { OracleType, Timeframe } from '../enums';

export class Oracle  {
    private contract: Contract;
    private metadata: any;

    constructor(_contract: Contract, _metadata: any) {
        this.validate(_metadata);
        this.contract = _contract;
        this.metadata = _metadata;
    }

    static intialize(): Promise<Oracle> {
        throw new Error('intialize() method not implemented.');
    }

    getCandles(timeframe: Timeframe): Promise<any> {
        if (__DEV__) {
            console.log(`Oracle.getCandles(${timeframe})`);
        }
        throw new Error('getCandles() method not implemented.');
    }

    getContract(): Contract {
        return this.contract;
    }

    getMetadata(): any {
        return this.metadata;
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