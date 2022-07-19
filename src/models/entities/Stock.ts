import { 
  BaseEntity, 
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { WalletTransaction } from './WalletTransaction';

@Entity('Stock')
export class Stock extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @OneToMany(() => WalletTransaction, (walletTransaction) => walletTransaction.stock)
  walletTransactions?: WalletTransaction[];

  @Column()
  codAcao!: string;

  @Column()
  shortName!: string;

  @Column()
  fullName!: string;

  @Column({
    type: 'decimal',
  })
  marketPrice!: number;

  @Column({
    type: 'decimal',
  })
  marketDayLow!: number;

  @Column({
    type: 'decimal',
  })
  marketDayHigh!: number;

  @Column({
    type: 'decimal',
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