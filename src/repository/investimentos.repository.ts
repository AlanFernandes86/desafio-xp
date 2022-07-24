import getDataSource from '../models/MySqlDataSource';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import Stock from '../models/entities/Stock';
import HttpError from '../shared/HttpError';
import WalletTransaction from '../models/entities/WalletTransaction';
import IStock from '../interfaces/IStock';
import Wallet from '../models/entities/Wallet';
import AccountTransaction from '../models/entities/AccountTransaction';
import Client from '../models/entities/Client';
import Account from '../models/entities/Account';
import WalletStock from '../models/entities/WalletStock';

const getStockByCodAtivo = async (codAtivo: number): Promise<IStock> => {
  try {
    const dataSource = await getDataSource();
    const stock = await dataSource.manager.findOneOrFail(Stock, {
      where: {
        id: codAtivo,
      },
    });

    return stock as IStock;
  } catch (error) {
    throw new HttpError(404, 'Ativo não encontrado.');
  }
};

const setWalletTransaction = async (
  transaction: IWalletTransaction,
): Promise<IWalletTransaction> => {
  try {
    const dataSource = await getDataSource();

    const client = new Client();
    client.id = transaction.wallet.client.id;

    const walletStocks = transaction.wallet.walletStocks.map(
      (walletStock) => {
        const tempStock = new Stock();
        tempStock.id = walletStock.stock.id;
        tempStock.availableQuantity = walletStock.stock.availableQuantity;

        const tempWalletStock = new WalletStock();
        tempWalletStock.id = walletStock.id;
        tempWalletStock.quantity = walletStock.quantity;
        tempWalletStock.stockId = walletStock.stockId;
        tempWalletStock.walletId = walletStock.walletId;
        tempWalletStock.stock = tempStock;

        return tempWalletStock;
      },
    );

    const wallet = new Wallet();
    wallet.id = transaction.wallet.id;
    wallet.client = client;
    wallet.walletStocks = walletStocks;

    const stock = new Stock();
    stock.id = transaction.stock.id;
    stock.availableQuantity = transaction.stock.availableQuantity;

    const account = new Account();
    account.id = transaction.accountTransaction.account.id;
    account.balance = transaction.accountTransaction.account.balance;

    const accountTransaction = new AccountTransaction();
    accountTransaction.id = transaction.accountTransaction.id;
    accountTransaction.account = account;
    accountTransaction.value = transaction.accountTransaction.value;
    accountTransaction.type = transaction.accountTransaction.type;

    const walletTransaction = new WalletTransaction();
    walletTransaction.wallet = wallet;
    walletTransaction.stock = stock;
    walletTransaction.accountTransaction = accountTransaction;
    walletTransaction.quantity = transaction.quantity;
    walletTransaction.stockMarketPrice = transaction.stock.marketPrice;

    const newWalletTransaction = await dataSource.manager.save(
      walletTransaction,
    );

    return newWalletTransaction as IWalletTransaction;
  } catch (error) {
    console.log(error);
    throw new HttpError(500, 'Error ao cadastrar transação da carteira.');
  }
};

export default { setWalletTransaction, getStockByCodAtivo };
