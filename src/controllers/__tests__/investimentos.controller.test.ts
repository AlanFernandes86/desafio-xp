import supertest, { Response } from 'supertest';
import TestHelper from '../../../tests/TestHelper';
import * as MySqlDataSource from '../../models/MySqlDataSource';
import * as brapi from '../../data/network/brapi.api';
import app from '../../app';
import { generateTokenJWT } from '../../utils/JWT';
import IClient from '../../interfaces/IClient';
import clientService from '../../services/client.service';
import AccountTransactionTypes from '../../models/enums/AccountTransactionTypes';
import contaService from '../../services/conta.service';
import Client from '../../domain/Client';
import initializeDatabase from '../../helpers/initializeDatabase';
import brapApiMock from '../../../tests/brap.api.mock';
import IAccountTransactionRequest from '../../interfaces/IAccountTransactionRequest';

describe('Testes da camada de investimentos da aplicação', () => {
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

    const deposito = {
      codCliente: newClient.id,
      valor: 1000000,
      type: AccountTransactionTypes.DESPOSIT,
    } as IAccountTransactionRequest;

    await contaService.setAccountTransaction(deposito);
    await initializeDatabase();
  }, 60000);

  afterAll(async () => {
    await TestHelper.instance.dropDB();
    mockGetDataSource.mockClear();
    mockBrapApi.mockClear();
  }, 60000);

  it(
    '"/investimentos/comprar" - Testa se é possível realizar a compra de ativo.',
    (done) => {
      supertest(app)
        .post('/investimentos/comprar')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            codAtivo: 10,
            qtdeAtivo: 1000,
          },
        )
        .then((response: Response) => {
          expect(response.body.transactionType).toBe('buy');
          expect(response.statusCode).toBe(200);
          done();
        });
    },
  );

  it(
    '"/investimentos/vender" - Testa se é possível realizar a venda de ativo.',
    (done) => {
      supertest(app)
        .post('/investimentos/vender')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            codAtivo: 10,
            qtdeAtivo: 1000,
          },
        )
        .then((response: Response) => {
          expect(response.body.transactionType).toBe('sell');
          expect(response.statusCode).toBe(200);
          done();
        });
    },
  );

  it(
    '"/investimentos/vender" - Testa que não é possível realizar a venda de ativos sem a quantidade na carteira.',
    (done) => {
      supertest(app)
        .post('/investimentos/vender')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            codAtivo: 10,
            qtdeAtivo: 1000,
          },
        )
        .then((response: Response) => {
          expect(response.body.message).toBe('Quantidade de ativos na carteira menor que a solitação de venda.');
          expect(response.statusCode).toBe(400);
          done();
        });
    },
  );

  it(
    '"/investimentos/comprar" - Testa que não é possível realizar a compra de mais ativos do que o disponível na corretora.',
    (done) => {
      supertest(app)
        .post('/investimentos/comprar')
        .set('Authorization', token)
        .send(
          {
            codCliente: newClient.id,
            codAtivo: 1,
            qtdeAtivo: 100001,
          },
        )
        .then((response: Response) => {
          expect(response.body.message).toBe('Quantidade de ativos disponiveis para venda na corretora insuficiente.');
          expect(response.statusCode).toBe(400);
          done();
        });
    },
  );
});
