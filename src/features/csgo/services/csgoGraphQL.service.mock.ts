import { IcsgoGraphQLService } from './csgoGraphQL.service'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { idGenerator } from '~src/utils/idGenerator'
import { csgoStrategyValidatorMock } from '../validators/preset/csgoStrategyValidator.mock'
import { GraphQLMutationResult } from '~src/graphql/shared.types'
import { ICSGODocuments } from '~src/features/csgo/interfaces'
import { Types } from 'mongoose'

const csgoMapsMockCollection: (WithID<ICSGODocuments.Output.Map>)[] = [
  {
    internal_id: 'MIRAGE',
    _id: 'MIRAGE',
    name: 'Mirage',
    mode: 'de',
    active: true
  },
  {
    internal_id: 'NUKE',
    _id: 'NUKE',
    name: 'Nuke',
    mode: 'de',
    active: true
  }
]

const csgoItemsMockCollection: (WithID<ICSGODocuments.Output.Item>)[] = [
  {
    internal_id: 'P250',
    _id: 'P250',
    name: 'P-250',
    cost: 300,
    side: 'UNI'
  },
  {
    internal_id: 'USPS',
    _id: 'USPS',
    name: 'USP-S',
    cost: 0,
    side: 'DEF'
  }
]

const csgoStrategiesMockCollection: (WithID<
  ICSGODocuments.Output.Strategy
>)[] = [
  {
    _id: '1',
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
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'Cookiegalaxy',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'blue',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'Night',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'purple',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'Blurael',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'green',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'orange',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        }
      ]
    }
  },
  {
    _id: '2',
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
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'Cookiegalaxy',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'blue',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'Night',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'purple',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'Blurael',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'green',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        },
        {
          name: 'PHYD',
          role: 'Lurker',
          positions: [ { x: 1, y: 1 } ],
          color: 'orange',
          loadout: {
            primary: {
              _id: 'SG551',
              internal_id: 'SG551',
              name: 'SG-551',
              cost: 2750
            },
            secondary: {
              _id: 'P250',
              internal_id: 'P250',
              name: 'P-250',
              cost: 300
            }
          }
        }
      ]
    }
  }
]

type WithID<T> = T & { _id?: string }

export const csgoGraphQLServiceMock: IcsgoGraphQLService = {
  Query: {
    csgoStrategies: async (): Promise<
      (WithID<ICSGODocuments.Output.Strategy> & any)[]
    > => await csgoStrategiesMockCollection,

    csgoStrategy: async ({
      id
    }: {
      id: string
    }): Promise<WithID<ICSGODocuments.Output.Strategy> & any | undefined> =>
      await csgoStrategiesMockCollection.find(
        (strategy: WithID<ICSGODocuments.Output.Strategy>) =>
          strategy._id === id
      ),

    csgoStrategiesByMap: async ({
      map
    }: {
      map: string
    }): Promise<(ICSGODocuments.Output.Strategy & any)[]> =>
      await csgoStrategiesMockCollection.filter(
        (strategy: ICSGODocuments.Output.Strategy) => strategy.map === map
      ),

    csgoMaps: async (): Promise<(ICSGODocuments.Output.Map & any)[]> =>
      await csgoMapsMockCollection,

    csgoMap: async ({
      id
    }: {
      id: string
    }): Promise<ICSGODocuments.Output.Map & any | null | undefined> =>
      await csgoMapsMockCollection.find(
        (map: ICSGODocuments.Output.Map) =>
          map.internal_id === id.toLocaleUpperCase()
      ),

    csgoItems: async (): Promise<(ICSGODocuments.Output.Item & any)[]> =>
      await csgoItemsMockCollection,

    csgoItem: async ({
      id
    }: {
      id: string
    }): Promise<ICSGODocuments.Output.Item & any | null | undefined> =>
      await csgoItemsMockCollection.find(
        (item: ICSGODocuments.Output.Item) =>
          item.internal_id === id.toLocaleUpperCase()
      )
  },
  Mutation: {
    createCSGOStrategy: async ({
      strategy
    }: {
      strategy: ICSGODocuments.Input.Strategy
    }): Promise<GraphQLMutationResult> => {
      const result: ValidatorReturnType = await csgoStrategyValidatorMock(
        strategy
      )

      if (result.result) {
        await csgoStrategiesMockCollection.push(
          (strategy as unknown) as ICSGODocuments.Output.Strategy
        )
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
      strategies: ICSGODocuments.Input.Strategy[]
    }): Promise<GraphQLMutationResult[]> => {
      await csgoStrategiesMockCollection.push(
        ...((strategies as unknown[]) as ICSGODocuments.Output.Strategy[])
      )

      const result: ValidatorReturnType[] = await Promise.all(
        strategies.map(
          async (strategy: ICSGODocuments.Input.Strategy) =>
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
      strategy: ICSGODocuments.Input.Strategy
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
      map: ICSGODocuments.Input.Map
    }): Promise<GraphQLMutationResult> => {
      await csgoMapsMockCollection.push({
        ...map,
        _id: idGenerator(map.name, { uppercase: true }),
        internal_id: idGenerator(map.name, { uppercase: true })
      })

      return { result: true, errors: [] }
    },

    createCSGOMaps: async ({
      maps
    }: {
      maps: ICSGODocuments.Input.Map[]
    }): Promise<GraphQLMutationResult[]> => {
      const mapsWithIDs: ICSGODocuments.Input.Map[] = maps.map(
        (map: ICSGODocuments.Input.Map) => ({
          ...map,
          internal_id: idGenerator(map.name, { uppercase: true })
        })
      )

      await csgoMapsMockCollection.push(
        ...((mapsWithIDs as unknown[]) as ICSGODocuments.Output.Map[])
      )

      return [ { result: true, errors: [] } ]
    },

    updateCSGOMap: async ({
      id,
      map
    }: {
      id: Types.ObjectId
      map: ICSGODocuments.Input.Map
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
      item: ICSGODocuments.Input.Item
    }): Promise<GraphQLMutationResult> => {
      await csgoItemsMockCollection.push({
        ...item,
        _id: idGenerator(item.name, { uppercase: true }),
        internal_id: idGenerator(item.name, { uppercase: true })
      })

      return { result: true, errors: [] }
    },

    createCSGOItems: async ({
      items
    }: {
      items: ICSGODocuments.Input.Item[]
    }): Promise<GraphQLMutationResult[]> => {
      const itemsWithIDs: ICSGODocuments.Input.Item[] = items.map(
        (item: ICSGODocuments.Input.Item) => ({
          ...item,
          _id: idGenerator(item.name, {
            uppercase: true
          }),
          internal_id: idGenerator(item.name, {
            uppercase: true
          })
        })
      )

      await csgoItemsMockCollection.push(
        ...((itemsWithIDs as unknown[]) as ICSGODocuments.Output.Item[])
      )

      return [ { result: true, errors: [] } ]
    },

    updateCSGOItem: async ({
      id,
      item
    }: {
      id: Types.ObjectId
      item: ICSGODocuments.Input.Item
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
