import { Request, Response } from 'express';
import IWalletTransactionRequest from '../interfaces/IWalletTransactionRequest';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';
import investimentosService from '../services/investimentos.service';
import validateAndParserParamToInt from '../utils/validateAndParserParamToNumber';

const buy = async (
  req: Request,
  res: Response,
) => {
  const transaction: IWalletTransactionRequest = req.body;

  transaction.type = AccountTransactionTypes.BUY;

  const newTransaction = await investimentosService.setWalletTransaction(transaction);

  res.status(200).json({ ...newTransaction.toBuyAndSellResponse() });
};

const sell = async (
  req: Request,
  res: Response,
) => {
  const transaction: IWalletTransactionRequest = req.body;

  transaction.type = AccountTransactionTypes.SELL;

  const newTransaction = await investimentosService.setWalletTransaction(transaction);

  res.status(200).json({ ...newTransaction.toBuyAndSellResponse() });
};

const getStockByCodAtivo = async (
  req: Request,
  res: Response,
) => {
  const { codAtivo } = req.params;

  const id = validateAndParserParamToInt(codAtivo, 'Código do atívo inválido!');

  const stock = await investimentosService.getStockByCodAtivo(id);

  res.status(200).json(stock);
};

const listStocksSeparately = async (
  req: Request,
  res: Response,
) => {
  const { id } = res.locals.payload;

  const listStocks = await investimentosService.listStocksSeparately(id);

  res.status(200).json(listStocks);
};

export default {
  buy,
  sell,
  getStockByCodAtivo,
  listStocksSeparately,
};
