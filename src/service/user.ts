import { User } from '@/datastore/entities';
import { UserRepository } from '@/interfaces/repository';
import { AuthenticationService } from '@/interfaces/service';
import {
  CreateUserVariables,
  LoginVariables,
  UserReturnVars,
  UserReturnVarsWithToken,
  UserService,
} from '@/interfaces/service/user';
import { AuthenticationError, IllegalArgumentError } from '@/utils/errors';

export class AuthorizingUserService implements UserService {
  public constructor(
    private userRepository: UserRepository,
    private authenticationService: AuthenticationService,
  ) {}

  public async create(vars: CreateUserVariables): Promise<UserReturnVarsWithToken> {
    const email = vars.email.toLowerCase();
    const foundUser = await this.userRepository.findBy({ email });
    if (foundUser) throw new IllegalArgumentError(`${email} already exists`);

    const encryptedPassword = await this.authenticationService.encrypt(vars.password);
    const createdUser = await this.userRepository.create({
      ...vars,
      password: encryptedPassword,
      email,
    });

    return this.getUserVarsWithToken(createdUser);
  }

  public async login(loginVars: LoginVariables): Promise<UserReturnVarsWithToken> {
    const foundUser = await this.userRepository.findBy({ email: loginVars.email });
    if (!foundUser) throw new AuthenticationError('Invalid login credentials');

    const isAunthenticated = await this.authenticationService.verify(
      foundUser.password,
      loginVars.password,
    );
    if (!isAunthenticated) throw new AuthenticationError('Invalid login credentials');

    return this.getUserVarsWithToken(foundUser);
  }

  private buildUserVars(vars: User): UserReturnVars {
    return {
      id: vars.id,
      userName: vars.userName,
      email: vars.email,
    };
  }

  private async getUserVarsWithToken(user: User): Promise<UserReturnVarsWithToken> {
    const token = await this.authenticationService.signToken({
      userName: user.userName,
      userId: user.id,
    });

    return {
      ...this.buildUserVars(user),
      token,
    };
  }
}
