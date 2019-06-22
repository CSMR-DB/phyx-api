import { csgoSchema } from './csgo.schema'
import { graphql, ExecutionResult } from 'graphql'
import { csgoGraphQLServiceMock } from '../services/csgoGraphQL.service.mock'
import { csgoStrategyValid } from '../mocks/csgoStrategyValid.mock'

interface IGraphQLTestCase {
  id: string
  query: string
  variables: {}
  context: {}
  expected: { data: { [key: string]: any } }
}

const csgoStrategyQueryCases: IGraphQLTestCase[] = [
  {
    id: 'All Strategy',
    query: `
      query CSGO_STRATEGIES {
        csgoStrategies {
          name
          map
        }
      }
    `,
    variables: {},
    context: { csgoGraphQLService: csgoGraphQLServiceMock },
    expected: {
      data: {
        csgoStrategies: [
          { name: 'Test', map: 'Mirage' },
          { name: 'Default', map: 'Nuke' }
        ]
      }
    }
  },
  {
    id: 'Single Strategy',
    query: `
      query CSGO_STRATEGY($id: String) {
        csgoStrategy(id: $id) {
          name
          map
          team {
            players {
              player_1 {
                name
                loadout {
                  primary {
                    internal_id
                  }
                  secondary {
                    internal_id
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { id: '1' },
    context: { csgoGraphQLService: csgoGraphQLServiceMock },
    expected: {
      data: {
        csgoStrategy: {
          name: 'Test',
          map: 'Mirage',
          team: {
            players: {
              player_1: {
                name: 'PHYD',
                loadout: {
                  primary: {
                    internal_id: 'SG551'
                  },
                  secondary: {
                    internal_id: 'P250'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 'Specific Map Strategies',
    query: `
      query CSGO_STRATEGIES_BY_MAP($map: String) {
        csgoStrategiesByMap(map: $map) {
          name
          map
          team {
            players {
              player_1 {
                name
              }
            }
          }
        }
      }
    `,
    variables: { map: 'Mirage' },
    context: { csgoGraphQLService: csgoGraphQLServiceMock },
    expected: {
      data: {
        csgoStrategiesByMap: [
          {
            name: 'Test',
            map: 'Mirage',
            team: {
              players: {
                player_1: {
                  name: 'PHYD'
                }
              }
            }
          }
        ]
      }
    }
  }
]

describe('CSGO Strategy GraphQL Schema', () => {
  test.each(csgoStrategyQueryCases)(
    'should return a document',
    async ({ query, variables, context, expected }: IGraphQLTestCase) => {
      const result: ExecutionResult = await graphql(
        csgoSchema,
        query,
        null,
        context,
        variables
      )

      expect(result).toEqual(expected)
    }
  )

  test('should submit a valid document', async () => {
    const mutation: string = `
      mutation SUBMIT_NEW_STRATEGY($strategy: CSGOStrategyInput) {
        createCSGOStrategy(strategy: $strategy) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService: csgoGraphQLServiceMock
    }

    const variables: {} = { strategy: csgoStrategyValid }

    const result: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(result).toEqual({
      data: { createCSGOStrategy: { errors: [], result: true } }
    })
  })
})
