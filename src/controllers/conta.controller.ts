import { Request, Response } from 'express';
import contaService from '../services/conta.service';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';
import HttpError from '../shared/HttpError';

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

const getAccountByCodClient = async (
  req: Request,
  res: Response,
) => {
  const { codClient } = req.params;

  const id = Number.parseInt(codClient, 10);

  if (Number.isNaN(id)) {
    throw new HttpError(400, 'Código do cliente inválido!');
  }

  const account = await contaService.getAccountByCodClient(id);

  res.status(200).json({ ...account });
};

export default {
  deposit,
  withdraw,
  getAccountByCodClient,
};
