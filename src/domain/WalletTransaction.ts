import IAccountTransaction from '../interfaces/IAccountTransaction';
import IStock from '../interfaces/IStock';
import IWallet from '../interfaces/IWallet';
import IWalletTransaction from '../interfaces/IWalletTransaction';
import AccountTransactionTypes from '../models/enums/AccountTransactionTypes';

class WalletTransaction implements IWalletTransaction {
  id?: number;

  quantity: number;

  stockMarketPrice: number;

  wallet: IWallet;

  stock: IStock;

  accountTransaction: IAccountTransaction;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(
    id: number,
    quantity: number,
    stockMarketPrice: number,
    wallet: IWallet,
    stock: IStock,
    accountTransaction: IAccountTransaction,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.stockMarketPrice = stockMarketPrice;
    this.wallet = wallet;
    this.stock = stock;
    this.accountTransaction = accountTransaction;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toBuyAndSellResponse = () => {
    const oldBalance = this.accountTransaction.account.balance;
    const transactionValue = this.accountTransaction.value;
    const transactionType = this.accountTransaction.type;
    const isBuy = transactionType === AccountTransactionTypes.BUY;
    return {
      codClient: this.wallet.client?.id,
      codAtivo: this.stock.id,
      quantityTransacted: this.quantity,
      oldBalance,
      newBalance: isBuy ? oldBalance - transactionValue : oldBalance + transactionValue,
      transactionValue,
      transactionType,
    };
  };
}

export default WalletTransaction;
