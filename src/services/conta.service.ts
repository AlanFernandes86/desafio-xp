import getDataSource from '../models/MySqlDataSource';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import HttpError from '../shared/HttpError';
import Client from '../models/entities/Client';
import AccountTransaction from '../models/entities/AccountTransaction';
import Account from '../models/entities/Account';

const setAccountTransaction = async (
  transaction: IAccountTransaction,
): Promise<AccountTransaction> => {
  try {
    const dataSource = await getDataSource();

    const client = await dataSource.manager.findOneOrFail(Client, {
      where: {
        id: transaction.codClient,
      },
      relations: {
        wallet: true,
        account: true,
      },
    });

    const accountTransaction = new AccountTransaction();
    accountTransaction.account = client.account;
    accountTransaction.value = transaction.value;
    accountTransaction.type = transaction.type;

    const newTransaction = await dataSource.manager.save(accountTransaction);

    return newTransaction;
  } catch (error) {
    console.log(error);
    throw new HttpError(500, 'Error ao realizar transação da conta.');
  }
};

const getAccountByCodClient = async (codClient: string): Promise<Account> => {
  const id = Number.parseInt(codClient, 10);

  if (Number.isNaN(id)) {
    throw new HttpError(400, 'Código do cliente inválido!');
  }

  try {
    const dataSource = await getDataSource();

    const client = await dataSource.manager.findOneOrFail(Client, {
      where: {
        id,
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

export default { setAccountTransaction, getAccountByCodClient };
