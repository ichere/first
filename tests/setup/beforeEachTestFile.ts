import { getRepository } from 'typeorm';
import { initialiseTestTransactions } from 'typeorm-test-transactions';

import { DatabaseClient } from '@/datastore';
import { ORMCONFIG } from '@/datastore/config';
import entities from '@/datastore/entities';

import { GlobalObject } from './types';

initialiseTestTransactions();

if (process.env.CI === 'true') {
  // fix flaky tests
  jest.retryTimes(5);
}

if (ORMCONFIG.host !== 'localhost') {
  /**
   * Prevents tests running against remote databases after manually running a script.
   */
  console.log(
    `Database host should be set to localhost. Disable this check if you are sure that your setup is correct.`,
  );
  process.exit(-1);
}

// eslint-disable-next-line jest/require-top-level-describe
beforeAll(async () => {
  (global as unknown as GlobalObject).dbClient = await new DatabaseClient().getConnection();
});

const ensureNoPersistentChanges = async () => {
  const ensure = (process.env.VALIDATE_EMPTY ?? 'true') === 'true';
  if (!ensure) return;

  const repos = entities.map((entity) => getRepository(entity));
  const tableResults = await Promise.all(
    repos.map(async (repo) => {
      const count = await repo.count();
      const tableName = repo.metadata.name;

      return { table: tableName, count };
    }),
  );

  const faultyTables = tableResults.filter((result) => result.count > 0);
  if (faultyTables.length > 0) {
    const error = `The following tables contain entities:\n${JSON.stringify(
      faultyTables,
    )}. Make sure to run tests that access the database in transactions.`;
    // eslint-disable-next-line jest/no-jasmine-globals
    fail(error);
  }
};

// eslint-disable-next-line jest/require-top-level-describe
afterAll(async () => {
  await ensureNoPersistentChanges();
  await (global as unknown as GlobalObject).dbClient?.close();
});
