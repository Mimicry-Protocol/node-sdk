import { Contract, Signer } from 'ethers';
import { ChainId } from '../enums';

// @TODO: Setup Positions
export class Player {
  private contract: Contract;
  private address: string;

  constructor(_contract: Contract, _address: string) {
    this.contract = _contract;
    this.address = _address;
  }

  static async initialize(
    _address: string,
    _signer: Signer,
    _network: ChainId
  ): Promise<Player> {
    if (__DEV__) {
      console.log(`Initialize Player with address: ${_address}`);
    }
    const abi = [
      // ERC721
      'function balanceOf(address owner) view returns (uint256)',
      'function tokenURI(uint256 tokenId) view returns (string)', // TODO: set baseURI to https://beta.mimicry.org/nft/
      'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)', // TOOD: upgrade to Enumerable
    ];

    const nftAddress =
      _network === ChainId.POLYGON_POS
        ? '0x9EC58a07C156eF220306D11148Ec2551E977D8d1' // Mainnet
        : '0xebeb2D5dE6a43043CaA670382C780072F90dFF8d'; // Mumbai

    const contract = new Contract(nftAddress, abi as any, _signer);
    return new Player(contract, _address);
  }

  // ---- NFTs ----------------------------------------------------------------
  // @notice This fails until we upgrade to Enumerable
  public async getNFTs(): Promise<any> {
    const balance = await this.contract.balanceOf(this.address);
    const nfts = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await this.contract.tokenOfOwnerByIndex(this.address, i);
      nfts.push(tokenId);
    }
    return nfts;
  }

  public async getTokenURI(_tokenId: number): Promise<any> {
    return await this.contract.tokenURI(_tokenId);
  }
}
