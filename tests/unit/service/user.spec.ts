import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';

import { User } from '@/datastore/entities';
import { UserRepository } from '@/interfaces/repository';
import { AuthenticationService, UserService } from '@/interfaces/service';
import { CreateUserVariables, LoginVariables } from '@/interfaces/service/user';
import { AuthorizingUserService } from '@/service/user';
import { AuthenticationError } from '@/utils/errors';

import { expectAnyError, expectIllegalArgumentError } from '../utils/errors';

describe('AuthorizingUserService', () => {
  let service: UserService;
  const userRepositoryMock = mock<UserRepository>();
  const authServiceMock = mock<AuthenticationService>();

  const user = Object.assign(new User(), {
    userName: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: faker.datatype.number(),
  });

  beforeEach(() => {
    service = new AuthorizingUserService(userRepositoryMock, authServiceMock);
  });

  describe('.create', () => {
    let createVars: CreateUserVariables;
    const email = faker.internet.email().toUpperCase();
    beforeEach(() => {
      createVars = {
        userName: faker.name.firstName(),
        email,
        password: faker.internet.password(),
      };
    });

    describe('with email that exists', () => {
      it('throws IllegalArgumentError', async () => {
        userRepositoryMock.findBy.mockResolvedValue(Object.assign(new User()));
        await expectIllegalArgumentError(service.create(createVars));
      });
    });

    describe('with email that does not exist', () => {
      it('succeeds', async () => {
        const encryptedPassword = faker.datatype.string();
        authServiceMock.encrypt.mockResolvedValue(encryptedPassword);
        userRepositoryMock.findBy.mockResolvedValue(undefined);

        userRepositoryMock.create.mockResolvedValue(user);
        await service.create(createVars);

        expect(userRepositoryMock.create).toHaveBeenCalledWith({
          ...createVars,
          email: email.toLowerCase(),
          password: encryptedPassword,
        });

        expect(authServiceMock.signToken).toHaveBeenCalledWith({
          userName: user.userName,
          userId: user.id,
        });
      });
    });
  });

  describe('.login', () => {
    let loginVars: LoginVariables;
    const email = faker.internet.email().toUpperCase();
    const token = faker.datatype.toString();
    beforeEach(() => {
      loginVars = {
        email,
        password: faker.internet.password(),
      };
    });

    describe('with email that does not exist', () => {
      it('throws AuthenticationError', async () => {
        userRepositoryMock.findBy.mockResolvedValue(undefined);
        await expectAnyError(service.login(loginVars), AuthenticationError);
      });
    });

    describe('with email that exists', () => {
      describe('with wrong password', () => {
        it('throws AuthenticationError', async () => {
          userRepositoryMock.findBy.mockResolvedValue(user);
          authServiceMock.verify.mockResolvedValue(false);
          await expectAnyError(service.login(loginVars), AuthenticationError);
        });
      });

      describe('with correct password', () => {
        it('succeeds', async () => {
          userRepositoryMock.findBy.mockResolvedValue(user);
          authServiceMock.verify.mockResolvedValue(true);
          authServiceMock.signToken.mockResolvedValue(token);

          await service.login(loginVars);
          expect(authServiceMock.verify).toHaveBeenCalledWith(user.password, loginVars.password);
          expect(authServiceMock.signToken).toHaveBeenCalledWith({
            userName: user.userName,
            userId: user.id,
          });
        });
      });
    });
  });
});
