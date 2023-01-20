import { deleteDatabase, KEEP_DATABASE, skipDatabaseLifecycle } from './helper';

/**
 * Remove the database
 */
async function teardown(): Promise<void> {
  if (skipDatabaseLifecycle()) {
    console.log('skip database teardown');
    return;
  }

  console.log('\n##### TEARDOWN #####\n');
  if (KEEP_DATABASE) {
    console.log('Skipping database removal. The database container will continue running');
  } else {
    console.log('Removing database');
    await Promise.all([deleteDatabase(true)]);
    console.log('Database successfully removed');
  }
  console.log('\n##### TEARDOWN FINISHED #####\n');
}

export default teardown;
