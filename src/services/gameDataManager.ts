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
  const itemsMap: Map<string, T> = new Map()
  items.map((item: T) => itemsMap.set(item.internal_id, item))

  function hasID(id: T['internal_id']): boolean {
    const result: boolean = itemsMap.has(id)

    return result
  }

  function getOneById(id: T['internal_id']): T | undefined {
    const result: T | undefined = itemsMap.get(id)

    return result
  }

  function getField(
    id: T['internal_id'],
    field: keyof T,
    undefinedReturn: T[keyof T]
  ): T[keyof T] {
    const result: T[keyof T] = itemsMap.has(id)
      ? itemsMap.get(id)![field]
      : undefinedReturn

    return result
  }

  return Object.freeze({ hasID, getOneById, getField })
}
