import { ORMCONFIG } from './src/datastore/config';

module.exports = {
  ...ORMCONFIG,
  entities: ['src/datastore/entities/**.ts'],
  /**
   * The `1` is there to exclude the index.ts,
   * otherwise we run into duplicate migration errors.
   *
   * Timestamps starting with with `2` start somewhere in the 2030s
   */
  migrations: ['src/datastore/migrations/1*.ts'],
  cli: {
    migrationsDir: 'src/datastore/migrations',
  },
};
