import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '@/api/app';
import { StatusCode } from '@/api/codes';
import { setProvider } from '@/ioc/provider';
import { StubProvider } from '~tests/helper/provider';

const BASE_ENDPOINT = '/api/v1/user';

describe('USER API TEST', () => {
  beforeAll(() => {
    setProvider(StubProvider());
  });

  describe('.create', () => {
    describe('with invalid input', () => {
      it('fails with BAD_REQUEST', async () => {
        const response = await request(app).post(`${BASE_ENDPOINT}`).send({
          userName: '',
          email: '',
          password: '',
        });
        expect(response.statusCode).toBe(StatusCode.BadRequest);
      });
    });

    describe('with valid input', () => {
      it('succeeds', async () => {
        const response = await request(app).post(`${BASE_ENDPOINT}`).send({
          userName: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        });
        expect(response.statusCode).toBe(StatusCode.Success);
      });
    });
  });

  describe('.login', () => {
    describe('with invalid input', () => {
      it('fails with BAD_REQUEST', async () => {
        const response = await request(app).post(`${BASE_ENDPOINT}/login`).send({
          email: '',
          password: '',
        });
        expect(response.statusCode).toBe(StatusCode.BadRequest);
      });
    });

    describe('with valid input', () => {
      it('succeeds', async () => {
        const response = await request(app).post(`${BASE_ENDPOINT}/login`).send({
          email: faker.internet.email(),
          password: faker.internet.password(),
        });
        expect(response.statusCode).toBe(StatusCode.Success);
      });
    });
  });
});
