import * as MySqlDataSource from '../../models/MySqlDataSource';
import * as brapi from '../../data/network/brapi.api';
import TestHelper from '../../tests/TestHelperSQLite';
import initializeDatabase from '../../helpers/initializeDatabase';
import brapApiMock from '../../tests/brap.api.mock';
import investimentosRepository from '../investimentos.repository';

describe('Testes da camada de repository(investimentos) da aplicação', () => {
  let mockGetDataSource: jest.SpyInstance;
  let mockBrapApi: jest.SpyInstance;

  beforeAll(async () => {
    jest.setTimeout(60000);

    await TestHelper.instance.setupTestDB();

    mockGetDataSource = jest
      .spyOn(MySqlDataSource, 'default')
      .mockReturnValue(TestHelper.instance.getDataSource());

    mockBrapApi = jest
      .spyOn(brapi, 'default')
      .mockReturnValue(brapApiMock());

    await initializeDatabase();
  }, 60000);

  afterAll(async () => {
    await TestHelper.instance.dropDB();
    mockGetDataSource.mockClear();
    mockBrapApi.mockClear();
  }, 60000);

  it(
    '"getStocks()" - Testa se a função retorna todas a ações disponíveis na corretora.',
    (done) => {
      brapApiMock().then((list) => {
        investimentosRepository.getStocks().then((respositoryList) => {
          expect(respositoryList.length).toBe(list.length);
          done();
        });
      });
    },
  );
});
