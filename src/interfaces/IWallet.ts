import WalletStock from '../models/entities/WalletStock';
import IClient from './IClient';
import IWalletTransaction from './IWalletTransaction';

interface IWallet {
  id: number;
  client: IClient;
  walletTransactions?: IWalletTransaction[];
  walletStocks: WalletStock[];
  createdAt: Date;
  updatedAt: Date;
}

export default IWallet;
