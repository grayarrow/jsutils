// const fetch = require('node-fetch')

export function arrFirst(arr: any, defaultIfNone: any = null): any {
  if (isArray(arr, 1)) {
    return arr[0];
  }

  return defaultIfNone;
}

export function compare(
  a: object,
  b: object,
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
 * Looks for a ret.body object to return.
 * Throws an Error if the body is not found or not an object.
 * @param {object} ret The object to get the ret.body object.
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
 * @param {string | Array<string>} stringOrArray The string or array to flatten.
 * @returns {string} The flattened, comma-separated string.
 */
export function getCommaSeparatedList(
  stringOrArray: string | string[]
): string {
  if (!isArray(stringOrArray)) {
    return stringOrArray as string;
  }

  const myset: any = new Set(stringOrArray);
  return [...myset].join(",");
}

/**
 * Gets a comma separated list of unique items in uppercase.
 * @param {string | Array<string>} stringOrArray The string or array to flatten.
 * @returns {string} The flattened, comma-separated string in uppercase.
 */
export function getCommaUpperList(stringOrArray: string | string[]): string {
  return safestrUppercase(getCommaSeparatedList(stringOrArray));
}

export function fetchHttpDelete(url: string): Promise<Response> {
  return fetch(url, {
    method: "delete",
  });
}
export async function fetchHttpGet(url: string): Promise<any> {
  const ret = await fetch(url);

  return await ret.json();
}
export async function fetchHttpPost(url: string, data: object): Promise<any> {
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

export function newGuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

export function getObject(o: any[], index = 0) {
  if (!isNullOrUndefined(o)) {
    index = index || 0;

    if (isArray(o)) {
      if (o.length > index) {
        return o[index];
      }
    } else if (index === 0) {
      return o;
    }
  }

  return null;
}

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

// Works for positive numbers only.
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

export function isArray(
  arr: any,
  minLengthOrIncludes: number | null = null
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

export function isBoolean(o: any): boolean {
  return "boolean" === typeof o;
}

export function isEmptyObject(obj: any): boolean {
  return (
    null == obj ||
    (isObject(obj) &&
      (Object.keys(obj) || []).length === 0 &&
      obj.constructor === Object)
  );
}
export function isFunction(obj: any): boolean {
  return "function" === typeof obj;
}
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

export function isNullOrUndefined(obj: any): boolean {
  return "undefined" === typeof obj || null == obj;
}

export function isObject(
  obj: any,
  minLengthOrContainsField: number | string = 0
): boolean {
  const isok = obj && "object" === typeof obj && !isArray(obj);
  if (!isok) {
    return false;
  }

  if (isNumber(minLengthOrContainsField)) {
    return (Object.keys(obj) || []).length >= minLengthOrContainsField;
  }

  if (isString(minLengthOrContainsField as string)) {
    return (Object.keys(obj) || []).includes(
      minLengthOrContainsField as string
    );
  }

  return true;
}

export function isString(s: any, minlength = 0): boolean {
  return (
    ("string" === typeof s || (s && s instanceof String)) &&
    s.length >= minlength
  );
}

export function getNullObject(obj: any): any {
  return isEmptyObject(obj) ? null : obj;
}

export function safestr(s: string, ifNull = ""): string {
  if (hasData(s)) {
    return s;
  }

  return hasData(ifNull) ? ifNull : "";
}

export function safestrLowercase(s: string): string {
  return safestr(s).toLowerCase();
}
export function safestrUppercase(s: string): string {
  return safestr(s).toUpperCase();
}

export function pluralSuffix(isPlural: number, suffix = "s"): string {
  if (isNumber(isPlural) && 1 === isPlural) {
    isPlural = 0;
  }

  if (isPlural) {
    return safestr(suffix);
  }

  return "";
}

export function prefixIfHasData(s: string, prefix = ", "): string {
  return hasData(s) ? safestr(prefix) : "";
}

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
 * @param {object} obj The object to look for the array.
 * @returns {Array} Returns the first Array found in the object. [] if none found.
 */
export function searchObjectForArray(obj: any): any[] {
  if (isArray(obj)) {
    return obj;
  }

  let arr: any[] = [];
  if (isObject(obj)) {
    Object.values(obj).forEach((x) => {
      if (isArray(x)) {
        arr = x as any[];
        return x;
      }
    });
  }

  return arr;
}

export function splitToArray(
  strOrArray: string | string[],
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

export function splitToArrayOrStringIfOnlyOne(
  strOrArray: string | string[],
  splitter = ",",
  removeEmpties = true,
  trimStrings = true
): string | string[] {
  const arr = splitToArray(strOrArray, splitter, removeEmpties, trimStrings);

  if (isArray(arr, 2)) {
    return arr;
  }

  if (isArray(arr, 1)) {
    return arr[0];
  }

  return "";
}

export function splitToArrayOrStringIfOnlyOneToUpper(
  strOrArray: string | string[],
  splitter = ",",
  removeEmpties = true,
  trimStrings = true
): string | string[] {
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
export function timeDifferenceInSeconds(
  startTime: Date,
  endTime: Date | null
): number {
  return Math.floor(timeDifference(startTime, endTime) / 1000);
}
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
