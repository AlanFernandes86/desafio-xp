import getDataSource from '../models/MySqlDataSource';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import contaService from './conta.service';
import Stock from '../models/entities/Stock';
import HttpError from '../shared/HttpError';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import WalletTransaction from '../models/entities/WalletTransaction';
import authService from './auth.service';

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
  const dataSource = await getDataSource();

  const stock = await getStockByCodAtivo(transaction.codAtivo);

  const totalPurchaseAmount = stock.marketPrice * transaction.qtdeAtivo;

  const client = await authService.getClientById(transaction.codClient);

  if (stock.availableQuantity < transaction.qtdeAtivo) {
    throw new HttpError(400, 'Quantidade de ativos disponiveis para venda na corretora insuficiente.');
  }

  if (client.account.balance < totalPurchaseAmount) {
    throw new HttpError(400, 'Saldo financeiro da conta insuficiente.');
  }

  const iAccountTransaction = {
    codClient: transaction.codClient,
    value: totalPurchaseAmount,
    type: transaction.type,
  } as IAccountTransaction;

  const accountTransaction = await contaService.setAccountTransaction(iAccountTransaction);

  const walletTransaction = new WalletTransaction();
  walletTransaction.accountTransaction = accountTransaction;
  walletTransaction.wallet = client.wallet;
  walletTransaction.stock = stock;
  walletTransaction.stockMarketPrice = stock.marketPrice;
  walletTransaction.quantity = transaction.qtdeAtivo;

  const newWalletTransaction = await dataSource.manager.save(walletTransaction);

  return newWalletTransaction;
};

export default { saveStockPurchase };
