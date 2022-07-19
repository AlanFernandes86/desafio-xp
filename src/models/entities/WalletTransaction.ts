import { 
  BaseEntity, Entity, 
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToOne,
  JoinColumn,
} from 'typeorm';
import { AccountTransaction } from './AccountTransaction';
import { Client } from './Client';
import { Stock } from './Stock';
import { Wallet } from './Wallet';

@Entity('WalletTransaction')
export class WalletTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @Column({
    type: 'decimal',
  })
  stockMarketPrice!: number;

  @Column()
  stockMarketTime!: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.walletTransactions)
  wallet!: Wallet;

  @ManyToOne(() => Stock, (stock) => stock.walletTransactions)
  stock!: Stock;

  @OneToOne(() => AccountTransaction)
  @JoinColumn() 
  accountTransaction?: AccountTransaction;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}