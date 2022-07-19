import { 
  BaseEntity, Entity, 
  PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Client } from './Client';
import { WalletTransaction } from './WalletTransaction';

@Entity('Wallet')
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Client)
  @JoinColumn() 
  client?: Client;

  @OneToMany(() => WalletTransaction, (walletTransaction) => walletTransaction.wallet)
  walletTransactions?: WalletTransaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}