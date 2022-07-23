import IClient from '../interfaces/IClient';
import IClientPayload from '../interfaces/IClientPayload';
import { generateTokenJWT } from '../utils/JWT';
import clientRepository from '../repository/client.repository';
import Client from '../domain/Client';

const getNewToken = (payload: IClientPayload): string => generateTokenJWT(payload);

const login = async (iClient: IClient): Promise<Client> => {
  const client = await clientRepository.getClientByUsernameAndPassword(
    iClient.username,
    iClient.password,
  );

  return client;
};

export default {
  getNewToken,
  login,
};
