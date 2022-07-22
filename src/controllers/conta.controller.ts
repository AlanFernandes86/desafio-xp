import { Request, Response } from 'express';
import contaService from '../services/conta.service';
import IAccountTransaction from '../interfaces/IAccountTransaction';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';
import HttpError from '../shared/HttpError';
import validateAndParserParamToInt from '../utils/validateAndParserParamToNumber';

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

  const id = validateAndParserParamToInt(codClient, 'Código do cliente inválido!');

  const account = await contaService.getAccountByCodClient(id);

  res.status(200).json({ ...account });
};

const getStocksByCodClient = async (
  req: Request,
  res: Response,
) => {
  const { codClient } = req.params;

  const id = validateAndParserParamToInt(codClient, 'Código do cliente inválido!');

  const stocks = await contaService.getStocksByCodClient(id);

  res.status(200).json({ ...stocks });
};

export default {
  deposit,
  withdraw,
  getAccountByCodClient,
  getStocksByCodClient,
};
