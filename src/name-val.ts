export interface INameVal<TVal> {
  name: string
  val: TVal
}

export interface INameValString extends INameVal<string> { }

export class NameVal<TVal> implements INameVal<TVal> {
  name: string
  val: TVal

  constructor(name: string, val: TVal) {
    this.name = name
    this.val = val
  }
}

export class NameValString extends NameVal<string> implements INameValString {
  constructor(name: string, val: string) {
    super(name, val)
  }
}
