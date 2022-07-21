import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import WalletStock from './WalletStock';
import WalletTransaction from './WalletTransaction';

@Entity('Stock')
class Stock extends BaseEntity {
  @PrimaryColumn()
    id!: number;

  @OneToMany(() => WalletTransaction, (walletTransaction) => walletTransaction.stock)
    walletTransactions?: WalletTransaction[];

  @OneToMany(() => WalletStock, (walletStock) => walletStock.stock)
    walletStocks!: WalletStock[];

  @Column()
    codAcao!: string;

  @Column()
    shortName!: string;

  @Column()
    fullName!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
    marketPrice!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
    marketDayLow!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
    marketDayHigh!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
    marketChange!: number;

  @Column()
    marketChangePercent!: string;

  @Column()
    marketTime!: Date;

  @Column()
    totalQuantity!: number;

  @Column()
    availableQuantity!: number;

  @Column()
    companyLogoUrl?: string;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Stock;
