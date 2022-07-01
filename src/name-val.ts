export interface INameVal<T = string> {
  name: string
  val: T
}

export class NameVal<T = string> implements INameVal<T> {
  name: string
  val: T

  constructor(name: string, val: T) {
    this.name = name
    this.val = val
  }
}

export type NameValObj<T = string> = {
  name: string
  val: T
}

export type NameValString = NameValObj<string>
