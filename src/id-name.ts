import { IdApi } from "./api-interfaces"
import { IName } from "./types"

export class IdName<Tid = string, Tname = string> implements IdApi<Tid>, IName<Tname> {
  id: Tid
  name: Tname

  constructor(id: Tid, name: Tname) {
    this.id = id
    this.name = name
  }
}

export class IdNameNumber extends IdName<number> {
  constructor(id = 0, name = '') {
    super(id, name)
  }
}

export type IdNameType<Tid = string, Tname = string> = {
  id: Tid
  name: Tname
}

export interface IdNameSlug<Tid = string, Tname = string>  extends IdName<Tid, Tname> {
  slug: string
}
