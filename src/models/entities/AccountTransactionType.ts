import { 
  BaseEntity, Entity, 
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AccountTransaction } from './AccountTransaction';

@Entity('AccountTransactionType')
export class AccountTransactionType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @OneToMany(() => AccountTransaction, (accountTransaction) => accountTransaction.accountTransactionType)
  accountTransactions?: AccountTransaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}