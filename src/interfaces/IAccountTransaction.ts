import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

interface IAccountTransaction {
  id?: number,
  codClient: number,
  value: number,
  type: AccountTransactionTypes,
}

export default IAccountTransaction;
