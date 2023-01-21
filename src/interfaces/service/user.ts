import { CreateUserVariables as RepoCreateVariables } from '../repository/user';

export type UserReturnVars = {
  id: number;
  userName: string;
  email: string;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type UserReturnVarsWithToken = UserReturnVars & {
  token: string;
};

export type CreateUserVariables = RepoCreateVariables;

export interface UserService {
  create(vars: CreateUserVariables): Promise<UserReturnVarsWithToken>;
  login(login: LoginVariables): Promise<UserReturnVarsWithToken>;
}
