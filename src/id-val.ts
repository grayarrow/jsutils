export class IdVal<TId, TVal> {
  id: TId
  val: TVal

  constructor(id: TId, val: TVal) {
    this.id = id
    this.val = val
  }
}
