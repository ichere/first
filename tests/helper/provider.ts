import { faker } from '@faker-js/faker';

import { Todo, User } from '@/datastore/entities';
import { UpdateUserVariables } from '@/interfaces/repository/user';
import { AuthenticationService, TodoService, UserService } from '@/interfaces/service';
import { SignTokenOptions, SignTokenVars } from '@/interfaces/service/auth';
import { CreateTodoVars, FindAllVars, UpdateTodoVars } from '@/interfaces/service/todo';
import {
  CreateUserVariables,
  LoginVariables,
  ResetPasswordVars,
  UpdatePasswordVars,
  UserReturnVars,
  UserReturnVarsWithToken,
} from '@/interfaces/service/user';
import { IProvider } from '@/ioc/provider';
import { TodoFactory, UserFactory } from '~tests/factories';

export default class TestProvider implements IProvider {
  private authService: AuthenticationService;

  private todoService: TodoService;

  private userService: UserService;

  public constructor(
    $authService: AuthenticationService,
    $todoService: TodoService,
    $userService: UserService,
  ) {
    this.authService = $authService;
    this.todoService = $todoService;
    this.userService = $userService;
  }

  public getTodoService(): TodoService {
    return this.todoService;
  }

  public getAuthenticationService(): AuthenticationService {
    return this.authService;
  }

  public getUserService(): UserService {
    return this.userService;
  }
}

class StubTodoService implements TodoService {
  public async findByIds(_user: User, _ids: number[]): Promise<Todo[]> {
    return TodoFactory.buildList(2);
  }

  public async create(_user: User, _vars: CreateTodoVars): Promise<Todo> {
    return TodoFactory.build();
  }

  public async update(_user: User, _id: number, _vars: UpdateTodoVars): Promise<Todo> {
    return TodoFactory.build();
  }

  public async findById(_user: User, _id: number): Promise<Todo | undefined> {
    return TodoFactory.build();
  }

  public async delete(_user: User, _id: number): Promise<boolean> {
    return true;
  }

  public async findAll(_user: User, _vars: FindAllVars): Promise<Todo[]> {
    return TodoFactory.buildList(2);
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
      firstName: faker.datatype.string(),
      lastName: faker.datatype.string(),
      userId: faker.datatype.number(),
    };
  }

  public async getAuthenticatedUserFromToken(_token: string): Promise<User> {
    return UserFactory.build();
  }
}

class StubUserService implements UserService {
  public verifyEmail(_verificationCode: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public recoverPassword(_email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public resetPassword(_vars: ResetPasswordVars): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public changePassword(_user: User, _vars: UpdatePasswordVars): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async login(_login: LoginVariables): Promise<UserReturnVarsWithToken> {
    const user = UserFactory.build();
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: faker.datatype.string(),
    };
  }

  public async create(_vars: CreateUserVariables): Promise<UserReturnVarsWithToken> {
    const user = UserFactory.build();
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: faker.datatype.string(),
    };
  }

  public async update(
    _user: User,
    _id: number,
    _vars: UpdateUserVariables,
  ): Promise<UserReturnVars> {
    const user = UserFactory.build();
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
}

export function StubProvider(): IProvider {
  return new TestProvider(new StubAuthService(), new StubTodoService(), new StubUserService());
}
