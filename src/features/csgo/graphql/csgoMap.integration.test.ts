import mongoose, { Schema } from 'mongoose'
import { csgoSchema } from './csgo.schema'
import { graphql, ExecutionResult } from 'graphql'
import { csgoGraphQLService } from '../services/csgoGraphQL.service'
import { MongooseModelCSGOMap } from '../mongodb/csgo-map.mongodb.model'
import { ICSGODocuments } from '~src/features/csgo/interfaces/ICSGODocuments.interface'

describe('Integration tests for CSGO Map', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should submit a valid map to the database', async () => {
    const testMap: ICSGODocuments.NewMap = {
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
      internal_id: string
      createdAt: Date
      updatedAt: Date
    } = dbEntries[0].toJSON()

    const responseDocument: typeof dbEntry = {
      ...testMap,
      __v: dbEntry.__v,
      _id: dbEntry._id,
      internal_id: testMap.name.toLocaleUpperCase(),
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    }

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('Mirage')
  })

  test('should not submit an invalid map (duplicate ID) to the database', async () => {
    const testMap: ICSGODocuments.NewMap = {
      name: 'Mirage',
      mode: 'de',
      active: true
    }
    const testMapDuplicateID: ICSGODocuments.NewMap = {
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
      internal_id: string
      createdAt: Date
      updatedAt: Date
    } = dbEntries[0].toJSON()

    const responseDocument: typeof dbEntry = {
      ...testMap,
      __v: dbEntry.__v,
      _id: dbEntry._id,
      internal_id: testMap.name.toLocaleUpperCase(),
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    }

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('Mirage')

    const mapByInternalID: ExecutionResult = await graphql(
      csgoSchema,
      `
        query MAP_BY_ID($id: String!) {
          csgoMap(id: $id) {
            name
          }
        }
      `,
      null,
      context,
      { id: 'MIRAGE' }
    )

    expect(mapByInternalID).toEqual({ data: { csgoMap: { name: 'Mirage' } } })
  })

  test('should submit an array of valid maps to the database', async () => {
    const testMaps: ICSGODocuments.NewMap[] = [
      {
        name: 'Vertigo',
        mode: 'de',
        active: true
      },
      {
        name: 'Cobblestone',
        mode: 'de',
        active: false
      }
    ]

    const mutation: string = `
      mutation SUBMIT_CSGO_MAPS($maps: [MapInput]) {
        createCSGOMaps(maps: $maps) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      maps: testMaps
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    console.log(execution)

    expect(execution).toEqual({
      data: {
        createCSGOMaps: [
          { errors: [], result: true },
          { errors: [], result: true }
        ]
      }
    })

    const dbEntries: mongoose.Document[] = await MongooseModelCSGOMap.find({})

    expect(dbEntries.length).toBe(2)
  })
})
