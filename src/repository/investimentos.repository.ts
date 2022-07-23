import getDataSource from '../models/MySqlDataSource';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import Stock from '../models/entities/Stock';
import HttpError from '../shared/HttpError';
import WalletTransaction from '../models/entities/WalletTransaction';
import IStock from '../interfaces/IStock';

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

    const newWalletTransaction = await dataSource.manager.save(
      transaction as WalletTransaction,
    );

    return newWalletTransaction as IWalletTransaction;
  } catch (error) {
    throw new HttpError(500, 'Error ao cadastrar transação da carteira.');
  }
};

export default { setWalletTransaction, getStockByCodAtivo };
