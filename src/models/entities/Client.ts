import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Account from './Account';
import Wallet from './Wallet';
import DomainClient from '../../domain/Client';

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
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  toDomainClient = (): DomainClient => (
    new DomainClient(
      this.id,
      this.name,
      this.password,
      this.username,
      this.account,
      this.wallet,
      this.createdAt,
      this.updatedAt,
    )
  );
}

export default Client;
