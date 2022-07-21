import getDataSource from '../models/MySqlDataSource';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import contaService from './conta.service';
import Stock from '../models/entities/Stock';
import HttpError from '../shared/HttpError';
import IAccountTransaction from '../interfaces/IAccountTransaction';

const getStockByCodAtivo = async (codAtivo: number): Promise<Stock> => {
  try {
    const dataSource = await getDataSource();
    const stock = await dataSource.manager.findOneOrFail(Stock, {
      where: {
        id: codAtivo,
      },
    });

    return stock;
  } catch (error) {
    throw new HttpError(404, 'Ativo não encontrado.');
  }
};

const saveStockPurchase = async (transaction: IWalletTransaction) => {
  const stock = await getStockByCodAtivo(transaction.codAtivo);

  const totalPurchaseAmount = stock.marketPrice * transaction.qtdeAtivo;

  const accountTransaction = transaction as IAccountTransaction;

  const account = await contaService.getAccountByCodClient(transaction.codClient);
  // const accountTransaction = contaService.setAccountTransaction(transaction);
};

export default { saveStockPurchase };
