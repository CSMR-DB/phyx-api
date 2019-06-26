import { IcsgoGraphQLService } from './csgoGraphQL.service'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { idGenerator } from '~src/utils/idGenerator'
import { csgoStrategyValidatorMock } from '../validators/preset/csgoStrategyValidator.mock'
import { GraphQLMutationResult } from '~src/graphql/shared.types'
import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { Types } from 'mongoose'

const csgoMapsMockCollection: (WithID<ICSGODocuments.Map>)[] = [
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

const csgoItemsMockCollection: (WithID<ICSGODocuments.Item>)[] = [
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

const csgoStrategiesMockCollection: (WithID<ICSGODocuments.Strategy>)[] = [
  {
    id: '1',
    name: 'Test',
    map: 'Mirage',
    side: 'ATK',
    budget: 6000,
    team: {
      name: 'Plebs',
      players: [
        {
          name: 'Zombie115m',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'yellow',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'Cookiegalaxy',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'blue',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'Night',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'purple',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'Blurael',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'green',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'orange',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        }
      ]
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
      players: [
        {
          name: 'Zombie115m',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'yellow',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'Cookiegalaxy',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'blue',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'Night',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'purple',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'Blurael',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'green',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        },
        {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'orange',
          loadout: {
            primary: 'SG551',
            secondary: 'P250'
          }
        }
      ]
    }
  }
]

type WithID<T> = T & { id?: string }

export const csgoGraphQLServiceMock: IcsgoGraphQLService = {
  Query: {
    csgoStrategies: async (): Promise<
      (WithID<ICSGODocuments.Strategy> & any)[]
    > => await csgoStrategiesMockCollection,

    csgoStrategy: async ({
      id
    }: {
      id: string
    }): Promise<WithID<ICSGODocuments.Strategy> & any | undefined> =>
      await csgoStrategiesMockCollection.find(
        (strategy: WithID<ICSGODocuments.Strategy>) => strategy.id === id
      ),

    csgoStrategiesByMap: async ({
      map
    }: {
      map: string
    }): Promise<(ICSGODocuments.Strategy & any)[]> =>
      await csgoStrategiesMockCollection.filter(
        (strategy: ICSGODocuments.Strategy) => strategy.map === map
      ),

    csgoMaps: async (): Promise<(ICSGODocuments.Map & any)[]> =>
      await csgoMapsMockCollection,

    csgoMap: async ({
      id
    }: {
      id: string
    }): Promise<ICSGODocuments.Map & any | null | undefined> =>
      await csgoMapsMockCollection.find(
        (map: ICSGODocuments.Map) => map.internal_id === id.toLocaleUpperCase()
      ),

    csgoItems: async (): Promise<(ICSGODocuments.Item & any)[]> =>
      await csgoItemsMockCollection,

    csgoItem: async ({
      id
    }: {
      id: string
    }): Promise<ICSGODocuments.Item & any | null | undefined> =>
      await csgoItemsMockCollection.find(
        (item: ICSGODocuments.Item) =>
          item.internal_id === id.toLocaleUpperCase()
      )
  },
  Mutation: {
    createCSGOStrategy: async ({
      strategy
    }: {
      strategy: ICSGODocuments.Strategy
    }): Promise<GraphQLMutationResult> => {
      const result: ValidatorReturnType = await csgoStrategyValidatorMock(
        strategy
      )

      if (result.result) {
        await csgoStrategiesMockCollection.push(strategy)
      }

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
    }): Promise<GraphQLMutationResult[]> => {
      await csgoStrategiesMockCollection.push(...strategies)

      const result: ValidatorReturnType[] = await Promise.all(
        strategies.map(
          async (strategy: ICSGODocuments.Strategy) =>
            await csgoStrategyValidatorMock(strategy)
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

    updateCSGOStrategy: async ({
      id,
      strategy
    }: {
      id: Types.ObjectId
      strategy: ICSGODocuments.Strategy
    }): Promise<GraphQLMutationResult> => {
      console.log(id, strategy)

      return { result: true, errors: [] }
    },

    deleteCSGOStrategy: async ({
      id
    }: {
      id: Types.ObjectId
    }): Promise<GraphQLMutationResult> => {
      console.log(id)

      return { result: true, errors: [] }
    },

    deleteCSGOStrategies: async ({
      ids
    }: {
      ids: Types.ObjectId[]
    }): Promise<GraphQLMutationResult> => {
      console.log(ids)

      return { result: true, errors: [] }
    },

    createCSGOMap: async ({
      map
    }: {
      map: ICSGODocuments.NewMap
    }): Promise<GraphQLMutationResult> => {
      await csgoMapsMockCollection.push({
        ...map,
        internal_id: idGenerator(map.name, { uppercase: true })
      })

      return { result: true, errors: [] }
    },

    createCSGOMaps: async ({
      maps
    }: {
      maps: ICSGODocuments.NewMap[]
    }): Promise<GraphQLMutationResult[]> => {
      const mapsWithIDs: ICSGODocuments.Map[] = maps.map(
        (map: ICSGODocuments.NewMap) => ({
          ...map,
          internal_id: idGenerator(map.name, { uppercase: true })
        })
      )

      await csgoMapsMockCollection.push(...mapsWithIDs)

      return [ { result: true, errors: [] } ]
    },

    updateCSGOMap: async ({
      id,
      map
    }: {
      id: Types.ObjectId
      map: ICSGODocuments.NewMap
    }): Promise<GraphQLMutationResult> => {
      console.log(id, map)

      return { result: true, errors: [] }
    },

    deleteCSGOMap: async ({
      id
    }: {
      id: Types.ObjectId
    }): Promise<GraphQLMutationResult> => {
      console.log(id)

      return { result: true, errors: [] }
    },

    createCSGOItem: async ({
      item
    }: {
      item: ICSGODocuments.NewItem
    }): Promise<GraphQLMutationResult> => {
      await csgoItemsMockCollection.push({
        ...item,
        internal_id: idGenerator(item.name, { uppercase: true })
      })

      return { result: true, errors: [] }
    },

    createCSGOItems: async ({
      items
    }: {
      items: ICSGODocuments.NewItem[]
    }): Promise<GraphQLMutationResult[]> => {
      const itemsWithIDs: ICSGODocuments.Item[] = items.map(
        (item: ICSGODocuments.NewItem) => ({
          ...item,
          internal_id: idGenerator(item.name, { uppercase: true })
        })
      )

      await csgoItemsMockCollection.push(...itemsWithIDs)

      return [ { result: true, errors: [] } ]
    },

    updateCSGOItem: async ({
      id,
      item
    }: {
      id: Types.ObjectId
      item: ICSGODocuments.NewItem
    }): Promise<GraphQLMutationResult> => {
      console.log(id, item)

      return { result: true, errors: [] }
    },

    deleteCSGOItem: async ({
      id
    }: {
      id: Types.ObjectId
    }): Promise<GraphQLMutationResult> => {
      console.log(id)

      return { result: true, errors: [] }
    }
  }
}
