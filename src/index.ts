import 'reflect-metadata';

import { patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';

import app from '@/api/app';

import { DatabaseClient } from './datastore';
import { ESTABLISH_DB_CONNECTION } from './datastore/config';
import { InternalServerError } from './utils/errors';

patchTypeORMRepositoryWithBaseRepository();

const port = process.env.PORT || 3000;
const client = new DatabaseClient();
const start = async () => {
  if (ESTABLISH_DB_CONNECTION) {
    try {
      await client.getConnection();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new InternalServerError('Unable to connect to database.');
    }
  }
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}. Open the app on http://localhost:${port}`);
  });
};

start();
