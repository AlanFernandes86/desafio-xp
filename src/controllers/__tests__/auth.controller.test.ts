import supertest, { Response } from 'supertest';
import jwt from 'jsonwebtoken';
import TestHelper from '../../../tests/TestHelperSQLite';
import * as MySqlDataSource from '../../models/MySqlDataSource';
import app from '../../app';

describe('Testes da camada de controller(autenticação) do app', () => {
  let mockGetDataSource: jest.SpyInstance;

  beforeAll(async () => {
    await TestHelper.instance.setupTestDB();

    mockGetDataSource = jest
      .spyOn(MySqlDataSource, 'default')
      .mockReturnValue(TestHelper.instance.getDataSource());
  }, 60000);

  afterAll(async () => {
    await TestHelper.instance.dropDB();
    mockGetDataSource.mockClear();
  }, 60000);

  it(
    '"/conta/1" - Testa que não é possível consultar uma conta ao tentar acessar sem token',
    (done) => {
      supertest(app)
        .get('/conta/1')
        .then((response: Response) => {
          expect(response.statusCode).toBe(401);
          expect(response.body.message).toBe('Token not found');
          done();
        });
    },
  );

  it(
    '"/auth/new-client" - Testa se é possível criar um novo cliente e retorna um token válido JWT',
    (done) => {
      supertest(app)
        .post('/auth/new-client')
        .send(
          {
            name: 'alan Fernandes',
            username: 'usuario',
            password: 'senha',
          },
        )
        .then((response: Response) => {
          const { token } = response.body;
          const decode = jwt.decode(token);

          expect(decode).not.toBeNull();
          expect(response.statusCode).toBe(201);
          done();
        });
    },
  );

  it(
    '"/auth/login" - Testa se ao efetuar login com credencias corretas retorna um token JWT',
    (done) => {
      supertest(app)
        .post('/auth/login')
        .send(
          {
            username: 'usuario',
            password: 'senha',
          },
        )
        .then((response: Response) => {
          const { token } = response.body;
          const decode = jwt.decode(token);

          expect(decode).not.toBeNull();
          expect(response.statusCode).toBe(200);
          done();
        });
    },
  );

  it(
    '"/auth/login" - Testa se ao efetuar login com credencias incorretas não permite acesso',
    (done) => {
      supertest(app)
        .post('/auth/login')
        .send(
          {
            username: 'usuario',
            password: 'senha-errada',
          },
        )
        .then((response: Response) => {
          const { token } = response.body;
          const decode = jwt.decode(token);

          expect(decode).toBeNull();
          expect(response.body.message).toBe('Usuário ou senha inválido.');
          expect(response.statusCode).toBe(404);
          done();
        });
    },
  );

  it(
    '"/auth/login" - Testa se ao efetuar login com credencias incorretas vazias ou faltando não permite acesso',
    (done) => {
      supertest(app)
        .post('/auth/login')
        .send(
          {
            password: '',
          },
        )
        .then((response: Response) => {
          const { token } = response.body;
          const decode = jwt.decode(token);

          expect(decode).toBeNull();
          expect(response.body.message).toBe('Usuário ou senha inválido.');
          expect(response.statusCode).toBe(404);
          done();
        });
    },
  );
});
