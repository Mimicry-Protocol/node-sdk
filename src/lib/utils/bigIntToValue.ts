import { CurrencyInfo, Value } from '../types';

/**
 * Given a BigInt, return an Value object with a CurrencyInfo and Amount.
 */
export function bigIntToValue(
  value: BigInt,
  currencyInfo: CurrencyInfo
): Value {
  const decimals = Number(currencyInfo.decimals);
  const decimal = Number(value) / Math.pow(10, decimals);
  const atomic = value;

  // Handle potential loss of precision
  if (!isFinite(decimal)) {
    throw new Error(
      'Conversion to decimal resulted in a value outside the safe range for JavaScript numbers'
    );
  }

  return {
    currency: currencyInfo,
    amount: {
      atomic,
      decimal,
    },
  };
}
