import getDataSource from '../models/MySqlDataSource';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import HttpError from '../shared/HttpError';
import Client from '../models/entities/Client';
import AccountTransaction from '../models/entities/AccountTransaction';
import Account from '../models/entities/Account';
import Wallet from '../models/entities/Wallet';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';
import clientService from './client.service';

const validateTransaction = (
  client: Client,
  transaction: IAccountTransaction,
) => {
  if (transaction.type === AccountTransactionTypes.DESPOSIT) {
    if (transaction.value <= 0) {
      throw new HttpError(
        400,
        'Não é possivel depositar valor menor ou igual a 0(zero)',
      );
    }
  }

  if (transaction.type === AccountTransactionTypes.WITHDRAW) {
    if (transaction.value <= 0) {
      throw new HttpError(
        400,
        'Não é possivel sacar valor menor ou igual a 0(zero)',
      );
    }

    if (transaction.value > client.account.balance) {
      throw new HttpError(
        400,
        'Saldo insuficiente.',
      );
    }
  }
};

const setAccountTransaction = async (
  transaction: IAccountTransaction,
): Promise<AccountTransaction> => {
  const dataSource = await getDataSource();

  const client = await clientService.getClientById(transaction.codClient);

  validateTransaction(client, transaction);

  try {
    const accountTransaction = new AccountTransaction();
    accountTransaction.account = client.account;
    accountTransaction.value = transaction.value;
    accountTransaction.type = transaction.type;

    const newTransaction = await dataSource.manager.save(accountTransaction);

    return newTransaction;
  } catch (error) {
    throw new HttpError(
      500,
      'Error ao salvar transação da conta.',
    );
  }
};

const getAccountByCodClient = async (codClient: number): Promise<Account> => {
  try {
    const dataSource = await getDataSource();

    const client = await dataSource.manager.findOneOrFail(Client, {
      where: {
        id: codClient,
      },
      relations: {
        account: true,
      },
    });

    return client.account;
  } catch (error) {
    console.log(error);
    throw new HttpError(404, 'Cliente não encontrado para clientId informado.');
  }
};

const getWalletByCodClient = async (codClient: number): Promise<Wallet> => {
  try {
    const dataSource = await getDataSource();

    const client = await dataSource.manager.findOneOrFail(Client, {
      where: {
        id: codClient,
      },
      relations: {
        wallet: {
          client: true,
          walletStocks: {
            stock: true,
          },
        },
      },
    });

    return client.wallet;
  } catch (error) {
    console.log(error);
    throw new HttpError(404, 'Cliente não encontrado para clientId informado.');
  }
};

export default {
  setAccountTransaction,
  getAccountByCodClient,
  getWalletByCodClient,
};
