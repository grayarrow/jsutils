type StringOrArray = string | string[];

/**
 * Gets the first item from an array, or a default value if the array is empty. Null is returned if no default value provided.
 * Good for quick tests of objects to see if it is an array, and getting the first value.
 * @param obj The array to get the first value from, if it is an array.
 * @param defaultIfNone An optional default value if the array is empty.
 * @returns The first item in the array, or null or defaultIfNone if the array has no values.
 */
export function arrFirst(obj: any, defaultIfNone: any = null): any {
  if (isArray(obj, 1)) {
    return obj[0];
  }

  return defaultIfNone;
}

/**
 * Compares two objects and returns a value for used in the JavaScript sort() method.
 * @param a The first object to compare with.
 * @param b The second object to compare with.
 * @param isAsc True if you want to sort ascending.
 * @returns -1, 0 or 1 depending on the sort direction.
 */
export function compareSortOrder(
  a: any,
  b: any,
  isAsc: string | boolean = true
): Number {
  if (isNullOrUndefined(isAsc)) {
    isAsc = true;
  } else if (isString(isAsc as any)) {
    isAsc = "desc" !== safestrLowercase(isAsc as string);
  }
  // equal items sort equally
  if (a === b) {
    return 0;
  }
  // nulls sort after anything else
  else if (a === null) {
    return 1;
  } else if (b === null) {
    return -1;
  }
  // otherwise, if we're ascending, lowest sorts first
  else if (isAsc) {
    return a < b ? -1 : 1;
  }
  // if descending, highest sorts first
  else {
    return a < b ? 1 : -1;
  }

  // return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}

/**
 * Compares two strings and returns a value for used in the JavaScript sort() method.
 * @param a The first string to compare with.
 * @param b The second string to compare with.
 * @param isAsc True if you want to sort ascending.
 * @param compareLowercase True if you want to do a lowercase compare.
 * @returns -1, 0 or 1 depending on the sort direction.
 */
 export function compareStrings(a: string, b: string, isAsc: string | boolean = true, compareLowercase = true) {
  const atest = compareLowercase ? safestrLowercase(a) : safestr(a);
  const btest = compareLowercase ? safestrLowercase(b) : safestr(b);

  return compareSortOrder(atest, btest, isAsc);
}

/**
 * Looks for a ret.body object to return.
 * Throws an Error if the body is not found or not an object.
 * @param {any} ret The object to get the ret.body object.
 * @returns {object} The existing ret.body object of the ret object..
 */
export function getBody(ret: any): object {
  if (!isObject(ret) || !isObject(ret.body)) {
    throw new Error("Object body not found");
  }

  return ret.body;
}

/**
 * Gets a comma separated list of unique items.
 * @param {StringOrArray} stringOrArray The string or array to flatten.
 * @returns {string} The flattened, comma-separated string.
 */
export function getCommaSeparatedList(
  stringOrArray: StringOrArray
): string {
  if (!isArray(stringOrArray)) {
    return stringOrArray as string;
  }

  const myset: any = new Set(stringOrArray);
  return [...myset].join(",");
}

/**
 * Gets a comma separated list of unique items in uppercase.
 * @param stringOrArray The string or array to flatten.
 * @returns The flattened, comma-separated string in uppercase.
 */
export function getCommaUpperList(stringOrArray: StringOrArray): string {
  return safestrUppercase(getCommaSeparatedList(stringOrArray));
}

/**
 * DELETEs data to an API using an HTTP DELETE.
 * @param url The URL endpoint of the API call.
 * @returns The returned Response object in a Promise.
 */
 export function fetchHttpDelete(url: string): Promise<Response> {
  return fetch(url, {
    method: "delete",
  });
}

/**
 * Fetches data from an API using an HTTP GET.
 * Returns the JSON data from the API call.
 * @param url The URL endpoint of the API call.
 * @returns The returned JSON object.
 */
export async function fetchHttpGet(url: string): Promise<object> {
  const ret = await fetch(url);

  return await ret.json();
}

/**
 * Fetches data from an API using an HTTP POST.
 * Returns the JSON data from the API call.
 * @param url The URL endpoint of the API call.
 * @param data The object of the data to pass to the API.
 * @returns The returned JSON object.
 */
export async function fetchHttpPost(url: string, data: object): Promise<object> {
  const ret = await fetch(url, {
    method: "POST",
    headers: {
      // 'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await ret.json();
}

/**
 * PUTs data to an API using an HTTP POST.
 * @param url The URL endpoint of the API call.
 * @param data The object of the data to pass to the API.
 * @returns The returned Response object in a Promise.
 */
 export function fetchHttpPut(url: string, data: object): Promise<Response> {
  return fetch(url, {
    method: "put",
    headers: {
      // 'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Returns a new global unique identifier (GUID).
 * @returns A global unique identifier as a 16 character string.
 */
export function newGuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Gets a formatted number based on a specified number of decimal places.
 * @param num A number or string representing a number.
 * @param maxDecimalPlaces The maximum number of decimal places to show.
 * @param minDecimalPlaces The minimum number of required decimal places to show.
 * @returns A number with the given decimal places.
 */
export function getNumberFormatted(
  num: any,
  maxDecimalPlaces: number,
  minDecimalPlaces: number
): number {
  if (isString(num, 1) && !isNaN(num)) {
    num = +num;
  }

  if (!isNullOrUndefined(num) && isNumber(num)) {
    return parseFloat(getNumberString(num, maxDecimalPlaces, minDecimalPlaces));
  }

  return num;
}

/**
 * Gets a formatted number based on a specified number of decimal places.
 * @param num A number or string representing a number.
 * @param maxDecimalPlaces The maximum number of decimal places to show.
 * @param minDecimalPlaces The minimum number of required decimal places to show.
 * @returns A string of the passed in num with the given decimal places.
 */
 export function getNumberString(
  num: any,
  maxDecimalPlaces: number,
  minDecimalPlaces: number
): string {
  if (isString(num, 1) && !isNaN(num)) {
    num = +num;
  }

  maxDecimalPlaces = maxDecimalPlaces || 0;
  minDecimalPlaces = minDecimalPlaces || maxDecimalPlaces;

  return new Intl.NumberFormat("en", {
    maximumFractionDigits: maxDecimalPlaces,
    minimumFractionDigits: maxDecimalPlaces,
  }).format(num);
}

/**
 * Gets an object from an array at the given index.
 * Protects from empty objects and indexes that are out of bounds.
 * @param arr An object array to get the index item of.
 * @param index The index of the object array to return
 * @returns The given object at arr[index], or null if it does not exist.
 */
export function getObject(arr: any[], index = 0) {
  if (!isNullOrUndefined(arr)) {
    index = index || 0;

    if (isArray(arr)) {
      if (arr.length > index) {
        return arr[index];
      }
    } else if (index === 0) {
      return arr;
    }
  }

  return null;
}

/**
 * Gets the percentage change from two numbers.
 * Can be negative if there is a drop from the previous to the current number.
 * @param prev The previous number.
 * @param cur The new current number. 
 * @returns The percentage number from -100 to 100.
 */
export function getPercentChange(prev: number, cur: number): number {
  let percent = 0;
  if (cur) {
    if (prev) {
      percent = ((cur - prev) * 100) / prev;
    } else {
      percent = cur * 100;
    }
  } else if (prev) {
    percent = -(prev * 100);
  }

  return percent;
}

/**
 * Gets the percentage change from two numbers as a string with the % sign appended if desired.
 * Can be negative if there is a drop from the previous to the current number.
 * @param prev The previous number.
 * @param cur The new current number.
 * @param showPercent Set to true if you want the % sign appended.
 * @param decimalPlaces The number of decimal places to show. Defaults to 2.
 * @returns The percentage number from -100 to 100.
 */
 export function getPercentChangeString(
  prev: number,
  cur: number,
  showPercent = true,
  decimalPlaces = 2
): string {
  const percent = getPercentChange(prev, cur);

  // return Math.floor(percent)
  let ret = percent.toFixed(decimalPlaces ? decimalPlaces : 2);
  if (showPercent) {
    ret += "%";
  }

  return (percent > 0 ? "+" : "") + ret;
}

/**
 * Checks any object, string or array if it has any data.
 * The minlength is for requiring more items to be in the object, string or array.
 * You can pass in a function that must return an object, string or array to be tested as well.
 * @param o Any object, string or array. If it is a function, the function will be called to get the object, string or array before testing.
 * @param minlength The required minimum length to consider to have data.
 * @returns True if the object meets the minimum length requirements.
 */
export function hasData(o: any, minlength = 1): boolean {
  // console.log('minlength: ' + minlength + ', o: ' + o)
  try {
    if (!o) {
      return false;
    }

    if (!minlength) {
      minlength = 1;
    }

    if (isFunction(o)) {
      return hasData(o(), minlength);
    }

    if (isString(o)) {
      return o.length >= minlength;
    }

    if (isArray(o)) {
      return o.length >= minlength;
    }

    // Primitives cannot have more than 1 by definition of not being an array or object.
    if (!isObject(o)) {
      return o >= minlength;
    }

    return isArray(Object.keys(o), minlength);
  } catch (ex) {
    console.log("hasData", ex);
  }

  return false;
}

/**
 * Checks an object if it is an array. If so, then tests if there is an optional minimum number of items.
 * If minLengthOrIncludes is not a number, checks that the array includes the item.
 * @param arr Any object to test if it is an array.
 * @param minLengthOrIncludes If a number, specifies the minimum number of items to be in the array. If not a number, the array must include the item.
 * @returns True if arr is an array and meets any minimum requirements.
 */
export function isArray(
  arr: any,
  minLengthOrIncludes: any = null
): boolean {
  if (!arr || !Array.isArray(arr)) {
    return false;
  }

  if (isNullOrUndefined(minLengthOrIncludes)) {
    return true;
  }

  if (isNumber(minLengthOrIncludes)) {
    return arr.length >= (minLengthOrIncludes as number);
  }

  return arr.includes(minLengthOrIncludes);
}

/**
 * Tests an object to determine if it is a type boolean.
 * @param obj Any object to test if it is a boolean value.
 * @returns True if the object is a boolean.
 */
export function isBoolean(obj: any): boolean {
  return "boolean" === typeof obj;
}

export function isEmptyObject(obj: any): boolean {
  return (
    null == obj ||
    (isObject(obj) &&
      (Object.keys(obj) || []).length === 0 &&
      obj.constructor === Object)
  );
}
/**
 * Tests an object to determine if it is a function.
 * @param obj Any object to test if it is a function.
 * @returns True if the object is a function.
 */
 export function isFunction(obj: any): boolean {
  return "function" === typeof obj;
}

/**
 * Tests an object to determine if it is a number.
 * Additionally, will test if the number is greater than or equal to a minimum value and/or less than or equal to a maximum value.
 * @param obj Any object to test if it is a number.
 * @param minValue The minimum value the number must be.
 * @param maxValue The maximum value the number can be.
 * @returns True if the object is a number and if provided, >= to the minValue and/or <= to the maxValue.
 */
export function isNumber(
  obj: any,
  minValue: number | null = null,
  maxValue: number | null = null
): boolean {
  if (isNullOrUndefined(obj) || "number" !== typeof obj) {
    return false;
  }

  if (minValue && obj < minValue) {
    return false;
  }
  if (maxValue && obj > maxValue) {
    return false;
  }

  return true;
}

/**
 * Tests if a variable is null or undefined.
 * @param obj Any variable to test if it is null or undefined.
 * @returns True if the object passed in is null or undefined.
 */
export function isNullOrUndefined(obj: any): boolean {
  return "undefined" === typeof obj || null == obj;
}

/**
 * Checks if the variable passed in is a JavaScript object that is not an array.
 * Optionally can test for a minimum number of member objects, or if a member of the object is a named by the minLengthOrContainsField parameter.
 * @param obj The object to test if it is indeed a JavaScript object.
 * @param minLengthOrContainsField The minimum number of items that must be in the object. Or if a string, the object must contain a member named the string provided.
 * @returns True if the obj variable is a JavaScript object, and meets an optional minimum length or contains a member with the given name.
 */
export function isObject(
  obj: any,
  minLengthOrContainsField: number | string = 0
): boolean {
  const isok = obj && "object" === typeof obj && !isArray(obj);
  if (!isok) {
    return false;
  }

  if (isNumber(minLengthOrContainsField)) {
    if (minLengthOrContainsField <= 0) {
      return true;
    }

    return (Object.keys(obj) || []).length >= minLengthOrContainsField;
  }

  if (isString(minLengthOrContainsField as string)) {
    return (Object.keys(obj) || []).includes(
      minLengthOrContainsField as string
    );
  }

  return true;
}


/**
 * Tests an object to determine if it is a string.
 * Additionally, will test if the string if it has a minimum length.
 * @param obj Any object to test if it is a string.
 * @param minlength The minimum length the string must be.
 * @returns True if the object is a string and meets an optional minimum length if provided.
 */
 export function isString(obj: any, minlength = 0): boolean {
  return (
    ("string" === typeof obj || (obj && obj instanceof String)) &&
    obj.length >= minlength
  );
}

/**
 * Tests an object to see if it is empty. If so returns null, otherwise just returns the object.
 * @param obj The object to test if it is empty.
 * @returns Null if the object is empty, otherwise the object is returned.
 */
export function getNullObject(obj: any): any {
  return isEmptyObject(obj) ? null : obj;
}

/**
 * Tests if a string has data (is not undefined, null or empty string).
 * If the string is empty, the ifNull value is returned.
 * @param s A string to check for data.
 * @param ifNull If the string is null, return this value. Defaults to "".
 * @returns A guaranteed string to be nonnull. Returns ifNull if the string does not have data.
 */
export function safestr(s: string, ifNull = ""): string {
  if (hasData(s)) {
    return s;
  }

  return hasData(ifNull) ? ifNull : "";
}

/**
 * Returns a guaranteed valid string to be lowercase.
 * @param s A string to set to lowercase. If null or undefined, empty string is returned.
 * @returns A guaranteed string to be nonnull and lowercase.
 */
 export function safestrLowercase(s: string): string {
  return safestr(s).toLowerCase();
}
/**
 * Returns a guaranteed valid string to be uppercase.
 * @param s A string to set to uppercase. If null or undefined, empty string is returned.
 * @returns A guaranteed string to be nonnull and uppercase.
 */
 export function safestrUppercase(s: string): string {
  return safestr(s).toUpperCase();
}

/**
 * Returns an s if the number passed in should be pluralized.
 * @param isPlural A number that is used to determine if the plural suffix is added.
 * @param suffix The suffix to add if the number should be pluralized.
 * @returns The suffix string if the number is not 1.
 */
export function pluralSuffix(isPlural: number, suffix = "s"): string {
  if (isNumber(isPlural) && 1 === isPlural) {
    isPlural = 0;
  }

  if (isPlural) {
    return safestr(suffix);
  }

  return "";
}

/**
 * Returns the prefix if the given string s has a value (not empty).
 * Generally used in loops so that the prefix is not prepended on the first pass.
 * @param s A string to prefix with a value if the string has data.
 * @param prefix The prefix if the string is not empty.
 * @returns The prefix if the string is not empty.
 */
export function prefixIfHasData(s: string, prefix = ", "): string {
  return hasData(s) ? safestr(prefix) : "";
}

/**
 * Renames a property of an object with a new key name.
 * @param obj The object to rename the key.
 * @param oldKey The original key to rename.
 * @param newKey The new name of the key.
 * @returns The original object with the renamed key.
 */
export function renameProperty(obj: any, oldKey: any, newKey: any): object {
  if (
    !isObject(obj) ||
    !isString(oldKey, 1) ||
    !isString(newKey, 1) ||
    oldKey === newKey
  ) {
    throw new Error("Cannot renameProperty. Invalid settings.");
  }

  Object.defineProperty(
    obj,
    newKey,
    Object.getOwnPropertyDescriptor(
      obj,
      oldKey as PropertyKey
    ) as PropertyDescriptor
  );
  delete obj[oldKey];

  return obj;
}

/**
 * Runs a given function on all members of an object.
 * @param obj The object to run func() on all members.
 * @param func A function that receives each string property key and its value 
 * @param mustHaveValue If true, the property must have a value in order for func() to be called.
 * @returns The original object with function having been run on each property.
 */
export function runOnAllMembers(
  obj: object,
  func: (key: string, value: any) => any,
  mustHaveValue = true
) {
  if (!isObject(obj)) {
    throw new Error("runOnAllMembers() received an empty object.");
  }
  if (!isFunction(func)) {
    throw new Error("runOnAllMembers() received an empty function operator.");
  }

  for (const [key, value] of Object.entries(obj)) {
    if (!mustHaveValue || (mustHaveValue && value)) {
      (obj as any)[key] = func(key, value);
    }
    // console.log(`${key}: ${value}`)
  }

  return obj;
}

/**
 * Searches the object looking for the first array it finds.
 * If the object passed in is already an array, it is returned.
 * @param {object} obj The object to look for the array.
 * @returns {any[]} Returns obj if it is an array, or if obj is an object, the first array found is returned. [] if none found.
 */
export function searchObjectForArray(obj: any): any[] {
  if (isArray(obj)) {
    return obj;
  }

  if (isObject(obj)) {
    return Object.values(obj).find((x) => isArray(x)) as any[];
  }

  return [];
}

/**
 * Takes a string or array of strings, iterates over each string and splits them according to the splitter provided.
 * Each split string is then added to an array and the array of split strings is returned.
 * @param strOrArray A string or string array to push all items split with the splitter provided.
 * @param splitter A string of what to split every string by.
 * @param removeEmpties If true, remove all empty strings.
 * @param trimStrings True if you want to remove any surrounding spaces on every string.
 * @returns An array of every string split by splitter.
 */
export function splitToArray(
  strOrArray: StringOrArray,
  splitter = ",",
  removeEmpties = true,
  trimStrings = true
): any[] {
  let splitted: any[] = [];
  if (isString(strOrArray as any)) {
    splitted = (strOrArray as string).split(splitter);
  } else if (isArray(strOrArray)) {
    (strOrArray as string[]).map((x: string) =>
      splitted.push(x.split(splitter))
    );
  } else {
    throw "Invalid type passed to splitToArray";
  }

  if (trimStrings) {
    splitted = splitted.map((x: string) => x.trim());
  }

  if (removeEmpties) {
    return splitted.filter(function (e: string) {
      if (e) return e;
    });
  }

  return splitted;
}

/**
 * Calls splitToArray and if only one string is the array is returned, just that string is returned.
 * Otherwise the array returned from splitToArray is returned intact.
 * @param strOrArray A string or string array to push all items split with the splitter provided.
 * @param splitter A string of what to split every string by.
 * @param removeEmpties If true, remove all empty strings.
 * @param trimStrings True if you want to remove any surrounding spaces on every string.
 * @returns An array of every string split by splitter, of if only 1 string is the result of splitToArray, the string itself is returned.
 */
export function splitToArrayOrStringIfOnlyOne(
  strOrArray: StringOrArray,
  splitter = ",",
  removeEmpties = true,
  trimStrings = true
): StringOrArray {
  const arr = splitToArray(strOrArray, splitter, removeEmpties, trimStrings);

  if (isArray(arr, 2)) {
    return arr;
  }

  if (isArray(arr, 1)) {
    return arr[0];
  }

  return "";
}

/**
 * Calls splitToArray and if only one string is the array is returned, just that string is returned uppercase.
 * Otherwise the array returned from splitToArray is returned with each string uppercased.
 * @param strOrArray A string or string array to push all items split with the splitter provided.
 * @param splitter A string of what to split every string by.
 * @param removeEmpties If true, remove all empty strings.
 * @param trimStrings True if you want to remove any surrounding spaces on every string.
 * @returns An array of every string split by splitter, of if only 1 string is the result of splitToArray with every string uppercased, the string itself is returned uppercase.
 */
export function splitToArrayOrStringIfOnlyOneToUpper(
  strOrArray: StringOrArray,
  splitter = ",",
  removeEmpties = true,
  trimStrings = true
): StringOrArray {
  const arr = splitToArrayOrStringIfOnlyOne(
    strOrArray,
    splitter,
    removeEmpties,
    trimStrings
  );

  if (isArray(arr)) {
    return (arr as string[]).map((x: string) => x.toUpperCase());
  }

  return safestrUppercase(arr as string);
}

/**
 * Returns the number of milliseconds between two times.
 * @param startTime The time to begin the diff with.
 * @param endTime The ending time for the diff. If none provided, the current time is used.
 * @returns The absolute value of milliseconds difference between the two times. 
 */
export function timeDifference(startTime: Date, endTime: Date | null): number {
  const fname = "timeDifference: ";
  if (!startTime) {
    throw new Error(fname + "You must have a start time.");
  }

  if (!endTime) {
    endTime = new Date();
  }

  return Math.abs(endTime.getTime() - startTime.getTime());
}
/**
 * Returns the number of seconds between two times.
 * @param startTime The time to begin the diff with.
 * @param endTime The ending time for the diff. If none provided, the current time is used.
 * @returns The absolute value of seconds difference between the two times rounded down (even if milliseconds is > 500)
 */
export function timeDifferenceInSeconds(
  startTime: Date,
  endTime: Date | null
): number {
  return Math.floor(timeDifference(startTime, endTime) / 1000);
}
/**
 * Returns the number of seconds or optionally milliseconds, between two times as a string representation.
 * i.e., 5 days 21 hours 59 minutes 35 seconds 889ms, or 5d 21h 59m 35s 889ms. Used mostly for log messages.
 * @param startTime The time to begin the diff with.
 * @param endTime The ending time for the diff. If none provided, the current time is used.
 * @param longFormat True if you want day, hour, minute, and second to be spelled out. False if you want the dhms abbreviations only.
 * @param showMilliseconds True if you want the milliseconds included in the time difference.
 * @returns The absolute value of seconds or milliseconds difference between the two times as a string.
 */
export function timeDifferenceString(
  startTime: Date,
  endTime: Date | null,
  longFormat = false,
  showMilliseconds = false
): string {
  const seconds = timeDifferenceInSeconds(startTime, endTime);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / (3600 * 24));

  let s = "";
  if (days > 0) {
    s += longFormat ? `${days} day${pluralSuffix(days)}` : `${days}d`;
  }

  if (hours > 0) {
    s += longFormat
      ? `${prefixIfHasData(s)}${hours} hour${pluralSuffix(hours)}`
      : `${prefixIfHasData(s, " ")}${hours}h`;
  }

  if (minutes > 0) {
    s += longFormat
      ? `${prefixIfHasData(s)}${minutes} minute${pluralSuffix(minutes)}`
      : `${prefixIfHasData(s, " ")}${minutes}m`;
  }

  const secondsModulo = seconds % 60;
  if (secondsModulo > 0) {
    s += longFormat
      ? `${prefixIfHasData(s)}${secondsModulo} second${pluralSuffix(
          secondsModulo
        )}`
      : `${prefixIfHasData(s, " ")}${secondsModulo}s`;
  }

  if (showMilliseconds) {
    const micros = timeDifference(startTime, endTime) % 1000;
    if (micros > 0) {
      s += `${prefixIfHasData(s, longFormat ? ", " : " ")}${micros % 1000}ms`;
    }
  }

  return safestr(s, longFormat ? "0 seconds" : "0s");
}
