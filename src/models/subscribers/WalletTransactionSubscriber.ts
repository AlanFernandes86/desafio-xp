/* eslint-disable class-methods-use-this */
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import WalletTransaction from '../entities/WalletTransaction';

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
    console.log('BEFORE POST INSERTED: ', event.entity);
  }
}

export default WalletTransactionSubscriber;
