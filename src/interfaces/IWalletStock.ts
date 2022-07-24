import IStock from './IStock';
import IWallet from './IWallet';

interface IWalletStock {
  id?: number;
  stockId: number;
  walletId: number;
  quantity: number;
  wallet: IWallet;
  stock: IStock;
  createdAt: Date;
  updatedAt: Date;
}

export default IWalletStock;
