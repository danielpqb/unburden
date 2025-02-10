export function deepMergeObjects<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  const result = { ...target } as T & U;

  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMergeObjects((target as any)[key], source[key]) as any;
    } else {
      result[key] = source[key] as any;
    }
  }

  return result as T & U;
}
