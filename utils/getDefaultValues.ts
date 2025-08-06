// utils/formUtils.ts

export function getDefaultValues<T extends Record<string, any>>(
  item: Partial<T> | undefined,
  fallback?: (key: keyof T) => T[keyof T]
): T {
  const result = {} as T;

  for (const key in item ?? {}) {
    const typedKey = key as keyof T;
    const value = item?.[typedKey];

    if (value !== undefined && value !== null) {
      result[typedKey] = value;
    } else if (fallback) {
      result[typedKey] = fallback(typedKey);
    } else {
      result[typedKey] = "" as T[keyof T];
    }
  }

  return result;
}
