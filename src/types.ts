export type AnyFixLater = any

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

export type CreateImmutable<Type> = {
  +readonly [Property in keyof Type]: Type[Property]
}

export type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

export interface IDate {
  date: string
}

export interface IName<T = string> {
  name: T
}

export interface IPrice {
  price: number
}
