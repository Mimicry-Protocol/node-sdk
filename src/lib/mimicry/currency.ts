import { Contract, Signer, ContractTransactionResponse } from 'ethers';
import { CurrencyInfo } from '../types';
import { numberToBigInt } from '../utils/numberToBigInt';

export class Currency {
  private contract: Contract;
  private info?: CurrencyInfo;

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
      'function approve(address spender, uint256 amount) returns (bool)',
    ];

    const contract = new Contract(_address, abi as any, _signer);
    return new Currency(contract);
  }

  public async getInfo(): Promise<CurrencyInfo> {
    if (this.info) {
      return this.info;
    }

    const info: CurrencyInfo = {
      name: await this.contract.name(),
      symbol: await this.contract.symbol(),
      decimals: await this.contract.decimals(),
      address: await this.contract.getAddress(),
    };
    this.info = info;
    return info;
  }

  /**
   * Approve Spending
   *
   * @param _spender  The address of the market contract
   * @param _amount The amount as a human-readable decimal
   * @returns The transaction response
   */
  public async approveSpending(
    _spender: string,
    _amount: number
  ): Promise<ContractTransactionResponse> {
    const amount = numberToBigInt(_amount, await this.getInfo());
    const tx = await this.contract.approve(_spender, amount);
    return await tx.wait();
  }
}
