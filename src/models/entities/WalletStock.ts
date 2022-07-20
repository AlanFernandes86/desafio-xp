import {
  BaseEntity, Entity,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, Column,
  PrimaryColumn,
} from 'typeorm';
import Stock from './Stock';
import Wallet from './Wallet';

@Entity('WalletStock')
class WalletStock extends BaseEntity {
  @PrimaryColumn()
    walletId!: number;

  @PrimaryColumn()
    stockId!: number;

  @Column()
    quantity!: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.walletStocks)
    wallet!: Wallet;

  @ManyToOne(() => Stock, (stock) => stock.walletStocks)
    stock!: Stock;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default WalletStock;
