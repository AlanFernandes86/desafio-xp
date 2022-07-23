import IAccountTransaction from '../interfaces/IAccountTransaction';
import HttpError from '../shared/HttpError';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';
import clientRepository from '../repository/client.repository';
import contaRepository from '../repository/conta.repository';
import Client from '../domain/Client';
import Wallet from '../domain/Wallet';
import IAccountTransactionRequest from '../interfaces/IAccountTransactionRequest';
import IAccount from '../interfaces/IAccount';

const validateTransaction = (
  client: Client,
  transaction: IAccountTransactionRequest,
) => {
  if (transaction.type === AccountTransactionTypes.DESPOSIT) {
    if (transaction.valor <= 0) {
      throw new HttpError(
        400,
        'Não é possivel depositar valor menor ou igual a 0(zero)',
      );
    }
  }

  if (transaction.type === AccountTransactionTypes.WITHDRAW) {
    if (transaction.valor <= 0) {
      throw new HttpError(
        400,
        'Não é possivel sacar valor menor ou igual a 0(zero)',
      );
    }

    if (transaction.valor > client.account.balance) {
      throw new HttpError(
        400,
        'Saldo insuficiente.',
      );
    }
  }
};

const setAccountTransaction = async (
  transaction: IAccountTransactionRequest,
): Promise<IAccountTransaction> => {
  const client = await clientRepository.getClientById(transaction.codCliente);

  validateTransaction(client as Client, transaction);

  const accountTransaction = {
    value: transaction.valor,
    account: client.account,
    type: transaction.type,
  } as IAccountTransaction;

  const newTransaction = await contaRepository.setAccountTransaction(
    accountTransaction,
  );

  return newTransaction;
};

const getAccountByCodClient = async (codClient: number): Promise<IAccount> => {
  const account = await contaRepository.getAccountByCodClient(codClient);

  return account as IAccount;
};

const getWalletByCodClient = async (codClient: number): Promise<Wallet> => {
  const wallet = await contaRepository.getWalletByCodClient(codClient);

  return new Wallet(wallet);
};

export default {
  setAccountTransaction,
  getAccountByCodClient,
  getWalletByCodClient,
};
