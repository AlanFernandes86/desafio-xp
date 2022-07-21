import { Request, Response } from 'express';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

const buy = async (
  req: Request,
  res: Response,
) => {
  const transaction: IWalletTransaction = req.body;

  transaction.type = AccountTransactionTypes.BUY;

  // const newTransaction = await ivestimentoService.saveStockPurchase(transaction);

  const result = {
    codClient: transaction.codClient,
    codAtivo: transaction.codAtivo,
  };

  res.status(200).json({ ...result });
};

export default { buy };
