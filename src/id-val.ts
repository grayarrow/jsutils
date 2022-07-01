export interface IIdVal<Tid = string, Tval = string> {
  id: Tid
  val: Tval
}

export class IdVal<Tid = string, Tval = string> implements IIdVal<Tid, Tval> {
  id: Tid
  val: Tval

  constructor(id: Tid, val: Tval) {
    this.id = id
    this.val = val
  }
}

export type IdValObj<Tid = string, Tval = string> = {
  id: Tid
  val: Tval
}

export type IdValString = IdValObj<string, string>
