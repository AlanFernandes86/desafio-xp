import getDataSource from '../models/MySqlDataSource';
import IWalletTransaction from '../interfaces/IWalletTransaction';
// import contaService from './conta.service';
import Stock from '../models/entities/Stock';
import HttpError from '../shared/HttpError';

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

const saveStockPurchase = (transaction: IWalletTransaction) => {

  // const accountTransaction = contaService.setAccountTransaction(transaction);
};

export default { saveStockPurchase };
