import { IName } from "./types"

export interface INameValue<Tvalue = string, Tname = string> extends IName<Tname> {
  value: Tvalue
}

export interface INameValueBoolean extends INameValue<boolean> { }
export interface INameValueNumber extends INameValue<number> { }

export class NameValue<Tvalue = string> implements INameValue<Tvalue> {
  name: string
  value: Tvalue

  constructor(name: string, value: Tvalue) {
    this.name = name
    this.value = value
  }
}

export type NameValueType<Tvalue = string> = {
  name: string
  value: Tvalue
}

export type NameValueBoolean = NameValueType<boolean>
export type NameValueNumber = NameValueType<number>
export type NameValueString = NameValueType<string>
