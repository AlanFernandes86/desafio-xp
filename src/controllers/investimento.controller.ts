import { Request, Response } from 'express';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';
import investimentosService from '../services/investimentos.service';

const buy = async (
  req: Request,
  res: Response,
) => {
  const transaction: IWalletTransaction = req.body;

  transaction.type = AccountTransactionTypes.BUY;

  const newTransaction = await investimentosService.setWalletTransaction(transaction);

  res.status(200).json({ ...newTransaction.toBuyAndSellResponse() });
};

const sell = async (
  req: Request,
  res: Response,
) => {
  const transaction: IWalletTransaction = req.body;

  transaction.type = AccountTransactionTypes.SELL;

  const newTransaction = await investimentosService.setWalletTransaction(transaction);

  res.status(200).json({ ...newTransaction.toBuyAndSellResponse() });
};

export default { buy, sell };
