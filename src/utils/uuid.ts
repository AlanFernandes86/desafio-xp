import { v5 as uuidv5 } from 'uuid';

const UUID_SECRET = '2084f460-5e44-4d91-a445-e85bfd391f08';

const getPasswordHash = (password: string): string => (
  uuidv5(password, UUID_SECRET)
);

export default { getPasswordHash };
