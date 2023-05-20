import { Chain, Currency, OracleType, TransferType } from './enums';

export type Skew {
  long: number;
  short: number;
}

// Deposit or Withdraw event
export type Transfer = {
  id: number;
  cratedAt: Date;
  direction: Direction;
  type: TransferType;
  values: Value[]; // allows for multiple-currency withdraws
}

export type Value = {
  currency: CurrencyInfo;
  amount: Amount;
}

export type CurrencyInfo = {
  symbol: string; // e.g. WETH
  decimals: number; // e.g. 18
  chainId: Chain; // e.g. 137
  address: string; // e.g. 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
}

export type Amount = {
  atomic: BigInt; // e.g. 26476561042796000000000
  decimal: number; // e.g. 26476.561042796
}

export type MarketInfo = {
    name: string;
    description: string;
    image: string;
    currency: string;
    metric: string;
    oracle: OracleInfo;
}

export type OracleInfo = {
    type: OracleType;
}

export type Direction = "LONG" | "SHORT";
