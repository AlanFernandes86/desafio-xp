import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToOne, OneToMany,
  JoinColumn,
} from 'typeorm';
import AccountTransaction from './AccountTransaction';
import Client from './Client';

@Entity('Account')
class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({
    type: 'decimal',
  })
    balance!: number;

  @OneToOne(() => Client)
  @JoinColumn()
    client?: Client;

  @OneToMany(
    () => AccountTransaction,
    (accountTransaction) => accountTransaction.account,
  )
    accountTransactions?: AccountTransaction[];

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Account;
