import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserRepository } from '@/interfaces/repository';
import { SignTokenOptions, SignTokenVars } from '@/interfaces/service/auth';

import { AuthenticationService } from '../interfaces/service';
import { TOKEN_KEY } from '../utils/config';

export class AuthenticationServiceImpl implements AuthenticationService {
  public constructor(private userRepository: UserRepository) {}

  public async encrypt(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  public async verify(encryptedPassword: string, suppliedPassword: string): Promise<boolean> {
    return compare(suppliedPassword, encryptedPassword);
  }

  public async signToken(vars: SignTokenVars, options?: SignTokenOptions): Promise<string> {
    const token = jwt.sign(vars, TOKEN_KEY, options);
    return token;
  }

  public async decodeToken(token: string): Promise<SignTokenVars> {
    const decodeToken = jwt.verify(token, TOKEN_KEY);
    if (typeof decodeToken === 'string') {
      throw Error();
    }
    return decodeToken as SignTokenVars;
  }

}
