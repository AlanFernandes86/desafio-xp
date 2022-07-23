import supertest, { Response } from 'supertest';
import TestHelper from '../../../tests/TestHelper';
import * as MySqlDataSource from '../../models/MySqlDataSource';
import app from '../../app';
import { generateTokenJWT } from '../../utils/JWT';
import IClient from '../../interfaces/IClient';
import clientService from '../../services/client.service';
import Client from '../../domain/Client';

describe('Testes da camada da conta do cliente', () => {
  let mockGetDataSource: jest.SpyInstance;
  let newClient: Client;
  let token: string;

  const payload = {
    name: 'alan Fernandes',
    username: 'Ajnf30',
    password: '123456',
  } as IClient;

  beforeAll(async () => {
    await TestHelper.instance.setupTestDB();

    mockGetDataSource = jest
      .spyOn(MySqlDataSource, 'default')
      .mockReturnValue(TestHelper.instance.getDataSource());

    newClient = await clientService.setClient(payload);
    token = generateTokenJWT(newClient.toIClientPayload());
  }, 60000);

  afterAll(async () => {
    await TestHelper.instance.dropDB();
    mockGetDataSource.mockClear();
  }, 60000);

  it(
    '"/conta/deposito" - Testa se é possível fazer depósito em uma conta.',
    (done) => {
      supertest(app)
        .post('/conta/deposito')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            valor: 1000,
          },
        )
        .then((response: Response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    },
  );
});
