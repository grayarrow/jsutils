import { ICreatedBy, IUpdatedBy } from "./api-interfaces"
import { IdVal } from "./id-val"
import { NameValType } from "./name-val"
import { isObject } from "./skky"
import { IName } from "./types"

export interface IConfig<Tid = string, Tval = boolean> extends IdVal<Tid, Tval>, IName<string>, ICreatedBy, IUpdatedBy {
  userid: Tid
}

export default class Config<Tid = string, Tval = boolean> implements IConfig<Tid, Tval> {
  id!: Tid
  userid!: Tid
  name = ''
  val!: Tval
  updatedby = 'Config'
  updated = new Date()
  createdby = 'Config'
  created = new Date()

  constructor(
    id: Tid,
    userid: Tid,
    name = '',
    val: Tval,
    updatedby = 'Config',
    updated = new Date(),
    createdby = 'Config',
    created = new Date()) {
    if (isObject(id)) {
      this.copyFromDatabase(id as any)
    }
    else {
      // constructor items
      this.id = id
      this.userid = userid
      this.name = name
      this.val = val
      this.updatedby = updatedby
      this.updated = updated
      this.createdby = createdby
      this.created = created
    }
  }

  copyFromDatabase(dbtp: IConfig<Tid, Tval>) {
    this.id = dbtp.id
    this.userid = dbtp.userid
    this.name = dbtp.name
    this.val = dbtp.val
    this.updatedby = dbtp.updatedby
    this.updated = dbtp.updated
    this.createdby = dbtp.createdby
    this.created = dbtp.created
  }

  api(): NameValType<Tval> {
    return {
      name: this.name,
      val: this.val
    }
  }
}

export type ConfigType<Tid = string, Tval = boolean> = {
  id: Tid
  userid: Tid
  name: string
  val: Tval
  updatedby: string
  updated: Date
  createdby: string
  created: Date
}
