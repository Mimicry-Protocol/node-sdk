import { Decimal } from 'decimal.js';
import { bigIntToValue } from '../../../src/lib/utils/bigIntToValue';
import { CurrencyInfo } from '../../../src/lib/types';
import { CurrencySymbol } from '../../../src/lib/enums';

describe('bigIntToValue', () => {
  const currencyInfo: CurrencyInfo = {
    name: 'US Dollar',
    symbol: CurrencySymbol.USDC,
    decimals: BigInt(8),
  };

  it('should return a Value object with correct values when no decimals', () => {
    const value = BigInt(1000000000);
    const result = bigIntToValue(value, currencyInfo);

    expect(result).toEqual({
      amount: {
        atomic: value,
        decimal: new Decimal(10),
      },
      currency: currencyInfo,
    });
  });

  it('should return a Value object with correct values with decimals', () => {
    const value = BigInt(1);
    const result = bigIntToValue(value, currencyInfo);

    expect(result).toEqual({
      amount: {
        atomic: value,
        decimal: new Decimal(0.00000001),
      },
      currency: currencyInfo,
    });
  });
});
