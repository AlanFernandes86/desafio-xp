import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import StringToDecimal from '../../utils/StringToNumberTransformer';
import WalletStock from './WalletStock';
import WalletTransaction from './WalletTransaction';

@Entity('Stock')
class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @OneToMany(() => WalletTransaction, (walletTransaction) => walletTransaction.stock)
    walletTransactions!: WalletTransaction[];

  @OneToMany(
    () => WalletStock,
    (walletStock) => walletStock.stock,
  )
    walletStocks!: WalletStock[];

  @Column()
    codAcao!: string;

  @Column()
    shortName!: string;

  @Column()
    longName!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    transformer: new StringToDecimal(),
  })
    marketPrice!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    transformer: new StringToDecimal(),
  })
    marketDayLow!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    transformer: new StringToDecimal(),
  })
    marketDayHigh!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    transformer: new StringToDecimal(),
  })
    marketChange!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    transformer: new StringToDecimal(),
  })
    marketChangePercent!: number;

  @Column()
    marketTime!: Date;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 0,
    transformer: new StringToDecimal(),
  })
    totalQuantity!: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 0,
    transformer: new StringToDecimal(),
  })
    availableQuantity!: number;

  @Column()
    companyLogoUrl?: string;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;
}

export default Stock;
