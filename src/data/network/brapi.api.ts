import axios from 'axios';
import HttpError from '../../shared/HttpError';
import stockSymbolList from '../local/stockSymbolList';
import IApiStock from './IApiStock';

const BASE_URL = 'https://brapi.dev/api';

type GetFullStockDataResponse = {
  results: IApiStock[];
};

const getFullStockData = async (): Promise<IApiStock[]> => {
  const symbols = stockSymbolList.map(({ symbol }) => symbol).join(',');
  const { data, status } = await axios.get<GetFullStockDataResponse>(
    `${BASE_URL}/quote/${symbols}?range=1d&interval=1d&fundamental=false`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  if (status === 200) {
    return data.results;
  }
  throw new HttpError(status, 'Error ao buscar os dados!');
};

export default getFullStockData;
