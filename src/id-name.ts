import { IdApi } from "./api-interfaces"

export class IdName<T> implements IdApi<T> {
  id: T
  name = ''

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

export class IdNameString extends IdName<string> {
  constructor(id = '', name = '') {
    super(id, name)
  }
}
