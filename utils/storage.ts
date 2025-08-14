/**
 * Safely get a value from localStorage in Next.js
 * @param key The localStorage key
 * @returns The stored string or null
 */
export function getLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

/**
 * Safely set a value in localStorage in Next.js
 * @param key The localStorage key
 * @param value The value to store
 */
export function setLocalStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

/**
 * Safely remove a key from localStorage in Next.js
 * @param key The localStorage key
 */
export function removeLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
