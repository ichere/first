import { faker } from '@faker-js/faker';
import { Factory } from 'typeorm-factory';

import { User } from '@/datastore/entities/User';

export const UserFactory = new Factory(User)
  .sequence('id', (i) => i)
  .sequence('userName', () => faker.name.firstName())
  .sequence('email', () => faker.internet.email())
  .sequence('password', () => faker.datatype.string());
