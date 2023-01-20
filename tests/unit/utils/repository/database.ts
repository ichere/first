import { run } from 'typeorm-test-transactions';

/* eslint-disable */
/**
 * Creates a test case that runs in a transaction environment
 * @param name name of test case
 * @param action test task
 * @param timeout timeout in milliseconds, overwrites global timeout
 */
export function transactionalIt(
  name: string,
  action: () => Promise<void> | void,
  timeout?: number,
): void {
  return it(name, run(action), timeout);
}
/* eslint-enable */
