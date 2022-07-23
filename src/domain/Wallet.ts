import IClient from '../interfaces/IClient';
import IWallet from '../interfaces/IWallet';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import WalletStock from '../models/entities/WalletStock';

class Wallet implements IWallet {
  id: number;

  client: IClient;

  walletTransactions?: IWalletTransaction[] | undefined;

  walletStocks: WalletStock[];

  createdAt: Date;

  updatedAt: Date;

  constructor(
    id: number,
    client: IClient,
    createdAt: Date,
    updatedAt: Date,
    walletStocks: WalletStock[],
    walletTransactions?: IWalletTransaction[] | undefined,
  ) {
    this.id = id;
    this.client = client;
    this.walletStocks = walletStocks;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.walletTransactions = walletTransactions;
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
