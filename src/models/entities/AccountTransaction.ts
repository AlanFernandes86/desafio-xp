import { 
  BaseEntity, Entity, 
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm';
import { Account } from './Account';
import { AccountTransactionType } from './AccountTransactionType';

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

  @ManyToOne(() => AccountTransactionType, (accountTransactionType) => accountTransactionType.accountTransactions)
  accountTransactionType!: AccountTransactionType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}