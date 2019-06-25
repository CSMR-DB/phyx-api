import { Schema } from 'mongoose'
import { csgoSchema } from './csgo.schema'
import { graphql, ExecutionResult } from 'graphql'
import { csgoStrategyValid } from '../mocks/csgoStrategyValid.mock'
import { csgoGraphQLService } from '../services/csgoGraphQL.service'
import { MongooseModelCSGOStrategy } from '../mongodb/csgo-strategy.mongodb.model'
import { csgoStrategyInvalidItems } from '../mocks/csgoStrategyInvalidItems.mock'
import { csgoStrategyInvalidSide } from '../mocks/csgoStrategyInvalidSide.mock'
import { MongooseDocumentExtensionsCSGO } from '../interfaces'
import { csgoStrategyValidUpdated } from '../mocks/csgoStrategyValidUpdated.mock'

process.env.DB_TEST_COLLECTION = 'csgoStrategyIntegrationTest'

describe('Integration tests for CSGO Strategy', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('~src/testing/__test_csgo_mongodb_prepopulate__')

  function strategyQuery(): Promise<
    ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }>
  > {
    return graphql(
      csgoSchema,
      `
        fragment ItemFragment on CSGOStrategyItem {
          internal_id
        }

        fragment PlayerFragment on Player {
          name
          role
          color
          positions {
            x
            y
          }
          loadout {
            primary {
              ...ItemFragment
            }
            secondary {
              ...ItemFragment
            }
            gear {
              ...ItemFragment
            }
            utilities {
              ...ItemFragment
            }
          }
        }

        query QUERY_CSGO_STRATEGIES {
          csgoStrategies {
            _id
            name
            side
            map
            budget
            description
            createdAt
            updatedAt
            team {
              name
              players {
                player_1 {
                  ...PlayerFragment
                }
                player_2 {
                  ...PlayerFragment
                }
                player_3 {
                  ...PlayerFragment
                }
                player_4 {
                  ...PlayerFragment
                }
                player_5 {
                  ...PlayerFragment
                }
              }
            }
          }
        }
      `,
      null,
      {
        csgoGraphQLService
      }
    )
  }

  test('should receive, validate and submit a valid strategy to the database', async () => {
    const mutation: string = `
      mutation SUBMIT_CSGO_STRATEGY($strategy: CSGOStrategyInput) {
        createCSGOStrategy(strategy: $strategy) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = { strategy: csgoStrategyValid }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: { createCSGOStrategy: { errors: [], result: true } }
    })

    console.log(await strategyQuery())

    const dbEntries: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntries.data!.csgoStrategies.length).toBe(1)

    const dbEntry: MongooseDocumentExtensionsCSGO.IMongooseStrategy & {
      createdAt: string
      updatedAt: string
    } = dbEntries.data!.csgoStrategies[0]

    const responseDocument: typeof dbEntry & any = {
      ...csgoStrategyValid,
      _id: dbEntry._id,
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    }

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.map).toBe('Nuke')
  })

  test('should receive, validate and NOT submit an invalid strategy to the database', async () => {
    const mutation: string = `
      mutation SUBMIT_CSGO_STRATEGY($strategy: CSGOStrategyInput) {
        createCSGOStrategy(strategy: $strategy) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = { strategy: csgoStrategyInvalidItems }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: {
        createCSGOStrategy: {
          errors: [
            'Error: GLOCKZZZZ18 does not exist',
            'Error: PHYD has spent too much on their loadout',
            'Error: GLOCKZZZZ18 is not equippable on ATK side',
            'Error: AUG is not equippable on ATK side'
          ],
          result: false
        }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntries.data!.csgoStrategies.length).toBe(0)
  })

  test('should receive, validate and NOT submit an invalid strategy to the database', async () => {
    const mutation: string = `
      mutation SUBMIT_CSGO_STRATEGY($strategy: CSGOStrategyInput) {
        createCSGOStrategy(strategy: $strategy) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = { strategy: csgoStrategyInvalidSide }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: {
        createCSGOStrategy: {
          errors: [
            'Error: Cookie has spent too much on their loadout',
            'Error: P2000 is not equippable on ATK side',
            'Error: M4A4 is not equippable on ATK side'
          ],
          result: false
        }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntries.data!.csgoStrategies.length).toBe(0)
  })

  test('should receive, validate and submit an array of valid strategies to the database', async () => {
    const mutation: string = `
      mutation SUBMIT_CSGO_STRATEGIES($strategies: [CSGOStrategyInput]) {
        createCSGOStrategies(strategies: $strategies) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      strategies: [ csgoStrategyValid, csgoStrategyInvalidSide ]
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: {
        createCSGOStrategies: [
          { errors: [], result: true },
          {
            errors: [
              'Error: Cookie has spent too much on their loadout',
              'Error: P2000 is not equippable on ATK side',
              'Error: M4A4 is not equippable on ATK side'
            ],
            result: false
          }
        ]
      }
    })

    const dbEntries: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntries.data!.csgoStrategies.length).toBe(1)
  })

  test('should update a strategy from the database', async () => {
    await graphql(
      csgoSchema,
      `
        mutation SUBMIT_CSGO_STRATEGY($strategy: CSGOStrategyInput) {
          createCSGOStrategy(strategy: $strategy) {
            result
            errors
          }
        }
      `,
      null,
      {
        csgoGraphQLService
      },
      {
        strategy: csgoStrategyValid
      }
    )

    const dbEntriesBeforeUpdate: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntriesBeforeUpdate.data!.csgoStrategies.length).toBe(1)

    expect(dbEntriesBeforeUpdate.data!.csgoStrategies[0].description).toBe(
      'Execute with smokes to CT, Stairs and Jungle'
    )

    const mutation: string = `
      mutation UPDATE_CSGO_STRATEGY($id: String, $strategy: CSGOStrategyInput) {
        updateCSGOStrategy(id: $id, strategy: $strategy) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      id: dbEntriesBeforeUpdate.data!.csgoStrategies[0]._id.toString(),
      strategy: csgoStrategyValidUpdated
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: {
        updateCSGOStrategy: { errors: [], result: true }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntries.data!.csgoStrategies.length).toBe(1)

    expect(dbEntries.data!.csgoStrategies[0].description).toBe(
      'Execute with smokes to CT, Stairs and Connector'
    )
  })

  test('should delete a strategy from the database', async () => {
    await graphql(
      csgoSchema,
      `
        mutation SUBMIT_CSGO_STRATEGIES($strategies: [CSGOStrategyInput]) {
          createCSGOStrategies(strategies: $strategies) {
            result
            errors
          }
        }
      `,
      null,
      {
        csgoGraphQLService
      },
      {
        strategies: [ csgoStrategyValid, csgoStrategyInvalidSide ]
      }
    )

    const dbEntriesBeforeDelete: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntriesBeforeDelete.data!.csgoStrategies.length).toBe(1)

    const mutation: string = `
      mutation DELETE_CSGO_STRATEGY($id: String) {
        deleteCSGOStrategy(id: $id) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      id: dbEntriesBeforeDelete.data!.csgoStrategies[0]._id.toString()
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: {
        deleteCSGOStrategy: { errors: [], result: true }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntries.data!.csgoStrategies.length).toBe(0)
  })

  test('should delete multiple strategies from the database', async () => {
    await graphql(
      csgoSchema,
      `
        mutation SUBMIT_CSGO_STRATEGIES($strategies: [CSGOStrategyInput]) {
          createCSGOStrategies(strategies: $strategies) {
            result
            errors
          }
        }
      `,
      null,
      {
        csgoGraphQLService
      },
      {
        strategies: [
          csgoStrategyValid,
          { ...csgoStrategyValid, name: 'Split B' }
        ]
      }
    )

    const dbEntriesBeforeDeletes: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntriesBeforeDeletes.data!.csgoStrategies.length).toBe(2)

    const mutation: string = `
      mutation DELETE_CSGO_STRATEGIES($ids: [String]) {
        deleteCSGOStrategies(ids: $ids) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      ids: dbEntriesBeforeDeletes.data!.csgoStrategies.map(
        (entry: MongooseDocumentExtensionsCSGO.IMongooseStrategy) =>
          entry._id.toString()
      )
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: {
        deleteCSGOStrategies: { errors: [], result: true }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoStrategies: MongooseDocumentExtensionsCSGO.IMongooseStrategy[]
    }> = await strategyQuery()

    expect(dbEntries.data!.csgoStrategies.length).toBe(0)
  })
})
