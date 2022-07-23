import IAccount from '../interfaces/IAccount';
import IClient from '../interfaces/IClient';
import IClientPayload from '../interfaces/IClientPayload';
import IWallet from '../interfaces/IWallet';

class Client implements IClient {
  id?: number | undefined;

  name: string;

  username: string;

  password: string;

  account: IAccount;

  wallet: IWallet;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    id: number | undefined,
    name: string,
    username: string,
    password: string,
    account: IAccount,
    wallet: IWallet,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.account = account;
    this.wallet = wallet;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toIClientPayload = (): IClientPayload => (
    {
      id: this.id,
      name: this.name,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as IClientPayload
  );
}

export default Client;
