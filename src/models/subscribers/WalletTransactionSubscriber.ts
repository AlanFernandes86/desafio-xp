/* eslint-disable class-methods-use-this */
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import Stock from '../entities/Stock';
import WalletStock from '../entities/WalletStock';
import WalletTransaction from '../entities/WalletTransaction';
import AccountTransactionTypes from '../enums/AccountTransactionTypes';

@EventSubscriber()
class WalletTransactionSubscriber implements EntitySubscriberInterface<WalletTransaction> {
  /**
     * Indicates that this subscriber only listen to WalletTransaction events.
     */
  listenTo() {
    return WalletTransaction;
  }

  /**
     * Called after WalletTransaction insertion.
     */
  async afterInsert(event: InsertEvent<WalletTransaction>) {
    const transaction = event.entity;

    if (transaction.accountTransaction.type === AccountTransactionTypes.BUY) {
      await event.manager.update(
        Stock,
        { id: transaction.stock.id },
        { availableQuantity: transaction.stock.availableQuantity - transaction.quantity },
      );

      const walletStock = transaction.wallet.walletStocks.find(
        ({ stock }) => stock.id === transaction.stock.id,
      );

      await event.manager.upsert(
        WalletStock,
        {
          id: walletStock?.id,
          stock: transaction.stock,
          wallet: transaction.wallet,
          quantity: (walletStock?.quantity || 0) + transaction.quantity,
        },
        ['stockId', 'walletId'],
      );
    }
  }
}

export default WalletTransactionSubscriber;
