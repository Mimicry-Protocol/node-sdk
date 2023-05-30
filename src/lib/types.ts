import { Decimal } from 'decimal.js';
import { CurrencySymbol, MetricType } from './enums';

export type Amount = {
  atomic: BigInt; // e.g. 26476561042796000000000
  decimal: Decimal; // e.g. 26476.561042796
};

export type CurrencyInfo = {
  symbol: CurrencySymbol;
  name: string;
  decimals: BigInt;
  address?: string; // address will be omitted for usd
};

export type MarketInfo = {
  name: string;
  address: string;
  description: string;
  image: string;
  metric: MetricType;
  referenceValue: Value;
  skew: Skew;
};

// export type PlayerInfo = {
//   address: string;
//   positions: PositionInfo[];
// };

// export type PositionInfo = {
//   id: number;
//   createdAt: Date;
//   // values: Value[];
//   // value: Value;
//   // isLong: boolean;
//   // isOpen: boolean;
// };

export type Skew = {
  currency: CurrencyInfo;
  long: Amount;
  short: Amount;
};

// // Deposit or Withdraw event
// export type Transfer = {
//   id: number;
//   cratedAt: Date;
//   direction: Direction;
//   type: TransferType;
//   values: Value[]; // allows for multiple-currency withdraws
// }

export type Value = {
  currency: CurrencyInfo;
  amount: Amount;
};
