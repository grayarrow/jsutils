import { IdApi } from "./api-interfaces"

export class IdName<T = string> implements IdApi<T> {
  id: T
  name: string

  constructor(id: T, name: string) {
    this.id = id
    this.name = name
  }
}

export class IdNameNumber extends IdName<number> {
  constructor(id = 0, name = '') {
    super(id, name)
  }
}

export type IdNameObj<T = string> = {
  id: T
  name: string
}

export type IdNameString = IdNameObj<string>
