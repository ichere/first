import { exec } from 'child_process';

const IS_TEST = process.env.NODE_ENV === 'test';

export const DB_CONTAINER_NAME = IS_TEST
  ? process.env.DB_TEST_CONTAINER_NAME!
  : process.env.DB_CONTAINER_NAME!;

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
