import { faker } from '@faker-js/faker';

import { User } from '@/datastore/entities';
import { AuthenticationService, UserService } from '@/interfaces/service';
import { SignTokenOptions, SignTokenVars } from '@/interfaces/service/auth';
import {
  CreateUserVariables,
  LoginVariables,
  UserReturnVarsWithToken,
} from '@/interfaces/service/user';
import { IProvider } from '@/ioc/provider';

const user = Object.assign(new User(), {
  userName: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  id: faker.datatype.number(),
});

export default class TestProvider implements IProvider {
  private authService: AuthenticationService;

  private userService: UserService;

  public constructor($authService: AuthenticationService, $userService: UserService) {
    this.authService = $authService;
    this.userService = $userService;
  }

  public getAuthenticationService(): AuthenticationService {
    return this.authService;
  }

  public getUserService(): UserService {
    return this.userService;
  }
}

class StubAuthService implements AuthenticationService {
  public async encrypt(_password: string): Promise<string> {
    return faker.datatype.string();
  }

  public async verify(_encryptedPassword: string, _suppliedPassword: string): Promise<boolean> {
    return true;
  }

  public async signToken(
    _vars: SignTokenVars,
    _options?: SignTokenOptions | undefined,
  ): Promise<string> {
    return faker.datatype.string();
  }

  public async decodeToken(_token: string): Promise<SignTokenVars> {
    return {
      userName: faker.datatype.string(),
      userId: faker.datatype.number(),
    };
  }
}

class StubUserService implements UserService {
  public async login(_login: LoginVariables): Promise<UserReturnVarsWithToken> {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      token: faker.datatype.string(),
    };
  }

  public async create(_vars: CreateUserVariables): Promise<UserReturnVarsWithToken> {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      token: faker.datatype.string(),
    };
  }
}

export function StubProvider(): IProvider {
  return new TestProvider(new StubAuthService(), new StubUserService());
}
