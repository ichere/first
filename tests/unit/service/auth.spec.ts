import { faker } from '@faker-js/faker';

import { AuthenticationServiceImpl } from '@/service';

describe('AuthenticationServiceImpl', () => {
  const authService = new AuthenticationServiceImpl();

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
        userName: faker.datatype.string(),
        userId: faker.datatype.number(),
      };
      const token = await authService.signToken(signVars);
      expect(typeof token).toBe('string');
    });
  });
});
