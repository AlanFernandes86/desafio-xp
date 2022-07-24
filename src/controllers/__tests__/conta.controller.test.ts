import supertest, { Response } from 'supertest';
import TestHelper from '../../../tests/TestHelper';
import * as MySqlDataSource from '../../models/MySqlDataSource';
import * as brapi from '../../data/network/brapi.api';
import app from '../../app';
import { generateTokenJWT } from '../../utils/JWT';
import IClient from '../../interfaces/IClient';
import clientService from '../../services/client.service';
import investimentosService from '../../services/investimentos.service';
import Client from '../../domain/Client';
import AccountTransactionTypes from '../../models/enums/AccountTransactionTypes';
import initializeDatabase from '../../helpers/initializeDatabase';
import brapApiMock from '../../../tests/brap.api.mock';

describe('Testes da camada da conta do cliente', () => {
  let mockGetDataSource: jest.SpyInstance;
  let mockBrapApi: jest.SpyInstance;
  let newClient: Client;
  let token: string;

  const payload = {
    name: 'alan Fernandes',
    username: 'AjnfXP',
    password: '123456',
  } as IClient;

  beforeAll(async () => {
    await TestHelper.instance.setupTestDB();

    mockGetDataSource = jest
      .spyOn(MySqlDataSource, 'default')
      .mockReturnValue(TestHelper.instance.getDataSource());

    mockBrapApi = jest
      .spyOn(brapi, 'default')
      .mockReturnValue(brapApiMock());

    newClient = await clientService.setClient(payload);
    token = generateTokenJWT(newClient.toIClientPayload());

    await initializeDatabase();
  }, 60000);

  afterAll(async () => {
    await TestHelper.instance.dropDB();
    mockGetDataSource.mockClear();
    mockBrapApi.mockClear();
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
            valor: 100000,
          },
        )
        .then((response: Response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    },
  );

  it(
    '"/conta/deposito" - Testa que não é possível fazer depósito com o número 0(zero).',
    (done) => {
      supertest(app)
        .post('/conta/deposito')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            valor: 0,
          },
        )
        .then((response: Response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    },
  );

  it(
    '"/conta/deposito" - Testa que não é possível fazer depósito com número negativo.',
    (done) => {
      supertest(app)
        .post('/conta/deposito')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            valor: -1,
          },
        )
        .then((response: Response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    },
  );

  it(
    '"/conta/saque" - Testa se é possível fazer saque em uma conta.',
    (done) => {
      supertest(app)
        .post('/conta/saque')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            valor: 10000,
          },
        )
        .then((response: Response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    },
  );

  it(
    '"/conta/:codClient" - Testa se retorna o saldo da conta pelo codCliente.',
    (done) => {
      supertest(app)
        .get(`/conta/${newClient.id}`)
        .set('Authorization', token)
        .then((response: Response) => {
          expect(response.body.balance).toBe(90000);
          expect(response.statusCode).toBe(200);
          done();
        });
    },
  );

  it(
    '"/conta/ativos/:codClient" - Testa se retorna os ativos do cliente pelo codClient.',
    (done) => {
      const request1 = {
        codCliente: newClient.id!,
        codAtivo: 10,
        qtdeAtivo: 200,
        type: AccountTransactionTypes.BUY,
      };

      const request2 = {
        codCliente: newClient.id!,
        codAtivo: 1,
        qtdeAtivo: 100,
        type: AccountTransactionTypes.BUY,
      };

      investimentosService.setWalletTransaction(request1).then(() => {
        investimentosService.setWalletTransaction(request2).then(() => {
          supertest(app)
            .get(`/conta/ativos/${newClient.id}`)
            .set('Authorization', token)
            .then((response: Response) => {
              expect(response.body.length).toBe(2);
              expect(response.statusCode).toBe(200);
              done();
            });
        });
      });
    },
  );

  it(
    '"/conta/saque" - Testa que não é possível fazer saque maior que o saldo em conta.',
    (done) => {
      supertest(app)
        .post('/conta/saque')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            valor: 100000,
          },
        )
        .then((response: Response) => {
          expect(response.body.message).toBe('Saldo insuficiente.');
          expect(response.statusCode).toBe(400);
          done();
        });
    },
  );

  it(
    '"/conta/saque" - Testa que não é possível fazer saque com o número 0(zero).',
    (done) => {
      supertest(app)
        .post('/conta/saque')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            valor: 0,
          },
        )
        .then((response: Response) => {
          expect(response.body.message).toBe('Não é possivel sacar valor menor ou igual a 0(zero)');
          expect(response.statusCode).toBe(400);
          done();
        });
    },
  );

  it(
    '"/conta/saque" - Testa que não é possível fazer saque com o número negativo.',
    (done) => {
      supertest(app)
        .post('/conta/saque')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            valor: -1,
          },
        )
        .then((response: Response) => {
          expect(response.body.message).toBe('Não é possivel sacar valor menor ou igual a 0(zero)');
          expect(response.statusCode).toBe(400);
          done();
        });
    },
  );
});
