import getDataSource from '../models/MySqlDataSource';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import HttpError from '../shared/HttpError';
import Client from '../models/entities/Client';
import AccountTransaction from '../models/entities/AccountTransaction';
import Account from '../models/entities/Account';
import IAccount from '../interfaces/IAccount';
import IWallet from '../interfaces/IWallet';

const setAccountTransaction = async (
  transaction: IAccountTransaction,
): Promise<IAccountTransaction> => {
  const dataSource = await getDataSource();

  try {
    const newTransaction = await dataSource.manager.save(
      transaction as AccountTransaction,
    );

    return newTransaction;
  } catch (error: any) {
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

    return client.account;
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

    return client.wallet;
  } catch (error) {
    throw new HttpError(404, 'Cliente não encontrado para clientId informado.');
  }
};

export default {
  setAccountTransaction,
  getAccountByCodClient,
  getWalletByCodClient,
};
