import { CurrencySymbol, MetricType } from './enums';

export type Amount = {
  atomic: BigInt; // e.g. 26476561042796000000000
  decimal: number; // e.g. 26476.561042796
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

export type Skew = {
  currency: CurrencyInfo;
  long: Amount;
  short: Amount;
};

export type Value = {
  currency: CurrencyInfo;
  amount: Amount;
};
