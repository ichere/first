import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ORMCONFIG } from './config';
import entities from './entities';

// Help from: https://github.com/nrwl/nx/issues/803
export class DatabaseClient {
  private connectionOptions: PostgresConnectionOptions;

  // eslint-disable-next-line @typescript-eslint/ban-types
  public constructor(migrations?: Function[], options: PostgresConnectionOptions = ORMCONFIG) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.connectionOptions = {
      entities,
      migrations,
      ...options,
    };
  }

  public async getConnection(name = 'default'): Promise<Connection> {
    // If this is not performant enough check this https://github.com/nrwl/nx/issues/803
    // A solution without having to delete the connection is mentioned there.
    if (getConnectionManager().has(name)) {
      return getConnectionManager().get(name);
    }

    return createConnection({ ...this.connectionOptions, name });
  }
}
