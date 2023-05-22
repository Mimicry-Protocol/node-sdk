import { Contract, Signer } from 'ethers';
import * as MarketABI from './abi/market.json';

export class Market {
  private contract: Contract;
  private name: string;

  constructor(_address: string, _signer: Signer) {
    this.contract = new Contract(_address, MarketABI.abi as any, _signer);
    this.name = await this.contract.name();
    
    if (__DEV__) {
      console.log('Market Constructor');
    }
  }

  public async getName() {
    return await this.contract.name();
  }

  public async getPositionValue() {
    return await this.contract.getPositionValue();
  }
}
