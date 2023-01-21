import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SignTokenOptions, SignTokenVars } from '@/interfaces/service/auth';

import { AuthenticationService } from '../interfaces/service';

const TOKEN_KEY = process.env.TOKEN_KEY ?? '5546dgbdhjjs8u86s73';

export class AuthenticationServiceImpl implements AuthenticationService {
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
}
