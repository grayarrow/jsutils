import { isObject, safeJsonToString, safestrToJson, safestrTrim } from "./skky"

export var LocalStorage = {
  /**
   * Clears all localStorage.
   */
  clear: function (): void {
    localStorage.clear()
  },
  /**
   * Gets an item from localStorage.
   * @param key The key of the localStorage item to retrieve.
   * @returns The value stored at key, an object if one is detected, otherwise null if the key cannot be found.
   */
  getItem<T extends object>(key: string): T | undefined {
    const val = localStorage.getItem(key)
    if (val) {
      const sval = safestrTrim(val)
      if ((sval.startsWith('{') && sval.endsWith('}'))
        || (sval.startsWith('[') && sval.endsWith(']'))) {
        return safestrToJson(sval)
      }
    }

    // return val;
  },

  /**
   * Removes a key item from localStorage.
   * @param key The key of the localStorage item to remove.
   */
  removeItem: function (key: string) {
    localStorage.removeItem(key)
  },

  /**
   * Sets a localStorage item at key with value.
   * @param key The key of the localStorage item to remove.
   * @param value The string or object to store into the sessonStorage key. objects are converted to strings.
   */
  setItem<T>(key: string, value: T) {
    const saveval = isObject(value) ? safeJsonToString(value as any) : String(value)

    localStorage.setItem(key, saveval)
  },
}
