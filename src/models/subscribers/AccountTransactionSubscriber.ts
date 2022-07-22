/* eslint-disable class-methods-use-this */
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import Account from '../entities/Account';
import AccountTransaction from '../entities/AccountTransaction';
import AccountTransactionTypes from '../enums/AccountTransactionTypes';

@EventSubscriber()
class AccountTransactionSubscriber implements EntitySubscriberInterface<AccountTransaction> {
  /**
     * Indicates that this subscriber only listen to AccountTransaction events.
     */
  listenTo() {
    return AccountTransaction;
  }

  /**
     * Called after AccountTransaction insertion.
     */
  afterInsert(event: InsertEvent<AccountTransaction>) {
    const transaction = event.entity;

    if (
      transaction.type === AccountTransactionTypes.SELL
      || transaction.type === AccountTransactionTypes.DESPOSIT
    ) {
      event.manager.update(
        Account,
        transaction.account.id,
        { balance: transaction.account.balance + transaction.value },
      );
    }

    if (
      transaction.type === AccountTransactionTypes.BUY
      || transaction.type === AccountTransactionTypes.WITHDRAW
    ) {
      event.manager.update(
        Account,
        transaction.account.id,
        { balance: transaction.account.balance - transaction.value },
      );
    }
  }
}

export default AccountTransactionSubscriber;
