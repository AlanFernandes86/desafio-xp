import IAccountTransaction from './IAccountTransaction';
import IStock from './IStock';
import IWallet from './IWallet';

interface IWalletTransaction {
  id?: number;
  quantity: number;
  stockMarketPrice: number;
  wallet: IWallet;
  stock: IStock;
  accountTransaction: IAccountTransaction;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IWalletTransaction;
