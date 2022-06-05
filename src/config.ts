import { isObject } from "./skky"

export interface IConfig {
  id: number
  userid: number
  name: string
  val: string
  updatedby: string
  updatedon: Date
  createdby: string
  createdon: Date
}

export class Config implements IConfig {
  id = 0
  userid = 0
  name = ''
  val = ''
  updatedby = 'Config'
  updatedon = new Date()
  createdby = 'Config'
  createdon = new Date()

  constructor(id = 0,
    userid = 0,
    name = '',
    val = '',
    updatedby = 'Config',
    updatedon = new Date(),
    createdby = 'Config',
    createdon = new Date()) {
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
      this.updatedon = updatedon
      this.createdby = createdby
      this.createdon = createdon
    }
  }

  copyFromDatabase(dbtp: IConfig) {
    this.id = dbtp.id
    this.userid = dbtp.userid
    this.name = dbtp.name
    this.val = dbtp.val
    this.updatedby = dbtp.updatedby
    this.updatedon = dbtp.updatedon
    this.createdby = dbtp.createdby
    this.createdon = dbtp.createdon
  }

  api(): { name: string, val: string } {
    return {
      name: this.name,
      val: this.val
    }
  }
};
