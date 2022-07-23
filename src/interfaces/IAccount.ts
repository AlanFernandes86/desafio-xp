import IAccountTransaction from './IAccountTransaction';
import IClient from './IClient';

interface IAccount {
  id: number;

  balance: number;

  client: IClient;

  accountTransactions?: IAccountTransaction[];

  createdAt: Date;

  updatedAt: Date;
}

export default IAccount;
