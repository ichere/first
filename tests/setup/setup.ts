// Make sure the order is not changed, dotenv needs to be before config!
import './dotenv';

import { DATABASE } from '../../src/datastore/config';
import { DB_CONTAINER_NAME, execShellCommand } from './helper';

export async function createDatabase(): Promise<string> {
  const shellOutput = await execShellCommand(
    `docker run --name ${DB_CONTAINER_NAME} \
    -e POSTGRES_USER=${DATABASE.username} \
    -e POSTGRES_PASSWORD=${DATABASE.password} \
    -e POSTGRES_DB=${DATABASE.name} \
    -d -p ${DATABASE.port}:5432 postgres:13`,
  );

  return shellOutput;
}
