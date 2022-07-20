/* eslint-disable class-methods-use-this */
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import AccountTransaction from '../entities/AccountTransaction';

@EventSubscriber()
class AccountTransactionSubscriber implements EntitySubscriberInterface<AccountTransaction> {
  /**
     * Indicates that this subscriber only listen to AccountTransaction events.
     */
  listenTo() {
    return AccountTransaction;
  }

  /**
     * Called before AccountTransaction insertion.
     */
  afterInsert(event: InsertEvent<AccountTransaction>) {
    console.log('BEFORE POST INSERTED: ', event.entity);
  }
}

export default AccountTransactionSubscriber;
