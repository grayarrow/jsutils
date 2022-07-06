import { IdApi } from "./api-interfaces"

export class IdName<Tid = string> implements IdApi<Tid> {
  id: Tid
  name: string

  constructor(id: Tid, name: string) {
    this.id = id
    this.name = name
  }
}

export class IdNameNumber extends IdName<number> {
  constructor(id = 0, name = '') {
    super(id, name)
  }
}

export type IdNameType<Tid = string> = {
  id: Tid
  name: string
}
