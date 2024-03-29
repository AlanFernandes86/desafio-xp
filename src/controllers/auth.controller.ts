import { Request, Response } from 'express';
import authService from '../services/auth.service';
import clientService from '../services/client.service';

const setClient = async (
  req: Request,
  res: Response,
) => {
  const { body } = req;
  const newClient = await clientService.setClient(body);
  const token = authService.getNewToken(newClient.toIClientPayload());

  res.status(201).json({ clientId: newClient.id, token });
};

const login = async (
  req: Request,
  res: Response,
) => {
  const { body } = req;
  const client = await authService.login(body);
  const token = authService.getNewToken(client.toIClientPayload());

  res.status(200).json({ client, token });
};

export default { setClient, login };
