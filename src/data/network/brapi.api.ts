import axios from 'axios';
import brapApiMock from '../../tests/brap.api.mock';
import stockSymbolList from '../local/stockSymbolList';
import IApiStock from './IApiStock';

const BASE_URL = 'https://brapi.dev/api';

type GetFullStockDataResponse = {
  results: IApiStock[];
};

const getFullStockData = async (): Promise<IApiStock[]> => {
  const symbols = stockSymbolList.map(({ symbol }) => symbol).join(',');

  try {
    const { data } = await axios.get<GetFullStockDataResponse>(
      `${BASE_URL}/quote/${symbols}?range=1d&interval=1d&fundamental=false`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    console.log('Dados online atualizados da api.');
    return data.results;
  } catch (error) {
    console.log('Dados offline mockados.');
    const mockStockList = await brapApiMock();

    return mockStockList;
  }
};

export default getFullStockData;
