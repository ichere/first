import { transactionalIt } from './database';

type BeforeEach = () => Promise<void> | void;
type Test = () => Promise<void> | void;

export function createRepoTestMethods(): {
  it: (name: string, test: Test, timeout?: number) => void;
  beforeEach: (beforeEachFn: BeforeEach) => void;
} {
  let setup = (): Promise<void> => Promise.resolve();

  const newBeforeEach = (beforeEachFn: BeforeEach): void => {
    // eslint-disable-next-line jest/require-top-level-describe
    beforeEach(() => {
      const oldSetup = setup;
      setup = async (): Promise<void> => {
        await oldSetup();
        await beforeEachFn();
      };
    });
  };

  const newIt = (name: string, testCase: Test, timeout?: number): void => {
    transactionalIt(
      name,
      async () => {
        await setup();
        setup = (): Promise<void> => Promise.resolve();
        await testCase();
      },
      timeout,
    );
  };

  return { it: newIt, beforeEach: newBeforeEach };
}
