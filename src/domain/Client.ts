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
    client: IClient,
  ) {
    this.id = client.id;
    this.name = client.name;
    this.username = client.username;
    this.password = client.password;
    this.account = client.account;
    this.wallet = client.wallet;
    this.createdAt = client.createdAt;
    this.updatedAt = client.updatedAt;
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
