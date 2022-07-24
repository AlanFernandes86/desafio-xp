import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

interface IWalletTransactionRequest {
  codCliente: number,
  codAtivo: number,
  qtdeAtivo: number,
  type: AccountTransactionTypes
}

export default IWalletTransactionRequest;
