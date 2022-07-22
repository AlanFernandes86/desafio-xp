import IAccount from './IAccount';
import IWallet from './IWallet';

interface IClient {
  id?: number,
  name: string,
  username: string,
  password: string,
  account?: IAccount;
  wallet?: IWallet;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IClient;
