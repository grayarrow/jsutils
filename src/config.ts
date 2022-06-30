import { ICreatedBy, IUpdatedBy } from "./api-interfaces"
import { IdVal } from "./id-val"
import { INameValString } from "./name-val"
import { isObject } from "./skky"

export interface IConfig extends IdVal<number, string>, ICreatedBy, IUpdatedBy {
  userid: number
  name: string
}

export class Config implements IConfig {
  id = 0
  userid = 0
  name = ''
  val = ''
  updatedby = 'Config'
  updated = new Date()
  createdby = 'Config'
  created = new Date()

  constructor(id = 0,
    userid = 0,
    name = '',
    val = '',
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

  copyFromDatabase(dbtp: IConfig) {
    this.id = dbtp.id
    this.userid = dbtp.userid
    this.name = dbtp.name
    this.val = dbtp.val
    this.updatedby = dbtp.updatedby
    this.updated = dbtp.updated
    this.createdby = dbtp.createdby
    this.created = dbtp.created
  }

  api(): INameValString {
    return {
      name: this.name,
      val: this.val
    }
  }
}
