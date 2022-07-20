import { Request, Response } from 'express';
import authService from '../services/auth.service';

const setClient = async (
  req: Request,
  res: Response,
) => {
  const { body } = req;
  const newClient = await authService.setClient(body);
  const token = authService.getNewToken(newClient.toIClientPayload());

  res.status(201).json({ clientId: newClient.id, token });
};

export default { setClient };
