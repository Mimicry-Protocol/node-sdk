import { Wallet } from "ethers";
export declare class ConnectedWallet {
    private signer;
    private constructor();
    static connect(_signer: Wallet): Promise<ConnectedWallet>;
    private initialize;
}
