import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToOne,
} from 'typeorm';
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

  @OneToOne(() => Account, (account) => account.client)
    account!: Account;

  @OneToOne(() => Wallet, (wallet) => wallet.client)
    wallet!: Wallet;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Client;
