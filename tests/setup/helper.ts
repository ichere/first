import { exec } from 'child_process';
import { getConnection } from 'typeorm';

const IS_TEST = process.env.NODE_ENV === 'test';

export const DB_CONTAINER_NAME = IS_TEST
  ? process.env.DB_TEST_CONTAINER_NAME!
  : process.env.DB_CONTAINER_NAME!;
export const KEEP_DATABASE = process.env.KEEP_DATABASE === 'true';

export function skipDatabaseLifecycle(): boolean {
  return process.env.SKIP_DB === 'true';
}

export async function deleteDatabase(failIfMissing = false): Promise<string> {
  try {
    return await execShellCommand(`docker rm -v ${DB_CONTAINER_NAME} -f || true`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const message = e.message as string;
    if (message.toLowerCase().includes('no such container')) {
      if (failIfMissing) {
        throw e;
      }
      return '';
    }
    throw e;
  }
}

export function execShellCommand(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout || stderr);
    });
  });
}

export async function clearPostgresTables(): Promise<void> {
  const entities = getConnection().entityMetadatas;

  /* eslint-disable */
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.query(`truncate table ${entity.tableName} cascade;`);
  }
  /* eslint-enable */
}
