import { IGameItem } from '~src/interfaces/IStrategy.interface'

export interface IGameDataManager<T extends IGameItem, K extends keyof T> {
  hasID: (id: T['internal_id']) => boolean
  getOneById: (id: T['internal_id']) => T | undefined
  getField: (id: T['internal_id'], field: K, undefinedReturn: T[K]) => T[K]
}

export function gameDataManager<T extends IGameItem, K extends keyof T>(
  items: T[]
): IGameDataManager<T, K> {
  function hasID(id: T['internal_id']): boolean {
    const result: boolean = items.some((item: T) => item.internal_id === id)

    return result
  }

  function getOneById(id: T['internal_id']): T | undefined {
    const result: T | undefined = hasID(id)
      ? items.find((item: T) => item.internal_id === id)
      : undefined

    return result
  }

  function getField(
    id: T['internal_id'],
    field: K,
    undefinedReturn: T[K]
  ): T[K] {
    const result: T[K] = hasID(id) ? getOneById(id)![field] : undefinedReturn

    return result
  }

  return Object.freeze({ hasID, getOneById, getField })
}
