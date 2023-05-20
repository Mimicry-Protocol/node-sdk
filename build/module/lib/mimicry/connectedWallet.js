export class ConnectedWallet {
    signer;
    constructor(_signer) {
        this.signer = _signer;
    }
    static async connect(_signer) {
        const instance = new ConnectedWallet(_signer);
        await instance.initialize();
        return instance;
    }
    async initialize() {
        const network = await this.signer.provider.getNetwork();
        const chainId = network.chainId;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGVkV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9taW1pY3J5L2Nvbm5lY3RlZFdhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sZUFBZTtJQUNoQixNQUFNLENBQVM7SUFFdkIsWUFBb0IsT0FBZTtRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZTtRQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUssS0FBSyxDQUFDLFVBQVU7UUFDcEIsTUFBTSxPQUFPLEdBQVksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqRSxNQUFNLE9BQU8sR0FBVyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQzVDLENBQUM7Q0FFSiJ9