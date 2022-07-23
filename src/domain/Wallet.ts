import IClient from '../interfaces/IClient';
import IWallet from '../interfaces/IWallet';
import IWalletStock from '../interfaces/IWalletStock';
import IWalletTransaction from '../interfaces/IWalletTransaction';

class Wallet implements IWallet {
  id: number;

  client: IClient;

  walletTransactions?: IWalletTransaction[] | undefined;

  walletStocks: IWalletStock[];

  createdAt: Date;

  updatedAt: Date;

  constructor(
    iWallet: IWallet,
  ) {
    this.id = iWallet.id;
    this.client = iWallet.client;
    this.walletStocks = iWallet.walletStocks;
    this.createdAt = iWallet.createdAt;
    this.updatedAt = iWallet.updatedAt;
    this.walletTransactions = iWallet.walletTransactions;
  }

  toGetStocksByCodClientResponse = () => (
    this.walletStocks.map((walletStock) => (
      {
        codClient: this.client?.id,
        codAtivo: walletStock.stockId,
        ativo: walletStock.stock,
        qtdeAtivo: walletStock.quantity,
        valor: walletStock.stock.marketPrice,
      }
    ))
  );
}

export default Wallet;
