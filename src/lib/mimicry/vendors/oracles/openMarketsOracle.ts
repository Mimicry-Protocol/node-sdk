import { Contract, Signer } from 'ethers';
import { AbstractOracle } from './abstractOracle';
import { OracleType } from '../../../enums';
import { Oracle } from '../../oracle';

export class OpenMarketsOracle extends Oracle implements AbstractOracle {
  private dataFeedId: number;

  constructor(_contract: Contract, _metadata: any) {
    super(_contract, _metadata);
    this.dataFeedId = _metadata.dataFeedId;
  }

  static async initialize(
    _metadata: any,
    _signer: Signer
  ): Promise<OpenMarketsOracle> {
    if (__DEV__) {
      console.log(`Initialize OpenMarketsOracle with metadata:`);
      console.log(_metadata);
    }
    const abi = [
      'function getValues(uint256 dataFeedId, uint256 limit, uint256 offset) view returns ((uint256, uint256)[])',
      'function getLatestValue(uint256 dataFeedId) view returns (uint256, uint256)',
    ];

    const contract = new Contract(_metadata.address, abi as any, _signer);
    return new OpenMarketsOracle(contract, _metadata);
  }

  async getLatestValue(): Promise<any> {
    return await this.getContract().getLatestValue(this.dataFeedId);
  }

  async getTicks(): Promise<any> {
    let offset = 0;
    let limit = 1000;
    let allValues: any[] = [];
    let done: boolean = false;
    while (!done) {
      const values = await this.getContract().getValues(
        this.dataFeedId,
        limit,
        offset
      );
      if (values.length < limit || values.length === 0) {
        done = true;
      }
      allValues = allValues.concat(values);
      offset += limit;
      if (__DEV__) {
        console.log(`Offset: ${offset}`);
      }
    }

    return allValues;
  }

  validate(_metadata: any): void {
    super.validate(_metadata);
    if (_metadata.type !== OracleType.OMO) {
      throw new Error('metadata.type must be "open-markets-oracle"');
    }
    if (_metadata.dataFeedId < 1) {
      throw new Error('Must provide a valid dataFeedId for the oracle');
    }
    if (__DEV__) {
      console.log(`OpenMarketsOracle.validate() passed.`);
    }
  }
}
