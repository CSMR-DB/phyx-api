import mongoose, { Schema } from 'mongoose'
import { csgoSchema } from '../graphql/csgo.schema'
import { graphql, ExecutionResult, Source } from 'graphql'
import { csgoGraphQLService } from '../services/csgoGraphQL.service'
import { MongooseModelCSGOMap } from './../mongodb/csgo-map.mongodb.model'
import { ICSGODocuments } from '~src/features/csgo/interfaces/ICSGODocuments.interface'

describe('Integration tests for CSGO Map', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should submit a valid map to the database', async () => {
    const testMap: ICSGODocuments.Map = {
      internal_id: 'MIRAGE',
      name: 'Mirage',
      mode: 'de',
      active: true
    }

    const mutation: string = `
        mutation SUBMIT_CSGO_MAP($map: MapInput) {
          createCSGOMap(map: $map) {
            result
            errors
          }
        }
      `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      map: testMap
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: { createCSGOMap: { errors: [], result: true } }
    })

    const dbEntries: mongoose.Document[] = await MongooseModelCSGOMap.find({})

    expect(dbEntries.length).toBe(1)

    const dbEntry: typeof testMap & {
      __v: number
      _id: Schema.Types.ObjectId
      createdAt: Date
      updatedAt: Date
    } = dbEntries[0].toJSON()

    const responseDocument: typeof dbEntry = Object.assign(testMap, {
      __v: dbEntry.__v,
      _id: dbEntry._id,
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    })

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('Mirage')
  })

  test('should not submit an invalid map (duplicate ID) to the database', async () => {
    const testMap: ICSGODocuments.Map = {
      internal_id: 'MIRAGE',
      name: 'Mirage',
      mode: 'de',
      active: true
    }
    const testMapDuplicateID: ICSGODocuments.Map = {
      internal_id: 'MIRAGE',
      name: 'Nuke',
      mode: 'de',
      active: true
    }

    const mutation: string = `
        mutation SUBMIT_CSGO_MAP($map: MapInput) {
          createCSGOMap(map: $map) {
            result
            errors
          }
        }
      `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      map: testMap
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: { createCSGOMap: { errors: [], result: true } }
    })

    const executionTwo: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      { map: testMapDuplicateID }
    )

    expect(executionTwo).not.toEqual({
      data: { createCSGOMap: { errors: [], result: true } }
    })

    const dbEntries: mongoose.Document[] = await MongooseModelCSGOMap.find({})

    expect(dbEntries.length).toBe(1)

    const dbEntry: typeof testMap & {
      __v: number
      _id: Schema.Types.ObjectId
      createdAt: Date
      updatedAt: Date
    } = dbEntries[0].toJSON()

    const responseDocument: typeof dbEntry = Object.assign(testMap, {
      __v: dbEntry.__v,
      _id: dbEntry._id,
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    })

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('Mirage')
  })
})
