import { ICSGODocuments } from '../interfaces/ICSGODocuments.interface'
import { IcsgoGraphQLService } from './csgoGraphQL.service'
import { csgoStrategyValidator } from '../validators/preset/csgoStrategyValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { Document } from 'mongoose'
import { idGenerator } from '~src/utils/idGenerator'

const csgoMapsMockCollection: (ICSGODocuments.Map & {
  internal_id?: string
})[] = [
  {
    internal_id: 'MIRAGE',
    name: 'Mirage',
    mode: 'de',
    active: true
  },
  {
    internal_id: 'NUKE',
    name: 'Nuke',
    mode: 'de',
    active: true
  }
]

const csgoItemsMockCollection: (ICSGODocuments.Item & {
  internal_id?: string
})[] = [
  {
    internal_id: 'P250',
    name: 'P-250',
    cost: 300,
    side: 'UNI'
  },
  {
    internal_id: 'USPS',
    name: 'USP-S',
    cost: 0,
    side: 'DEF'
  }
]

const csgoStrategiesMockCollection: (ICSGODocuments.Strategy & {
  id?: string
})[] = [
  {
    id: '1',
    name: 'Test',
    map: 'Mirage',
    side: 'ATK',
    budget: 6000,
    team: {
      name: 'Plebs',
      players: {
        player_1: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'yellow',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_2: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'blue',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_3: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'purple',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_4: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'green',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_5: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'orange',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        }
      }
    }
  },
  {
    id: '2',
    name: 'Default',
    map: 'Nuke',
    side: 'ATK',
    budget: 6000,
    team: {
      name: 'Plebs',
      players: {
        player_1: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'yellow',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_2: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'blue',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_3: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'purple',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_4: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'green',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        },
        player_5: {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'orange',
          loadout: {
            primary: { internal_id: 'SG551' },
            secondary: { internal_id: 'P250' }
          }
        }
      }
    }
  }
]

export const csgoGraphQLServiceMock: IcsgoGraphQLService = {
  Query: {
    csgoStrategies: async (): Promise<Document[]> =>
      ((await csgoStrategiesMockCollection) as unknown) as Document[],

    csgoStrategy: async ({
      id
    }: {
      id: string
    }): Promise<Document | undefined> =>
      ((await csgoStrategiesMockCollection.find(
        (strategy: ICSGODocuments.Strategy & { id?: string }) =>
          strategy.id === id
      )) as unknown) as Document,

    csgoStrategiesByMap: async ({
      map
    }: {
      map: string
    }): Promise<Document[]> =>
      ((await csgoStrategiesMockCollection.filter(
        (strategy: ICSGODocuments.Strategy) => strategy.map === map
      )) as unknown) as Document[],

    csgoMaps: async (): Promise<Document[]> =>
      ((await csgoMapsMockCollection) as unknown) as Document[],

    csgoMap: async ({ id }: { id: string }) =>
      ((await csgoMapsMockCollection.find(
        (map: ICSGODocuments.Map & { id?: string }) =>
          map.internal_id === id.toLocaleUpperCase()
      )) as unknown) as Document,

    csgoItems: async (): Promise<Document[]> =>
      ((await csgoItemsMockCollection) as unknown) as Document[],

    csgoItem: async ({ id }: { id: string }) =>
      ((await csgoItemsMockCollection.find(
        (item: ICSGODocuments.Item & { id?: string }) =>
          item.internal_id === id.toLocaleUpperCase()
      )) as unknown) as Document
  },
  Mutation: {
    createCSGOStrategy: async ({
      strategy
    }: {
      strategy: ICSGODocuments.Strategy
    }): Promise<{
      result: boolean
      errors: string[]
    }> => {
      await csgoStrategiesMockCollection.push(strategy)

      const result: ValidatorReturnType = await csgoStrategyValidator(strategy)

      const es: string[] = []

      result.errors.forEach((error: Error) => {
        es.push(error.toString())
      })

      return { result: result.result, errors: es }
    },

    createCSGOStrategies: async ({
      strategies
    }: {
      strategies: ICSGODocuments.Strategy[]
    }): Promise<
      {
        result: boolean
        errors: string[]
      }[]
    > => {
      await csgoStrategiesMockCollection.push(...strategies)

      const result: ValidatorReturnType[] = await Promise.all(
        strategies.map(
          async (strategy: ICSGODocuments.Strategy) =>
            await csgoStrategyValidator(strategy)
        )
      )

      return result.map((res: ValidatorReturnType) => {
        const es: string[] = []

        res.errors.forEach((error: Error) => {
          es.push(error.toString())
        })

        return { result: res.result, errors: es }
      })
    },

    createCSGOMap: async ({
      map
    }: {
      map: ICSGODocuments.NewMap
    }): Promise<{
      result: boolean
      errors: string[]
    }> => {
      await csgoMapsMockCollection.push(Object.assign(map, {
        internal_id: idGenerator(map.name, { uppercase: true })
      }) as ICSGODocuments.Map)

      return { result: true, errors: [] }
    },

    createCSGOMaps: async ({
      maps
    }: {
      maps: ICSGODocuments.NewMap[]
    }): Promise<
      {
        result: boolean
        errors: string[]
      }[]
    > => {
      const mapsWithIDs: ICSGODocuments.Map[] = maps.map(
        (m: ICSGODocuments.NewMap) => ({
          ...m,
          internal_id: idGenerator(m.name, { uppercase: true })
        })
      )

      await csgoMapsMockCollection.push(...mapsWithIDs)

      return [ { result: true, errors: [] } ]
    },

    createCSGOItem: async ({
      item
    }: {
      item: ICSGODocuments.NewItem
    }): Promise<{
      result: boolean
      errors: string[]
    }> => {
      await csgoItemsMockCollection.push(Object.assign(item, {
        internal_id: idGenerator(item.name, { uppercase: true })
      }) as ICSGODocuments.Item)

      return { result: true, errors: [] }
    },

    createCSGOItems: async ({
      items
    }: {
      items: ICSGODocuments.NewItem[]
    }): Promise<
      {
        result: boolean
        errors: string[]
      }[]
    > => {
      const itemsWithIDs: ICSGODocuments.Item[] = items.map(
        (m: ICSGODocuments.NewItem) => ({
          ...m,
          internal_id: idGenerator(m.name, { uppercase: true })
        })
      )

      await csgoItemsMockCollection.push(...itemsWithIDs)

      return [ { result: true, errors: [] } ]
    }
  }
}
