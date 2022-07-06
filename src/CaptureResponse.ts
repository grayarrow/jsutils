import { isObject, safestrLowercase } from "./skky"

export interface ICaptureResponse<T> {
  id: number
  msg: string
  responseCode: number
  result: string

  obj?: T
}

export class CaptureResponse<T> implements ICaptureResponse<T> {
  id = 0

  // constructor items
  msg = ''
  responseCode = 0
  result = ''

  // General purpose
  obj?: T

  constructor(result = '', msg = '', responseCode = 0, obj?: T) {
    this.result = result
    this.msg = msg
    this.responseCode = responseCode

    this.obj = obj
  }

  setError(errobj?: any) {
    this.result = 'Error'
    this.responseCode = -1

    switch (typeof (errobj)) {
      case 'string':
        this.msg = errobj
        break
      case 'number':
        this.responseCode = errobj
        break
      default:
        this.obj = errobj
        break
    }
  }

  setSuccess(obj?: T) {
    this.result = 'success'

    if (obj) {
      this.obj = obj
    }
  }

  static responseCodeIsGood(ret?: any): boolean {
    if (isObject(ret, 'responseCode')) {
      return ret.responseCode >= 200 && ret.responseCode < 300
    }

    return false
  }
  static isSuccess(ret?: any): boolean {
    if (isObject(ret, 'result')) {
      return 'success' === safestrLowercase(ret.result)
    }

    return false
  }
}

export type CaptureResponseType<T> = InstanceType<typeof CaptureResponse>
