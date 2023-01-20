import { EntityNotFoundError, IllegalArgumentError, PermissionDenied } from '@/utils/errors';

export function expectPermissionDeniedError(action: Promise<unknown>): Promise<void> {
  return expect(action).rejects.toBeInstanceOf(PermissionDenied);
}

export function expectEntityNotFoundError(action: Promise<unknown>): Promise<void> {
  return expect(action).rejects.toBeInstanceOf(EntityNotFoundError);
}

export async function expectIllegalArgumentError(
  action: Promise<unknown> | (() => Promise<unknown> | unknown),
  code?: string,
): Promise<void> {
  return expectAnyError(action, IllegalArgumentError, code);
}

export async function expectAnyError(
  action: Promise<unknown> | (() => Promise<unknown> | unknown),
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  errorClass: any,
  code?: string,
): Promise<void> {
  try {
    if (action instanceof Function) await action();
    else await action;
    throw new Error('Action should have thrown an error.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (!(e instanceof errorClass)) {
      console.error(e);
    }
    expect(e).toBeInstanceOf(errorClass);

    if (code) expect(e.code).toEqual(code);
  }
}
