export enum ChainId {
  POLYGON_POS = 137,
  POLYGON_MUMBAI = 80001,
}

export enum CurrencySymbol {
  USD = 'usd',
  WETH = 'weth',
  USDC = 'usdc',
  MATIC = 'matic',
}

export enum Direction {
  SHORT,
  LONG,
}

export enum MetricType {
  MARKET_CAP = 'marketcap',
}

export enum OracleType {
  OMO = 'open-markets-oracle',
}

export enum Timeframe {
  ONE_MINUTE = 60,
  FIVE_MINUTES = 60 * 5,
  FIFTEEN_MINUTES = 60 * 15,
  THIRTY_MINUTES = 60 * 30,
  ONE_HOUR = 60 * 60,
  FOUR_HOURS = 60 * 60 * 4,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 60 * 60 * 24 * 7,
}

// export enum TransferType {
//   DEPOSIT = 'deposit',
//   WITHDRAW = 'withdraw',
//   FEE_PAYMENT = 'fee-payment',
//   FEE_CREDIT = 'fee-credit',
//   REWARD = 'token-reward',
// }
