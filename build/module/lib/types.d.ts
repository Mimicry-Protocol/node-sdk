import { Chain, Direction, OracleType, TransferType } from './enums';
export interface Skew {
    long: number;
    short: number;
}
export interface Transfer {
    id: number;
    cratedAt: Date;
    direction: Direction;
    type: TransferType;
    values: Value[];
}
export interface Value {
    currency: CurrencyInfo;
    amount: Amount;
}
export interface CurrencyInfo {
    symbol: string;
    decimals: number;
    chainId: Chain;
    address: string;
}
export interface Amount {
    atomic: BigInt;
    decimal: number;
}
export interface MarketInfo {
    name: string;
    description: string;
    image: string;
    currency: string;
    metric: string;
    oracle: OracleInfo;
}
export interface OracleInfo {
    type: OracleType;
}
