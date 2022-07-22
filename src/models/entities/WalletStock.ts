import {
  BaseEntity, Entity,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, Column,
  PrimaryColumn,
} from 'typeorm';
import StringToDecimal from '../../utils/StringToNumberTransformer';
import Stock from './Stock';
import Wallet from './Wallet';

@Entity('WalletStock')
class WalletStock extends BaseEntity {
  @PrimaryColumn()
    walletId!: number;

  @PrimaryColumn()
    stockId!: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 0,
    transformer: new StringToDecimal(),
  })
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
