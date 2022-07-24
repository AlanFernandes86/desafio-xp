import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

interface IAccountTransactionRequest {
  codCliente: number,
  valor: number,
  type: AccountTransactionTypes
}

export default IAccountTransactionRequest;
