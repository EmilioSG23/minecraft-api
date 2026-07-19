/**
 * Reads a localStorage value while remaining safe during server rendering.
 *
 * @param key Storage key to read.
 * @param fallback Value returned when the key is not available.
 * @returns Persisted string value or the fallback.
 */
export function getStorageItem(key: string, fallback: string): string {
	if (typeof window === "undefined") return fallback;
	return window.localStorage.getItem(key) ?? fallback;
}

/**
 * Persists a string value in localStorage when running in the browser.
 *
 * @param key Storage key to write.
 * @param value Value to persist.
 */
export function setStorageItem(key: string, value: string): void {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, value);
}
