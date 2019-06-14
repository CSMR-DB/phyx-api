import mongoose, { Schema } from 'mongoose'
import { csgoSchema } from '../graphql/csgoStrategy.schema'
import { graphql, ExecutionResult } from 'graphql'
import { csgoStrategyValid } from '../mocks/csgoStrategyValid.mock'
import { csgoStrategyGraphQLService } from './../services/csgoStrategyGraphQL.service'
import { MongooseModelCSGOStrategy } from './../mongodb/csgo-strategy.mongodb.model'
import { csgoStrategyInvalidItems } from '../mocks/csgoStrategyInvalidItems.mock'
import { csgoStrategyInvalidSide } from '../mocks/csgoStrategyInvalidSide.mock'

require('dotenv').config()

describe('Integration tests for CSGO Strategy', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should receive, validate and submit a valid strategy to the database', async () => {
    const mutation: string = `
        mutation SUBMIT_CSGO_STRATEGY($strategy: CSGOStrategyInput) {
          submitCSGOStrategy(strategy: $strategy) {
            result
            errors
          }
        }
      `

    const context: {} = {
      csgoStrategyGraphQLService
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
      data: { submitCSGOStrategy: { errors: [], result: true } }
    })

    const dbEntries: mongoose.Document[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(dbEntries.length).toBe(1)

    const dbEntry: typeof csgoStrategyValid & {
      __v: number
      _id: Schema.Types.ObjectId
      createdAt: Date
      updatedAt: Date
    } = dbEntries[0].toJSON()

    const responseDocument: typeof dbEntry = Object.assign(csgoStrategyValid, {
      __v: dbEntry.__v,
      _id: dbEntry._id,
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    })

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.map).toBe('Nuke')
  })

  test('should receive, validate and NOT submit an invalid strategy to the database', async () => {
    const mutation: string = `
        mutation SUBMIT_CSGO_STRATEGY($strategy: CSGOStrategyInput) {
          submitCSGOStrategy(strategy: $strategy) {
            result
            errors
          }
        }
      `

    const context: {} = {
      csgoStrategyGraphQLService
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
        submitCSGOStrategy: {
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

    const dbEntries: mongoose.Document[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(dbEntries.length).toBe(0)
  })

  test('should receive, validate and NOT submit an invalid strategy to the database', async () => {
    const mutation: string = `
        mutation SUBMIT_CSGO_STRATEGY($strategy: CSGOStrategyInput) {
          submitCSGOStrategy(strategy: $strategy) {
            result
            errors
          }
        }
      `

    const context: {} = {
      csgoStrategyGraphQLService
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
        submitCSGOStrategy: {
          errors: [
            'Error: Cookie has spent too much on their loadout',
            'Error: P2000 is not equippable on ATK side',
            'Error: M4A4 is not equippable on ATK side'
          ],
          result: false
        }
      }
    })

    const dbEntries: mongoose.Document[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(dbEntries.length).toBe(0)
  })
})
