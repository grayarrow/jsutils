export interface IdApi<T = string> {
  id: T
}

export interface ICreatedBy {
  createdby: string
  created: Date
}
export interface IUpdatedBy {
  updatedby: string
  updated: Date
}

export interface ICreatedOnBy {
  createdby: string
  createdon: Date
}
export interface IUpdatedOnBy {
  updatedby?: string
  updatedon?: Date
}
