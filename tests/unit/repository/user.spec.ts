import { faker } from '@faker-js/faker';
import { getCustomRepository, QueryFailedError } from 'typeorm';

import { SQLUserRepository } from '@/datastore/repositories/user';
import {
  CreateUserVariables,
  UserRepository
} from '@/interfaces/repository/user';
import { UserFactory } from '~tests/factories';

import { createRepoTestMethods } from '../utils/repository/setup';

const { it } = createRepoTestMethods();

describe('SQLUserRepository', () => {
  let repository: UserRepository;

  beforeAll(() => {
    repository = getCustomRepository(SQLUserRepository);
  });

  describe('.create', () => {
    const email = faker.internet.email();
    let vars: CreateUserVariables;
    beforeEach(() => {
      vars = {
        userName: faker.datatype.string(),
        email,
        password: faker.datatype.string(),
      };
    });
    it('succeeds', async () => {
      const createdUser = await repository.create(vars);
      expect(createdUser.id).toBeDefined();
      expect(createdUser.userName).toBe(vars.userName);
      expect(createdUser.email).toBe(vars.email);
      expect(createdUser.password).toBe(vars.password);
    });

    describe('with duplicate emails', () => {
      it('throws unique constraint error', async () => {
        try {
          await Promise.all([repository.create(vars), repository.create(vars)]);
        } catch (error) {
          if (!(error instanceof QueryFailedError)) throw error;

          expect(error.message).toContain('duplicate key value violates unique constraint');
          expect(error.parameters).toContain(email);
        }
      });
    });
  });


  describe('.findBy', () => {
    describe('with values that does not exist', () => {
      it('returns undefined', async () => {
        await UserFactory.create(); // Noise
        const foundUser = await repository.findBy({ userName: faker.datatype.uuid() });
        expect(foundUser).toBeUndefined();
      });
    });

    describe('with values that exists', () => {
      it('succeeds', async () => {
        // Noises
        await UserFactory.createList(3);
        const user = await UserFactory.create();

        const foundUser = await repository.findBy({
          userName: user.userName,
        });

        expect(foundUser).toBeDefined();
        expect(foundUser?.userName).toEqual(user.userName);
      });
    });
  });
});
