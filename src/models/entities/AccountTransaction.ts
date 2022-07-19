import { 
  BaseEntity, Entity, 
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm';
import { AccountTransactionTypes } from '../enum/AccountTransactionTypes';
import { Account } from './Account';

@Entity('AccountTransaction')
export class AccountTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'decimal',
  })
  value!: number;

  @ManyToOne(() => Account, (account) => account.accountTransactions)
  account!: Account;

  @Column({
    type: 'enum',
    enum: AccountTransactionTypes
  })
  accountTransactionType!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}