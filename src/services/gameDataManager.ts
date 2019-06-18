import { IGameItem } from '~src/interfaces/IStrategy.interface'

export interface IGameDataManager<T extends IGameItem> {
  hasID: (id: T['internal_id']) => boolean
  getOneById: (id: T['internal_id']) => T | undefined
  getField: (
    id: T['internal_id'],
    field: keyof T,
    undefinedReturn: T[keyof T]
  ) => T[keyof T]
}

export function gameDataManager<T extends IGameItem>(
  items: T[]
): IGameDataManager<T> {
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
    field: keyof T,
    undefinedReturn: T[keyof T]
  ): T[keyof T] {
    const result: T[keyof T] = hasID(id)
      ? getOneById(id)![field]
      : undefinedReturn

    return result
  }

  return Object.freeze({ hasID, getOneById, getField })
}
