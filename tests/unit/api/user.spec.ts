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
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phoneNumber: '',
        });
        expect(response.statusCode).toBe(StatusCode.BadRequest);
      });
    });

    describe('with valid input', () => {
      it('succeeds', async () => {
        const response = await request(app)
          .post(`${BASE_ENDPOINT}`)
          .send({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phoneNumber: faker.phone.number('+2348#########'),
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
