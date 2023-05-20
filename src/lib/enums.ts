export enum Chain {
  ETHEREUM_MAINNET = 1,
  POLYGON_POS = 137,
  POLYGON_MUMBAI = 80001,
}

export enum Currency {
  WETH = 'WETH',
  USDC = 'USDC',
}

export enum Direction {
  LONG = 'long',
  SHORT = 'short',
}

export enum Direction2 {
    LONG,
    SHORT,
  }

export enum TransferType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  FEE_PAYMENT = 'fee-payment',
  FEE_CREDIT = 'fee-credit',
  REWARD = 'token-reward',
}

export enum OracleType {
  OMO = 'open-market-oracle',
}

export enum OracleSourceType {
  GELATO = 'gelato',
}

export enum MetricType {
  MARKET_CAP = 'market-cap',
}