import { getCustomRepository } from 'typeorm';

import { SQLUserRepository } from '@/datastore/repositories';
import { AuthenticationService, UserService } from '@/interfaces/service';
import { AuthenticationServiceImpl } from '@/service';
import { AuthorizingUserService } from '@/service/user';

export interface IProvider {
  getAuthenticationService(): AuthenticationService;
  getUserService(): UserService;
}

class DefaultProvider implements IProvider {
  public getAuthenticationService(): AuthenticationService {
    return new AuthenticationServiceImpl();
  }

  public getUserService(): UserService {
    return new AuthorizingUserService(getCustomRepository(SQLUserRepository), getAuthService());
  }
}

let provider: IProvider = new DefaultProvider();

export function getAuthService(): AuthenticationService {
  return provider.getAuthenticationService();
}

export function getUserService(): UserService {
  return provider.getUserService();
}

export function setProvider(newProvider: IProvider): void {
  provider = newProvider;
}

export function getProvider(): IProvider {
  return provider;
}
