import { AbstractRepository, EntityRepository } from 'typeorm';

import { CreateUserVariables, UserRepository } from '@/interfaces/repository/user';

import { User } from '../entities/User';

@EntityRepository(User)
export class SQLUserRepository extends AbstractRepository<User> implements UserRepository {
  public async create(vars: CreateUserVariables): Promise<User> {
    const user = await this.repository.save(vars);
    return user;
  }

  public async findBy(vars: Partial<User>): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: vars });
    return user;
  }
}
