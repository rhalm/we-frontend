/**
 * Used for pageable models
 */
export interface Pageable<T> {
  content: T[],
  totalElements: number
}
