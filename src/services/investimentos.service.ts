import clientRepository from '../repository/client.repository';
import investimentosRepository from '../repository/investimentos.repository';
import contaRepository from '../repository/conta.repository';
import HttpError from '../shared/HttpError';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';
import IWalletTransactionRequest from '../interfaces/IWalletTransactionRequest';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import IStock from '../interfaces/IStock';
import WalletTransaction from '../domain/WalletTransaction';
import Client from '../domain/Client';

const getStockByCodAtivo = async (codAtivo: number): Promise<IStock> => {
  const stock = investimentosRepository.getStockByCodAtivo(codAtivo);

  return stock;
};

const validateTransaction = (
  client: Client,
  stock: IStock,
  transaction: IWalletTransactionRequest,
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
  transaction: IWalletTransactionRequest,
): Promise<WalletTransaction> => {
  const stock = await getStockByCodAtivo(transaction.codAtivo);

  const client = await clientRepository.getClientById(transaction.codCliente);

  const totalTransactionAmount = stock.marketPrice * transaction.qtdeAtivo;

  validateTransaction(client as Client, stock, transaction, totalTransactionAmount);

  const iAccountTransaction = {
    value: totalTransactionAmount,
    account: client.account,
    type: transaction.type,
  } as IAccountTransaction;

  const accountTransaction = await contaRepository.setAccountTransaction(iAccountTransaction);

  const iWalletTransaction = {
    quantity: transaction.qtdeAtivo,
    stockMarketPrice: stock.marketPrice,
    wallet: client.wallet,
    stock,
    accountTransaction,
  } as IWalletTransaction;

  const newWalletTransaction = await investimentosRepository.setWalletTransaction(
    iWalletTransaction,
  );

  return newWalletTransaction as WalletTransaction;
};

export default { setWalletTransaction, getStockByCodAtivo };
