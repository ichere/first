/**
 * Constructs a new dictinary omitting `keys` of `obj`
 */
export function omit<T extends Record<string, unknown>, K extends [...(keyof T)[]]>(
  obj: T,
  keys: K,
): { [K2 in Exclude<keyof T, K[number]>]: T[K2] } {
  return Object.keys(obj)
    .filter((key) => !keys.includes(key))
    .reduce((newObj, key: string) => {
      // eslint-disable-next-line no-param-reassign
      newObj[key] = obj[key];
      return newObj;
    }, {} as Record<string, unknown>) as Exclude<T, K>;
}
