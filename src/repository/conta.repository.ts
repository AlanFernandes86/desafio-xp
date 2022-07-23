import getDataSource from '../models/MySqlDataSource';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import HttpError from '../shared/HttpError';
import IAccount from '../interfaces/IAccount';
import IWallet from '../interfaces/IWallet';
import AccountTransaction from '../models/entities/AccountTransaction';
import Client from '../models/entities/Client';
import Account from '../models/entities/Account';

const setAccountTransaction = async (
  transaction: IAccountTransaction,
): Promise<IAccountTransaction> => {
  const dataSource = await getDataSource();

  try {
    console.log(transaction);

    const account = new Account();
    account.id = transaction.account.id;
    account.balance = transaction.account.balance;

    const accountTransaction = new AccountTransaction();
    accountTransaction.account = account;
    accountTransaction.value = transaction.value;
    accountTransaction.type = transaction.type;

    const newTransaction = await dataSource.manager.save(
      accountTransaction,
    );

    return newTransaction as IAccountTransaction;
  } catch (error: any) {
    console.log(error);
    throw new HttpError(
      500,
      error.message,
    );
  }
};

const getAccountByCodClient = async (codClient: number): Promise<IAccount> => {
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

    return client.account as IAccount;
  } catch (error) {
    throw new HttpError(404, 'Cliente não encontrado para clientId informado.');
  }
};

const getWalletByCodClient = async (codClient: number): Promise<IWallet> => {
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

    return client.wallet as IWallet;
  } catch (error) {
    throw new HttpError(404, 'Cliente não encontrado para clientId informado.');
  }
};

export default {
  setAccountTransaction,
  getAccountByCodClient,
  getWalletByCodClient,
};
