import { Decimal } from 'decimal.js';
import { CurrencyInfo, Value } from '../types';

/**
 * Given a BigInt, return an Value object with a CurrencyInfo and Amount.
 */
export function bigIntToValue(
  value: BigInt,
  currencyInfo: CurrencyInfo
): Value {
  const decimals = Number(currencyInfo.decimals);
  const decimal = new Decimal(Number(value) / Math.pow(10, decimals));
  const atomic = value;

  return {
    currency: currencyInfo,
    amount: {
      atomic,
      decimal,
    },
  };
}
