import { ICSGODocuments } from '../interfaces/ICSGODocuments.interface'
import { IcsgoGraphQLService } from './csgoGraphQL.service'
import { csgoStrategyValidator } from '../validators/preset/csgoStrategyValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'

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

export const csgoGraphQLServiceMock: IcsgoGraphQLService<
  ICSGODocuments.Strategy
> = {
  Query: {
    csgoStrategies: async (): Promise<ICSGODocuments.Strategy[]> =>
      await csgoStrategiesMockCollection,

    csgoStrategy: async ({
      id
    }: {
      id: string
    }): Promise<ICSGODocuments.Strategy | undefined> =>
      await csgoStrategiesMockCollection.find(
        (strategy: ICSGODocuments.Strategy & { id?: string }) =>
          strategy.id === id
      ),

    csgoStrategiesByMap: async ({
      map
    }: {
      map: string
    }): Promise<ICSGODocuments.Strategy[]> =>
      await csgoStrategiesMockCollection.filter(
        (strategy: ICSGODocuments.Strategy) => strategy.map === map
      )
  },
  Mutation: {
    submitCSGOStrategy: async ({
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
    }
  }
}
