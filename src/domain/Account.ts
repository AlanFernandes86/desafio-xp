import IAccount from '../interfaces/IAccount';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import Client from './Client';

class Account implements IAccount {
  id!: number;

  balance!: number;

  client!: Client;

  accountTransactions?: IAccountTransaction[];

  createdAt!: Date;

  updatedAt!: Date;

  constructor(
    id: number,
    balance: number,
    client: Client,
    createdAt: Date,
    updatedAt: Date,
    accountTransactions?: IAccountTransaction[] | undefined,
  ) {
    this.id = id;
    this.balance = balance;
    this.client = client;
    this.accountTransactions = accountTransactions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Account;
