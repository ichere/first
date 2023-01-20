import { User } from '@/datastore/entities/User';

export type CreateUserVariables = {
  userName: string;
  email: string;
  password: string;
};

export interface UserRepository {
  create(vars: CreateUserVariables): Promise<User>;
  findBy(vars: Partial<User>): Promise<User | undefined>;
}
