import { IName, IValue } from "./types"

export interface INameValue<Tvalue = string, Tname = string> extends IName<Tname>, IValue<Tvalue> { }

export class NameValue<Tvalue = string, Tname = string> implements INameValue<Tvalue, Tname> {
  name: Tname
  value: Tvalue

  constructor(name: Tname, value: Tvalue) {
    this.name = name
    this.value = value
  }
}

export type NameValueType<Tvalue = string, Tname = string> = {
  name: Tname
  value: Tvalue
}

export interface INameValueBoolean extends INameValue<boolean> { }
export interface INameValueNumber extends INameValue<number> { }

export type NameValueBoolean = NameValueType<boolean>
export type NameValueNumber = NameValueType<number>
export type NameValueString = NameValueType<string>
