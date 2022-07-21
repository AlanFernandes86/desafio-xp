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

  const account = contaService.setAccountTransaction(transaction);

  res.status(200).json(account);
};

export default { deposit };
