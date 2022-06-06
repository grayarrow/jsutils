import { isObject, isString, safestrLowercase } from "./skky"

export interface ICaptureResponse<T> {
  id: number
  msg: string
  responseCode: number
  result: string
  tradeId: number
  ticker: string
  obj?: T
}

export class CaptureResponse<T> implements ICaptureResponse<T> {
  constructor(
    public id = 0,
    public msg = '',
    public responseCode = 0,
    public result = '',

    public tradeId = 0,
    public ticker = '',
    public obj?: T,

    // Additional data for after the call that returns this CaptureResponse.
    public request: any = null) {
    if (isObject(id)) {
      Object.assign(this, id)
    }
  }

  static isSuccess(ret?: any): boolean {
    return 'success' === safestrLowercase(ret?.result)
  }
}
