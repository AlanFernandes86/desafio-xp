import IAccount from './IAccount';

interface IAccountTransaction {
  id: number;
  value: number;
  account: IAccount;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IAccountTransaction;
