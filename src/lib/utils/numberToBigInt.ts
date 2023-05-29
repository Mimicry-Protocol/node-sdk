import { CurrencyInfo } from '../types';

/**
 * Given a BigInt, return an Value object with a CurrencyInfo and Amount.
 */
export function numberToBigInt(
  _value: number,
  _currencyInfo: CurrencyInfo
): BigInt {
  // Convert the value to a BigInt based on the decimals of the currency.
  const decimals = Number(_currencyInfo.decimals);
  const atomic = BigInt(_value * Math.pow(10, decimals));
  return atomic;
}
