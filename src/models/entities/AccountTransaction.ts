import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import StringToDecimal from '../../utils/StringToNumberTransformer';
import AccountTransactionTypes from '../enums/AccountTransactionTypes';
import Account from './Account';

@Entity('AccountTransaction')
class AccountTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    transformer: new StringToDecimal(),
  })
    value!: number;

  @ManyToOne(() => Account, (account) => account.accountTransactions)
    account!: Account;

  @Column({
    type: 'enum',
    enum: AccountTransactionTypes,
  })
    type!: string;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default AccountTransaction;
