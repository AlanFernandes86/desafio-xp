import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToOne,
  JoinColumn,
} from 'typeorm';
import AccountTransaction from './AccountTransaction';
import Stock from './Stock';
import Wallet from './Wallet';

@Entity('WalletTransaction')
export class WalletTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    quantity!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
    stockMarketPrice!: number;

  @ManyToOne(
    () => Wallet,
    (wallet) => wallet.walletTransactions,
    { cascade: true },
  )
    wallet!: Wallet;

  @ManyToOne(
    () => Stock,
    (stock) => stock.walletTransactions,
    { cascade: true },
  )
    stock!: Stock;

  @OneToOne(
    () => AccountTransaction,
    { cascade: true },
  )
  @JoinColumn()
    accountTransaction?: AccountTransaction;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default WalletTransaction;
