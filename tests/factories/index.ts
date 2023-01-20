import { faker } from '@faker-js/faker';
import fs from 'fs';
import { Factory } from 'typeorm-factory';

import { Photo } from '@/datastore/entities/Photo';
import { Todo } from '@/datastore/entities/Todo';
import { User, UserStatus } from '@/datastore/entities/User';
import { Upload } from '@/interfaces/service/upload';

export function getUploadMock(
  filename?: string,
  path = '',
  mimetype: string | undefined = undefined,
): Upload {
  return {
    filename: filename ?? faker.name.firstName(),
    mimetype: mimetype ?? 'image/png',
    data: path ? fs.readFileSync(path) : Buffer.from(path),
  };
}

export const PhotoFactory = new Factory(Photo)
  .sequence('id', () => faker.datatype.uuid())
  .sequence('content', () => faker.image.image())
  .sequence('contentLowRes', () => faker.image.image())
  .sequence('contentThumbnail', () => faker.image.image());

export const UserFactory = new Factory(User)
  .sequence('id', (i) => i)
  .sequence('firstName', () => faker.name.firstName())
  .sequence('lastName', () => faker.name.lastName())
  .sequence('email', () => faker.internet.email())
  .sequence('phoneNumber', () => faker.phone.number().slice(0, 10))
  .sequence('password', () => faker.datatype.string())
  .sequence('status', () => UserStatus.UNVERIFIED)
  // @ts-ignore
  .assocOne('profilePicture', PhotoFactory);

export const TodoFactory = new Factory(Todo)
  .sequence('id', (i) => i)
  .sequence('title', () => faker.datatype.string())
  .sequence('description', () => faker.datatype.string())
  .sequence('userId', () => faker.datatype.number())
  .assocOne('user', UserFactory);
