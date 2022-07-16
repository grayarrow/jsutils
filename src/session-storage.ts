import { isArray, isObject, safeJsonToString, safestrToJson, safestrTrim } from "./skky"

export var SessionStorage = {
  /**
   * Clears all sessionStorage.
   */
  clear: function (): void {
    sessionStorage.clear()
  },
  /**
   * Gets an item from sessionStorage.
   * @param key The key of the sessionStorage item to retrieve.
   * @returns The value stored at key, an object if one is detected, otherwise null if the key cannot be found.
   */
  getItem<T extends object>(key: string): T | undefined {
    const val = sessionStorage.getItem(key)
    if (val) {
      const sval = safestrTrim(val)
      if ((sval.startsWith('{') && sval.endsWith('}'))
        || (sval.startsWith('[') && sval.endsWith(']'))) {
        return safestrToJson(sval)
      }
    }

    // return val
  },

  /**
   * Removes a key item from sessionStorage.
   * @param key The key of the sessionStorage item to remove.
   */
  removeItem: function (key: string) {
    sessionStorage.removeItem(key)
  },

  /**
   * Sets a sessionStorage item at key with value.
   * @param key The key of the sessionStorage item to remove.
   * @param value The string or object to store into the sessonStorage key.
   */
  setItem<T>(key: string, value: T) {
    const saveval = (isObject(value) || isArray(value)) ? safeJsonToString(value as any) : String(value)

    sessionStorage.setItem(key, saveval)
  },
}
