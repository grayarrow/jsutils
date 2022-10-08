import { hasData, isObject, safeJsonToString, safestrToJson, safestrTrim } from "./skky"

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
    const val = safestrTrim(this.getString(key))
    if (hasData(val)) {
      if ((val.startsWith('{') && val.endsWith('}'))
        || (val.startsWith('[') && val.endsWith(']'))) {
        return safestrToJson(val)
      }
    }
  },

  getString(key: string) {
    return localStorage.getItem(key)
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
