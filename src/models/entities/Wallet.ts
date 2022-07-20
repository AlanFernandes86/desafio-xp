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

@Entity('Wallet')
class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @OneToOne(() => Client)
  @JoinColumn()
    client?: Client;

  @OneToMany(() => WalletTransaction, (walletTransaction) => walletTransaction.wallet)
    walletTransactions?: WalletTransaction[];

  @OneToMany(() => WalletStock, (walletStock) => walletStock.wallet)
    walletStocks!: WalletStock[];

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Wallet;
