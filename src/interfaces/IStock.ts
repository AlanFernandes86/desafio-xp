import WalletStock from '../models/entities/WalletStock';
import IWalletTransaction from './IWalletTransaction';

interface IStock {
  id: number;
  walletTransactions?: IWalletTransaction[];
  walletStocks?: WalletStock[];
  codAcao: string;
  shortName: string;
  longName: string;
  marketPrice: number;
  marketDayLow: number;
  marketDayHigh: number;
  marketChange: number;
  marketChangePercent: number;
  marketTime: Date;
  totalQuantity: number;
  availableQuantity: number;
  companyLogoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IStock;
