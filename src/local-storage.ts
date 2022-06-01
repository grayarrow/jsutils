import { hasData, isObject, safeJsonToString, safestr, safestrToJson } from "./skky"

export var LocalStorage = {
    /**
     * Clears all localStorage.
     */
    clear: function (): void {
        localStorage.clear();
    },
    /**
     * Gets an item from localStorage.
     * @param key The key of the localStorage item to retrieve.
     * @returns The value stored at key, an object if one is detected, otherwise null if the key cannot be found.
     */
     getItem(key: string): any {
        const val = localStorage.getItem(key);
        if (hasData(val)) {
            const sval = safestr(val as string);
            if (sval.startsWith('{') && sval.endsWith('}')) {
                return safestrToJson(sval);
            }
        }

        return val;
    },

    /**
     * Removes a key item from localStorage.
     * @param key The key of the localStorage item to remove.
     */
    removeItem: function (key: string): void {
        localStorage.removeItem(key);
    },

    /**
     * Sets a localStorage item at key with value.
     * @param key The key of the localStorage item to remove.
     * @param value The string or object to store into the sessonStorage key. objects are converted to strings.
     */
    setItem(key: string, value: string | object): void {
        const saveval = isObject(value) ? safeJsonToString(value as object) : value;

        localStorage.setItem(key, saveval as string);
    },
}
