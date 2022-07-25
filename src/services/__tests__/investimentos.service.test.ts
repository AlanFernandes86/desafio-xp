import * as MySqlDataSource from '../../models/MySqlDataSource';
import * as brapi from '../../data/network/brapi.api';
import TestHelper from '../../tests/TestHelperSQLite';
import initializeDatabase from '../../helpers/initializeDatabase';
import brapApiMock from '../../tests/brap.api.mock';
import investimentosService from '../investimentos.service';
import WalletStock from '../../models/entities/WalletStock';
import IClient from '../../interfaces/IClient';
import clientService from '../client.service';

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

    const payload = {
      name: 'alan Fernandes',
      username: 'AjnfXP',
      password: '123456',
    } as IClient;

    const newClient = await clientService.setClient(payload);

    const dataSource = await TestHelper.instance.getDataSource();
    await dataSource.createQueryBuilder().insert().into(WalletStock)
      .values([
        {
          stockId: 10,
          walletId: newClient.wallet.id,
          quantity: 150,
        },
        {
          stockId: 5,
          walletId: newClient.wallet.id,
          quantity: 200,
        },
        {
          stockId: 30,
          walletId: newClient.wallet.id,
          quantity: 300,
        },
        {
          stockId: 40,
          walletId: newClient.wallet.id,
          quantity: 500,
        },
      ])
      .execute();
  }, 60000);

  afterAll(async () => {
    await TestHelper.instance.dropDB();
    mockGetDataSource.mockClear();
    mockBrapApi.mockClear();
  }, 60000);

  it(
    '"listStocksSeparately()" - Testa se a função retorna todas a ações disponíveis na corretora separadas por "purchased" e "available".',
    (done) => {
      investimentosService.listStocksSeparately(1).then((list) => {
        expect(list).toHaveProperty('purchased');
        expect(list).toHaveProperty('available');
        done();
      });
    },
  );

  it(
    '"listStocksSeparately()" - Testa se as ações em "purchased" contém a quantidade comprada.',
    (done) => {
      investimentosService.listStocksSeparately(1).then((list) => {
        expect(list.purchased[0]).toHaveProperty('purchasedQuantity');
        done();
      });
    },
  );
});
