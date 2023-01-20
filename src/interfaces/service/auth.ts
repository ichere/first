
export type SignTokenVars = {
  userName: string;
  userId: number;
};

export type SignTokenOptions = {
  expiresIn?: string | number | undefined;
};

export interface AuthenticationService {
  encrypt(password: string): Promise<string>;
  verify(encryptedPassword: string, suppliedPassword: string): Promise<boolean>;
  signToken(vars: SignTokenVars, options?: SignTokenOptions): Promise<string>;
  decodeToken(token: string): Promise<SignTokenVars>;
}
