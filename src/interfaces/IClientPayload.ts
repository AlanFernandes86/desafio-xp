import IClient from './IClient';

type IClientPayload = Omit<IClient, 'password' | 'account' | 'wallet'>;

export default IClientPayload;
