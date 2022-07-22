import getDataSource from '../models/MySqlDataSource';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import contaService from './conta.service';
import Stock from '../models/entities/Stock';
import HttpError from '../shared/HttpError';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import WalletTransaction from '../models/entities/WalletTransaction';
import clientService from './client.service';
import Client from '../models/entities/Client';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

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

const validateTransaction = (
  client: Client,
  stock: Stock,
  transaction: IWalletTransaction,
  totalTransactionAmount: number,
) => {
  if (transaction.type === AccountTransactionTypes.BUY) {
    if (stock.availableQuantity < transaction.qtdeAtivo) {
      throw new HttpError(400, 'Quantidade de ativos disponiveis para venda na corretora insuficiente.');
    }

    if (client.account.balance < totalTransactionAmount) {
      throw new HttpError(400, 'Saldo financeiro da conta insuficiente.');
    }
  }

  if (transaction.type === AccountTransactionTypes.SELL) {
    const stockInWallet = client.wallet.walletStocks.find(
      ({ stockId }) => stockId === stock.id,
    );

    if (!stockInWallet) {
      throw new HttpError(400, 'Carteira do cliente não possui este ativo.');
    }

    if ((stockInWallet?.quantity || 0) < transaction.qtdeAtivo) {
      throw new HttpError(400, 'Quantidade de ativos na carteira menor que a solitação de venda.');
    }
  }
};

const setWalletTransaction = async (
  transaction: IWalletTransaction,
): Promise<WalletTransaction> => {
  const dataSource = await getDataSource();

  const stock = await getStockByCodAtivo(transaction.codAtivo);

  const totalTransactionAmount = stock.marketPrice * transaction.qtdeAtivo;

  const client = await clientService.getClientById(transaction.codClient);

  validateTransaction(client, stock, transaction, totalTransactionAmount);

  const iAccountTransaction = {
    codClient: transaction.codClient,
    value: totalTransactionAmount,
    type: transaction.type,
  } as IAccountTransaction;

  const accountTransaction = await contaService.setAccountTransaction(iAccountTransaction);

  try {
    const walletTransaction = new WalletTransaction();
    walletTransaction.accountTransaction = accountTransaction;
    walletTransaction.stock = stock;
    walletTransaction.wallet = client.wallet;
    walletTransaction.stockMarketPrice = stock.marketPrice;
    walletTransaction.quantity = transaction.qtdeAtivo;

    const newWalletTransaction = await dataSource.manager.save(walletTransaction);

    return newWalletTransaction;
  } catch (error) {
    console.log(error);
    throw new HttpError(500, 'Error ao cadastrar transação da carteira.');
  }
};

export default { setWalletTransaction, getStockByCodAtivo };
