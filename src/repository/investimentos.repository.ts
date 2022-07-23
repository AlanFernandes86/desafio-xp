import getDataSource from '../models/MySqlDataSource';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import Stock from '../models/entities/Stock';
import HttpError from '../shared/HttpError';
import WalletTransaction from '../models/entities/WalletTransaction';
import IStock from '../interfaces/IStock';
import Wallet from '../models/entities/Wallet';
import AccountTransaction from '../models/entities/AccountTransaction';

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

    const wallet = new Wallet();
    wallet.id = transaction.wallet.id;

    const stock = new Stock();
    stock.id = transaction.stock.id;

    const accountTransaction = new AccountTransaction();
    accountTransaction.id = transaction.accountTransaction.id;

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
    throw new HttpError(500, 'Error ao cadastrar transação da carteira.');
  }
};

export default { setWalletTransaction, getStockByCodAtivo };
