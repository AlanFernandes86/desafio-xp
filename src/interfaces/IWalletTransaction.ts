import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

interface IWalletTransaction {
  id?: number,
  codClient: number,
  codAtivo: number,
  qtdeAtivo: number,
  type: AccountTransactionTypes,
}

export default IWalletTransaction;
