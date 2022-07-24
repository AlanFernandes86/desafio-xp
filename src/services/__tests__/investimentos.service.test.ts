import * as MySqlDataSource from '../../models/MySqlDataSource';
import * as brapi from '../../data/network/brapi.api';
import TestHelper from '../../../tests/TestHelperSQLite';
import initializeDatabase from '../../helpers/initializeDatabase';
import brapApiMock from '../../../tests/brap.api.mock';

describe('Testes da camada de service(investimentos) da aplicação', () => {
  let mockGetDataSource: jest.SpyInstance;
  let mockBrapApi: jest.SpyInstance;

  beforeAll(async () => {
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
    '"listStocksSeparately()" - Testa se a função retorna todas a ações disponíveis na corretora separadas por "purchased" e "available".',
    (done) => {
      brapApiMock().then((list) => {
        expect([]).toContainEqual(list);
        done();
      });
    },
  );

  it(
    '"listStocksSeparately()" - Testa se as ações "purchased" contém a quantidade comprada.',
    (done) => {
      brapApiMock().then((list) => {
        expect([]).toContainEqual(list);
        done();
      });
    },
  );
});
