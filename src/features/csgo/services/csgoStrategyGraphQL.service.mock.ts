import { ICSGOStrategy } from '../interfaces/ICSGOStrategy.interface'
import { IcsgoStrategyGraphQLService } from './csgoStrategyGraphQL.service'
import { csgoStrategyValidator } from '../validators/csgoStrategyValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'

const csgoStrategiesMockCollection: ICSGOStrategy[] = [
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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
          internal_id: 'phyd',
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

export const csgoStrategyGraphQLServiceMock: IcsgoStrategyGraphQLService<
  ICSGOStrategy
> = {
  Query: {
    csgoStrategies: async (): Promise<ICSGOStrategy[]> =>
      await csgoStrategiesMockCollection,

    csgoStrategy: async ({
      id
    }: {
      id: string
    }): Promise<ICSGOStrategy | undefined> =>
      await csgoStrategiesMockCollection.find(
        (strategy: ICSGOStrategy) => strategy.id === id
      ),

    csgoStrategiesByMap: async ({
      map
    }: {
      map: string
    }): Promise<ICSGOStrategy[]> =>
      await csgoStrategiesMockCollection.filter(
        (strategy: ICSGOStrategy) => strategy.map === map
      )
  },
  Mutation: {
    submitCSGOStrategy: async ({
      strategy
    }: {
      strategy: ICSGOStrategy
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
