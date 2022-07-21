import IAccountTransaction from '../interfaces/IAccountTransaction';
import Account from '../models/entities/Account';
import HttpError from '../shared/HttpError';

const setAccountTransaction = async (transaction: IAccountTransaction): Promise<Account> => {
  try {
    console.log('');
  } catch (error) {
    throw new HttpError(500, 'Usuário ou senha inválidos');
  }
};

export default { setAccountTransaction };
