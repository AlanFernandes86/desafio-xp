/* eslint-disable class-methods-use-this */
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import Stock from '../entities/Stock';
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
     * Called before WalletTransaction insertion.
     */
  afterInsert(event: InsertEvent<WalletTransaction>) {
    const transaction = event.entity;

    if (transaction.accountTransaction.type === AccountTransactionTypes.BUY) {
      event.manager.update(
        Stock,
        { id: transaction.stock.id },
        { availableQuantity: transaction.stock.availableQuantity - transaction.quantity },
      );
    }
  }
}

export default WalletTransactionSubscriber;
