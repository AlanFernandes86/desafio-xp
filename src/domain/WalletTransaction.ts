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
    iWalletTransaction: IWalletTransaction,
  ) {
    this.id = iWalletTransaction.id;
    this.quantity = iWalletTransaction.quantity;
    this.stockMarketPrice = iWalletTransaction.stockMarketPrice;
    this.wallet = iWalletTransaction.wallet;
    this.stock = iWalletTransaction.stock;
    this.accountTransaction = iWalletTransaction.accountTransaction;
    this.createdAt = iWalletTransaction.createdAt;
    this.updatedAt = iWalletTransaction.updatedAt;
  }

  toBuyAndSellResponse = () => {
    const oldBalance = this.accountTransaction.account.balance;
    const transactionValue = this.accountTransaction.value;
    const transactionType = this.accountTransaction.type;
    const isBuy = transactionType === AccountTransactionTypes.BUY;
    return {
      codCliente: this.wallet.client?.id,
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
