/**
 * Safely get a value from sessionStorage in Next.js
 * @param key The sessionStorage key
 * @returns The stored string or null
 */
export function getSessionStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

/**
 * Safely set a value in sessionStorage in Next.js
 * @param key The sessionStorage key
 * @param value The value to store
 */
export function setSessionStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, value);
  }
}

/**
 * Safely remove a key from sessionStorage in Next.js
 * @param key The sessionStorage key
 */
export function removeSessionStorage(key: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
}
