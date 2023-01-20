import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';

import { UserRepository } from '@/interfaces/repository';
import { SignTokenVars } from '@/interfaces/service/auth';
import { AuthenticationServiceImpl } from '@/service';
import { EntityNotFoundError } from '@/utils/errors';
import { UserFactory } from '~tests/factories';

import { expectAnyError, expectEntityNotFoundError } from '../utils/errors';

describe('AuthenticationServiceImpl', () => {
  const userRepositoryMock = mock<UserRepository>();
  const authService = new AuthenticationServiceImpl(userRepositoryMock);

  const getValidToken = async (): Promise<{ token: string; signVars: SignTokenVars }> => {
    const signVars: SignTokenVars = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userId: faker.datatype.number(),
    };

    const token = await authService.signToken(signVars);
    return { token, signVars };
  };

  describe('.encrypt', () => {
    it('returns a different string', async () => {
      const password = faker.datatype.string();
      const encrptedPassword = await authService.encrypt(password);
      expect(encrptedPassword).not.toEqual(password);
    });
  });

  describe('.verify', () => {
    describe('with the correct password', () => {
      it('returns true', async () => {
        const password = faker.datatype.string();
        const encrptedPassword = await authService.encrypt(password);
        const isValid = await authService.verify(encrptedPassword, password);
        expect(isValid).toBeTruthy();
      });
    });

    describe('with the wrong password', () => {
      it('returns false', async () => {
        const password = faker.datatype.string();
        const encrptedPassword = await authService.encrypt(password);
        const isValid = await authService.verify(encrptedPassword, faker.internet.password(20));
        expect(isValid).toBeFalsy();
      });
    });
  });

  describe('.signToken', () => {
    it('returns a string token', async () => {
      const signVars = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userId: faker.datatype.number(),
      };
      const token = await authService.signToken(signVars);
      expect(typeof token).toBe('string');
    });
  });

  describe('.decodeToken', () => {
    describe('with valid jwt token', () => {
      it('returns correct object', async () => {
        const { token, signVars } = await getValidToken();
        const decodedToken = await authService.decodeToken(token);
        expect(decodedToken.firstName).toBe(signVars.firstName);
        expect(decodedToken.lastName).toBe(signVars.lastName);
        expect(decodedToken.userId).toBe(signVars.userId);
      });
    });

    describe('with expired token', () => {
      it('throws Error', async () => {
        const expiredToken = await authService.signToken(
          {
            firstName: faker.datatype.string(),
            lastName: faker.datatype.string(),
            userId: faker.datatype.number(),
          },
          { expiresIn: '-1m' },
        );
        expectAnyError(authService.decodeToken(expiredToken), jwt.TokenExpiredError);
      });
    });

    describe('with invalid jwt token', () => {
      it('throws error', async () => {
        await expectAnyError(
          authService.decodeToken(faker.datatype.string()),
          jwt.JsonWebTokenError,
        );
      });
    });
  });

  describe('.getAuthenticatedUserFromToken', () => {
    describe('with user that does not exist', () => {
      it('throws EntityNotFoundError', async () => {
        const { token, signVars } = await getValidToken();
        userRepositoryMock.findByIdOrFail
          .calledWith(signVars.userId)
          .mockRejectedValue(new EntityNotFoundError(''));

        await expectEntityNotFoundError(authService.getAuthenticatedUserFromToken(token));
      });
    });

    describe('with user that exists', () => {
      it('succeeds', async () => {
        const { token, signVars } = await getValidToken();
        const user = UserFactory.build();
        userRepositoryMock.findByIdOrFail.calledWith(signVars.userId).mockResolvedValue(user);
        const authenticatedUser = await authService.getAuthenticatedUserFromToken(token);
        expect(authenticatedUser).toEqual(user);
      });
    });
  });
});
