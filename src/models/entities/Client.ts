import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Account from './Account';
import Wallet from './Wallet';
import DomainClient from '../../domain/Client';
import IAccount from '../../interfaces/IAccount';
import IWallet from '../../interfaces/IWallet';
import IClient from '../../interfaces/IClient';

@Entity('Client')
class Client extends BaseEntity implements IClient {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  @Column({
    unique: true,
  })
    username!: string;

  @Column()
    password!: string;

  @OneToOne(
    () => Account,
    (account) => account.client,
    { cascade: true },
  )
    account!: Account;

  @OneToOne(
    () => Wallet,
    (wallet) => wallet.client,
    { cascade: true },
  )
    wallet!: Wallet;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Client;
