import { hasData, safestrLowercase, isObject, safestr, isArray } from "./skky"

export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

export type FetchDataTypesAllowed = object | Array<any> | string | number

export type FetchSettings<Tdata extends FetchDataTypesAllowed | undefined = undefined> = {
  url: string,
  method: HttpMethod,
  data?: Tdata,
  fname?: string,
  bearerToken?: string
  statusCodesToBypassErrorHandler?: number[]
}

export class GrayArrowHttpError extends Error {
  functionNameSource: string
  response?: Response

  constructor(m: string, functionNameSource: string, res?: Response) {
    super(m)

    this.functionNameSource = hasData(functionNameSource) ? functionNameSource : 'GrayArrowHttpError'
    this.response = res

    Object.setPrototypeOf(this, new.target.prototype)
  }
}

/**
 * An HTTP header to support JSON API calls. An optional Bearer token can be provided as well.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @returns A JSON ready header for HTTP calls.
 */
export function getHttpHeaderJson(bearerToken?: string) {
  const headers = new Headers({ "Content-Type": "application/json" })

  if (hasData(bearerToken)) {
    headers.append("Authorization", `Bearer ${bearerToken}`)
  }

  return headers
}

/**
 * Makes an HTTP call to an API using the given HTTP method.
 * @param url The URL endpoint of the API call.
 * @param method The HTTP method to be used.
 * @param data Optional body to send with the request. Can be a JSON object or a string.
 * @param fname The callers function name for outputting in potential error calls.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @returns The returned Response object in a Promise.
 */
export async function fetchHttp<Tdata extends FetchDataTypesAllowed | undefined = undefined>(
  url: string,
  method: HttpMethod,
  data?: Tdata,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings<Tdata>
) {
  if (!fname || !hasData(fname)) {
    fname = 'fetchHttp'
  }

  if (!hasData(url)) {
    throw new Error(`${fname} passed an empty URL.`)
  }

  try {
    const req: RequestInit = {
      method,
      headers: getHttpHeaderJson(bearerToken),
    }

    if (data && hasData(data)) {
      req.body = isObject(data) || isArray(data) ? JSON.stringify(data) : String(data)
    }

    const response = await fetch(url, req)
    if (!response.ok) {
      throw new GrayArrowHttpError(`${fname!}: Error in HTTP ${method} to URL: ${url} with status code ${response.status}.`, fname, response)
    }

    return response
  }
  catch (err) {
    if (err instanceof GrayArrowHttpError) {
      throw err
    }

    throw new GrayArrowHttpError((err as any).message, fname)
  }
}

export async function fetchData<Tdata extends FetchDataTypesAllowed>(
  url: string,
  method: HttpMethod,
  data?: Tdata,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings<Tdata>
) {
  const resp = await fetchHttp(url, method, data, fname, bearerToken, settings)

  return await resp.text()
}

export async function fetchJson<Tdata extends FetchDataTypesAllowed | undefined, Tret>(
  url: string,
  method: HttpMethod,
  data?: Tdata,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings<Tdata>
): Promise<Tret> {
  const resp = await fetchHttp(url, method, data, fname, bearerToken, settings)

  return await resp.json()
}

/**
 * DELETEs data to an API using an HTTP DELETE.
 * @param url The URL endpoint of the API call.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @param fname The callers function name for outputting in potential error calls.
 * @returns The returned Response object in a Promise.
 */
export async function fetchDelete(
  url: string,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings
) {
  return fetchHttp(url, "DELETE", undefined, fname, bearerToken, settings)
}

/**
 * DELETEs data to an API using an HTTP DELETE.
 * @param url The URL endpoint of the API call.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @param fname The callers function name for outputting in potential error calls.
 * @returns The returned Response object in a Promise.
 */
export async function fetchDeleteJson<Tdata extends FetchDataTypesAllowed, Tret = undefined>(
  url: string,
  fname?: string,
  bearerToken?: string,
  data?: Tdata,
  settings?: FetchSettings<Tdata>
) {
  return fetchJson<Tdata, Tret>(url, "DELETE", data, fname, bearerToken, settings)
}

/**
 * Fetches data from an API using an HTTP GET.
 * Returns the JSON data from the API call.
 * @param url The URL endpoint of the API call.
 * @param fname The callers function name for outputting in potential error calls.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @returns The returned JSON object.
 */
export async function fetchGet<Tret>(
  url: string,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings
) {
  return fetchJson<undefined, Tret>(url, "GET", undefined, fname, bearerToken, settings)
}

/**
 * PATCHs data to an API using an HTTP POST.
 * @param url The URL endpoint of the API call.
 * @param data The object of the data to pass to the API.
 * @param fname The callers function name for outputting in potential error calls.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @returns The returned Response object in a Promise.
 */
export async function fetchPatch<Tdata extends FetchDataTypesAllowed, Tret = undefined>(
  url: string,
  data: Tdata,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings<Tdata>
) {
  return fetchJson<Tdata, Tret>(url, "PATCH", data, fname, bearerToken, settings)
}

/**
 * Fetches data from an API using an HTTP POST.
 * Returns the JSON data from the API call.
 * @param url The URL endpoint of the API call.
 * @param data The object of the data to pass to the API.
 * @param fname The callers function name for outputting in potential error calls.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @returns The returned JSON object.
 */
export async function fetchPost<Tdata extends FetchDataTypesAllowed | undefined, Tret = undefined>(
  url: string,
  data?: Tdata,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings<Tdata>
) {
  return fetchJson<Tdata, Tret>(url, "POST", data, fname, bearerToken, settings)
}

/**
 * PUTs data to an API using an HTTP POST.
 * @param url The URL endpoint of the API call.
 * @param data The object of the data to pass to the API.
 * @param fname The callers function name for outputting in potential error calls.
 * @param bearerToken An optional security token to add as Authorization to the HTTP header.
 * @returns The returned Response object in a Promise.
 */
export async function fetchPut<Tdata extends FetchDataTypesAllowed, Tret = undefined>(
  url: string,
  data: Tdata,
  fname?: string,
  bearerToken?: string,
  settings?: FetchSettings<Tdata>
) {
  return fetchJson<Tdata, Tret>(url, "PUT", data, fname, bearerToken, settings)
}
