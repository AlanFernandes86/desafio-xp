import supertest, { Response } from 'supertest';
import app from '../../app';

beforeAll((): void => {
  jest.setTimeout(60000);
});

afterAll((): void => {
  jest.setTimeout(60000);
});

describe('Testes da rota /conta', () => {
  test('Testa que não é possível consultar uma conta ao tentar acessar sem token', (done) => {
    supertest(app)
      .get('/conta/1')
      .then((response: Response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Token not found');
        done();
      });
  });
});
