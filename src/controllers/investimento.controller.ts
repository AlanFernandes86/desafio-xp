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

  const oldBalance = newTransaction.accountTransaction.account.balance;
  const transactionValue = newTransaction.accountTransaction.value;
  const result = {
    codClient: transaction.codClient,
    stock: newTransaction.stock,
    numberOfStocksPurchased: newTransaction.quantity,
    oldBalance,
    newBalance: oldBalance - transactionValue,
    transactionValue,
    transactionType: AccountTransactionTypes.BUY,
  };

  res.status(200).json({ ...result });
};

export default { buy };
