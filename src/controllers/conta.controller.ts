import { Request, Response } from 'express';

const deposit = async (
  req: Request,
  res: Response,
) => {
  const { body } = req;

  res.status(200).json('{ client, token }');
};

export default { deposit };
