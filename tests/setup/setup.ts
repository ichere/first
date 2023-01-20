// Make sure the order is not changed, dotenv needs to be before config!
import './dotenv';

import { DATABASE } from '../../src/datastore/config';
import {
  DB_CONTAINER_NAME,
  deleteDatabase,
  execShellCommand,
  KEEP_DATABASE,
  skipDatabaseLifecycle,
} from './helper';

export async function createDatabase(): Promise<string> {
  const shellOutput = await execShellCommand(
    `docker run --name ${DB_CONTAINER_NAME} \
    -e POSTGRES_USER=${DATABASE.username} \
    -e POSTGRES_PASSWORD=${DATABASE.password} \
    -e POSTGRES_DB=${DATABASE.name} \
    -d -p ${DATABASE.port}:5432 postgres:13`,
  );

  // for some reason the docker instance starts slower on gitpod instances
  if (process.env.GITPOD_WORKSPACE_ID)
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((f) => setTimeout(f, 10000));
  return shellOutput;
}

export async function isDatabaseRunning(): Promise<boolean> {
  const result = await execShellCommand('docker ps');
  return result.includes(DB_CONTAINER_NAME);
}

function migrate(): Promise<string> {
  return execShellCommand('npm run typeorm migration:run');
}
/**
 * Create a database and migrate it
 */
async function setupDatabase(): Promise<void> {
  if (skipDatabaseLifecycle()) {
    console.log('skip database setup');
    return;
  }
  // delete existing database if it exists
  console.log('\n\n##### SETUP #####\n');
  try {
    if (!KEEP_DATABASE) await deleteDatabase();

    // Create new Database
    if (!KEEP_DATABASE || !(await isDatabaseRunning())) {
      console.log('Creating test database');

      await createDatabase();
      console.log('Database successfully started');

      // Migrate
      console.log('Running Migrations');
      await migrate();
      console.log('Finished running Migrations');
    } else {
      console.log('Database is still running, skipping creation');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const message = e.message as string;
    if (message.toLowerCase().includes('no such container')) {
      throw new Error(
        `Test container ${DB_CONTAINER_NAME} not found. Ensure that Docker is running or disable database setup.`,
      );
    } else {
      throw e;
    }
  }
  console.log('\n##### SETUP FINISHED #####\n');
}

/**
 * Required for .env import
 */
async function setup(): Promise<void> {
  process.env.TZ = 'UTC';
  process.env.STAGE = 'test';
  process.env.SENTRY_AUTH_TOKEN = '';

  await setupDatabase();
}

export default setup;
