import { Contract, Signer } from 'ethers';
import * as MarketABI from './abi/mimicry.json';

export class Market {
  private contract: Contract;

  constructor(_signer: Signer, _network: number, _address: string) {
    this.contract = new Contract(_address, MarketABI.abi as any, _signer);

    if (__DEV__) {
      console.log('Market Constructor');
    }
  }

  public async create() {
    return;
  }
}
