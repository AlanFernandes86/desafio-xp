import {
  BaseEntity, Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Client from './Client';
import WalletStock from './WalletStock';
import WalletTransaction from './WalletTransaction';
import DomainWallet from '../../domain/Wallet';
import IClient from '../../interfaces/IClient';
import IWalletTransaction from '../../interfaces/IWalletTransaction';
import IWallet from '../../interfaces/IWallet';

@Entity('Wallet')
class Wallet extends BaseEntity implements IWallet {
  @PrimaryGeneratedColumn()
    id!: number;

  @OneToOne(() => Client)
  @JoinColumn()
    client!: Client;

  @OneToMany(() => WalletTransaction, (walletTransaction) => walletTransaction.wallet)
    walletTransactions?: WalletTransaction[];

  @OneToMany(
    () => WalletStock,
    (walletStock) => walletStock.wallet,
  )
    walletStocks!: WalletStock[];

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Wallet;
