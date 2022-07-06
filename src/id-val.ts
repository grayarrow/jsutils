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

export type IdValType<Tid = string, Tval = string> = {
  id: Tid
  val: Tval
}
