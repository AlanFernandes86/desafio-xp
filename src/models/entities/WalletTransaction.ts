import {
  BaseEntity, Entity,
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToOne,
  JoinColumn,
} from 'typeorm';
import StringToDecimal from '../../utils/StringToNumberTransformer';
import AccountTransactionTypes from '../enums/AccountTransactionTypes';
import AccountTransaction from './AccountTransaction';
import Stock from './Stock';
import Wallet from './Wallet';

@Entity('WalletTransaction')
export class WalletTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 0,
    transformer: new StringToDecimal(),
  })
    quantity!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    transformer: new StringToDecimal(),
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
    accountTransaction!: AccountTransaction;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  toBuyAndSellResponse = () => {
    const oldBalance = this.accountTransaction.account.balance;
    const transactionValue = this.accountTransaction.value;
    const transactionType = this.accountTransaction.type;
    const isBuy = transactionType === AccountTransactionTypes.BUY;
    return {
      codClient: this.wallet.client?.id,
      codAtivo: this.stock.id,
      quantityTransacted: this.quantity,
      oldBalance,
      newBalance: isBuy ? oldBalance - transactionValue : oldBalance + transactionValue,
      transactionValue,
      transactionType,
    };
  };
}

export default WalletTransaction;
