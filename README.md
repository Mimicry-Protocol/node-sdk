# mimicry-sdk
A node SDK designed to simplify interaction with the Mimicry Protocol smart contracts.

## Summary
Mimicry is working to release an NPM library that will provide convenient access to contract methods. The intended audience is professional traders and market makers who wish to programmatically manage positions, and application developers who wish to integrate Mimicry Markets.

## Setup
The SDK allows developers to instantiate an instance in a few lines of code. For example:
```typescript
import { MimicrySDK } from "@mimicry/mimicry-sdk";
import { ethers } from "ethers";

const pk = process.env.PRIVATE_KEY;
const providerUrl = process.env.PROVIDER_URL;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(pk as string, provider);
const mimicry = new MimicrySDK(signer);
```

## Types
```typescript
interface PositionInfo {
    id: number,
    createdAt: number,     // unix timestamp
    createdOn: number      // block number
    createdBy: Player,
    direction: Direction,   
    market: Market,         
    player: Player,
    transfers: Transfer[],
    usdValue: number,
    exitFee: 30,           // basis points
    doesEarnFees: false,
    unrealizedProfit: BigNumber,
    realizedProfit: BigNumber
}

interface Market {
    id: number,
    createdAt: Date,
    createdBy: Player,
    name: string,
    oracle: Oracle,
    positions: Position[],
    players: Player[],
    skew: Skew,
}

interface Skew {
    long: Value;
    short: Value;
}

interface Player {
    address: string,
    positions: Position[]
}

interface Oracle {
    currency: Currency,
    latestValue: Amount,
    latestUpdateAt: Date,
}

// Deposit or Withdraw event
interface Transfer {
    id: number,
    cratedAt: Date,
    direction: Direction,
    type: TransferType,
    values: Value[]   // allows for multiple-currency withdraws
}

interface Value {
    currency: CurrencyInfo,
    amount: Amount
}

interface CurrencyInfo {
    symbol: string,     // e.g. WETH
    decimals: number,   // e.g. 18
    chainId: Chain,     // e.g. 137
    address: string,    // e.g. 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
}

interface Amount {
    atomic: BigNumber,  // e.g. 26476561042796000000000
    decimal: number     // e.g. 26476.561042796
}
```


## Currencies
```typescript
const currencyInfos: CurrencyInfo[] = await mimicry.getCurrencies();
console.log(currencyInfos[0]);
// {
//     symbol: "WETH"
//     decimals: 18
//     chainId: 137
//     address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
// }
```

## Positions
```typescript
const positions: Position[] = await mimicry.getPositions();
console.log(await positions[0].getInfo());
// {
//     id: 123,
//     createdAt: 1620594767,
//     createdOn: 42512169,
//     createdBy: {...},
//     direction: "long",   
//     market: {...},         
//     player: {...},
//     transfers: [{...}],
//     usdValue: 10
//     unrealizedProfit: 0
//     realizedProfit: 0
// }
const position123: Position = await mimicry.getPosition(123);
const txId1: string = await position123.deposit(
    Currency.USDC,
    10800000        // position123 is now worth $20.8
);
const txId2: string = await position123.withdraw(500000); // 50%
const position123value: Value = await position123.value();
// {
//     currency: {
//         symbol: "USD",
//         decimals: 8
//     }, 
//     amount: {
//         atomic: 1040000000,
//         decimal: 10.4
//     }
// }
const txId3: string = await position123.close();
```

```typescript
/**
 * Retrieves Positions opened by a wallet address.
 *
 * @param {string=} address - (Optional) The wallet address to retrieve the positions for. If omitted, the balance for the default wallet address will be retrieved.
 * @returns {Position[]} A list of Positions
 */
function getPositions(address)
```

```typescript
// Gets a list of Positions 
async function getPositions(address: string): Promise<Position[]>;
async function getPositions(address: string): Promise<Position[]>;
async function getPositions(address: string): Promise<Position[]>;
```