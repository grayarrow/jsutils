import { hasData, isObject, safeJsonToString, safestr, safestrToJson } from "./skky"

export var SessionStorage = {
    /**
     * Clears all sessionStorage.
     */
    clear: function (): void {
        sessionStorage.clear();
    },
    /**
     * Gets an item from sessionStorage.
     * @param key The key of the sessionStorage item to retrieve.
     * @returns The value stored at key, an object if one is detected, otherwise null if the key cannot be found.
     */
    getItem(key: string): any {
        const val = sessionStorage.getItem(key);
        if (hasData(val)) {
            const sval = safestr(val as string);
            if (sval.startsWith('{') && sval.endsWith('}')) {
                return safestrToJson(sval);
            }
        }

        return val;
    },

    /**
     * Removes a key item from sessionStorage.
     * @param key The key of the sessionStorage item to remove.
     */
    removeItem: function (key: string): void {
        sessionStorage.removeItem(key);
    },

    /**
     * Sets a sessionStorage item at key with value.
     * @param key The key of the sessionStorage item to remove.
     * @param value The string or object to store into the sessonStorage key.
     */
    setItem(key: string, value: string | object): void {
        const saveval = isObject(value) ? safeJsonToString(value as object) : value;

        sessionStorage.setItem(key, saveval as string);
    },
}
