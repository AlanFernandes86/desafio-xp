import { Request, Response } from 'express';
import contaService from '../services/conta.service';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

const deposit = async (
  req: Request,
  res: Response,
) => {
  const transaction: IAccountTransaction = req.body;

  transaction.type = AccountTransactionTypes.DESPOSIT;

  const newTransaction = await contaService.setAccountTransaction(transaction);

  const result = {
    clientId: transaction.codClient,
    accountId: newTransaction.account.id,
    oldBalance: +newTransaction.account.balance,
    newBalance: +newTransaction.account.balance + +transaction.value,
  };

  res.status(200).json({ ...result });
};

const withdraw = async (
  req: Request,
  res: Response,
) => {
  const transaction: IAccountTransaction = req.body;

  transaction.type = AccountTransactionTypes.WITHDRAW;

  const newTransaction = await contaService.setAccountTransaction(transaction);

  const result = {
    clientId: transaction.codClient,
    accountId: newTransaction.account.id,
    oldBalance: +newTransaction.account.balance,
    newBalance: +newTransaction.account.balance - +transaction.value,
  };

  res.status(200).json({ ...result });
};

export default { deposit, withdraw };
