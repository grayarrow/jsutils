import { INameValue } from "./name-value"
import { IId, IName, ISlug } from "./types"

export interface IIdName<Tid = string, Tname = string> extends IId<Tid>, IName<Tname> { }

export class IdName<Tid = string, Tname = string> implements IIdName<Tid, Tname> {
  id: Tid
  name: Tname

  constructor(id: Tid, name: Tname) {
    this.id = id
    this.name = name
  }
}

export class IdNameNumber extends IdName<number> { }

export type IdNameType<Tid = string, Tname = string> = {
  id: Tid
  name: Tname
}

export interface IdNameSlug<Tid = string, Tname = string>  extends IdName<Tid, Tname>, ISlug { }
export interface IdNameValue<Tvalue, Tid = string> extends IdName<Tid, string>, INameValue<Tvalue> { }

/**
 * Used for sending data to a parent handler in a structured way with contextual id and name.
 */
export interface IValueChange<Tvalue = string> extends IdNameValue<Tvalue, string> { }
/**
 * Used to pass structured data back to a caller. Especially for event handlers.
 */
export type ValueChangeHandler<Tvalue = string, TReturn = void> = (change: IValueChange<Tvalue>) => TReturn
