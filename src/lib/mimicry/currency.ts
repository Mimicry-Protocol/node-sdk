import { Contract, Signer } from 'ethers';
import { CurrencyInfo } from '../types';

export class Currency {
  private contract: Contract;

  constructor(_contract: Contract) {
    this.contract = _contract;
  }

  static async initialize(
    _address: string,
    _signer: Signer
  ): Promise<Currency> {
    if (__DEV__) {
      console.log(`Initialize Currency: ${_address}`);
    }
    const abi = [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
    ];

    const contract = new Contract(_address, abi as any, _signer);
    return new Currency(contract);
  }

  public async getInfo(): Promise<CurrencyInfo> {
    const info: CurrencyInfo = {
      name: await this.contract.name(),
      symbol: await this.contract.symbol(),
      decimals: await this.contract.decimals(),
      address: await this.contract.getAddress(),
    };
    return info;
  }
}
