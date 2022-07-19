import { 
  BaseEntity, Entity, 
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm';
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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}