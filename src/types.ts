export type AnyFixLater = any
export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

export type CreateImmutable<Type> = {
  +readonly [Property in keyof Type]: Type[Property]
}

export type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
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

export interface IDate<T = string> {
  date: T
}

export interface I_Id<T = string> {
  _id: T
}

export interface IId<T = string> {
  id: T
}

export interface IName<T = string> {
  name: T
}

export interface IPrice {
  price: number
}

export interface ISlug {
  slug: string
}

export interface IVal<T> {
  val: T
}

export interface IValue<T> {
  value: T
}
