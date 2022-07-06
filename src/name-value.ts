export interface INameValue<T = string> {
  name: string
  value: T
}

export interface INameValueBoolean extends INameValue<boolean> { }
export interface INameValueNumber extends INameValue<number> { }

export class NameValue<T = string> implements INameValue<T> {
  name: string
  value: T

  constructor(name: string, value: T) {
    this.name = name
    this.value = value
  }
}

export type NameValueType<T = string> = {
  name: string
  value: T
}

export type NameValueBoolean = NameValueType<boolean>
export type NameValueNumber = NameValueType<number>
export type NameValueString = NameValueType<string>
