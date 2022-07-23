import IClient from '../interfaces/IClient';
import Client from '../domain/Client';
import clientRepository from '../repository/client.repository';

const setClient = async (iClient: IClient): Promise<Client> => {
  const newClient = await clientRepository.setClient(iClient);

  return newClient;
};

const getClientById = async (clientId: number): Promise<Client> => {
  const client = await clientRepository.getClientById(clientId);

  return client;
};

export default {
  setClient,
  getClientById,
};
