import { v5 as uuidv5 } from 'uuid';

const SECRET: string = process.env.UUID_SECRET!;

const getPasswordHash = (password: string): string => (
  uuidv5(password, SECRET)
);

export default { getPasswordHash };
