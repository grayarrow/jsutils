export interface PagedResponse<T> {
  dataPage: T[]
  totalCount: number
  totalValue?: number
}
