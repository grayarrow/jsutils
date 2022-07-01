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

export type NameValueObj<T = string> = {
  name: string
  value: T
}

export type NameValueBoolean = NameValueObj<boolean>
export type NameValueNumber = NameValueObj<number>
export type NameValueString = NameValueObj<string>
