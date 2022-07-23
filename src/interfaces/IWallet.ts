import IClient from './IClient';
import IWalletStock from './IWalletStock';
import IWalletTransaction from './IWalletTransaction';

interface IWallet {
  id: number;
  client: IClient;
  walletTransactions?: IWalletTransaction[];
  walletStocks: IWalletStock[];
  createdAt: Date;
  updatedAt: Date;
}

export default IWallet;
