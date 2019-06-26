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
              name
              loadout {
                primary 
                secondary 
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
            players: [
              {
                name: 'Zombie115m',
                loadout: {
                  primary: 'SG551',
                  secondary: 'P250'
                }
              },
              {
                name: 'Cookiegalaxy',
                loadout: {
                  primary: 'SG551',
                  secondary: 'P250'
                }
              },
              {
                name: 'Night',
                loadout: {
                  primary: 'SG551',
                  secondary: 'P250'
                }
              },
              {
                name: 'Blurael',
                loadout: {
                  primary: 'SG551',
                  secondary: 'P250'
                }
              },
              {
                name: 'PHYD',
                loadout: {
                  primary: 'SG551',
                  secondary: 'P250'
                }
              }
            ]
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
              name
            }
          }
        }
      }
    `,
    variables: { map: 'Nuke' },
    context: { csgoGraphQLService: csgoGraphQLServiceMock },
    expected: {
      data: {
        csgoStrategiesByMap: [
          {
            name: 'Default',
            map: 'Nuke',
            team: {
              players: [
                {
                  name: 'Zombie115m'
                },
                {
                  name: 'Cookiegalaxy'
                },
                {
                  name: 'Night'
                },
                {
                  name: 'Blurael'
                },
                {
                  name: 'PHYD'
                }
              ]
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
