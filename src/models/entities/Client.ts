import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import IClient from '../../interfaces/IClient';
import IClientPayload from '../../interfaces/IClientPayload';
import Account from './Account';
import Wallet from './Wallet';

@Entity('Client')
class Client extends BaseEntity {
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
    createdAt?: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  toIClient = (): IClient => (
    {
      id: this.id,
      name: this.name,
      password: this.password,
      username: this.username,
      account: this.account,
      wallet: this.wallet,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as IClient
  );

  toIClientPayload = (): IClientPayload => (
    {
      id: this.id,
      name: this.name,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as IClientPayload
  );
}

export default Client;
