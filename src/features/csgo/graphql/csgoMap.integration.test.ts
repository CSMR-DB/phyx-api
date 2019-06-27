import { csgoSchema } from './csgo.schema'
import { graphql, ExecutionResult } from 'graphql'
import { csgoGraphQLService } from '../services/csgoGraphQL.service'
import {
  ICSGODocuments,
  MongooseDocumentExtensionsCSGO
} from '~src/features/csgo/interfaces'

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('Integration tests for CSGO Map', () => {
  require('~src/testing/__test_mongodb_preload__')

  function mapQuery(): Promise<
    ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }>
  > {
    return graphql(
      csgoSchema,
      `
        query QUERY_CSGO_MAPS {
          csgoMaps {
            _id
            internal_id
            name
            mode
            active
          }
        }
      `,
      null,
      {
        csgoGraphQLService
      }
    )
  }

  test('should submit a valid map to the database', async () => {
    const testMap: ICSGODocuments.Input.Map = {
      name: 'Airplane',
      mode: 'de',
      active: false
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

    const dbEntries: ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }> = await mapQuery()

    expect(dbEntries.data!.csgoMaps.length).toBe(1)

    const dbEntry: MongooseDocumentExtensionsCSGO.Output.IMongooseMap &
      any = dbEntries.data!.csgoMaps[0]

    const responseDocument: typeof dbEntry = {
      ...testMap,
      __v: dbEntry.__v,
      _id: dbEntry._id,
      internal_id: testMap.name.toLocaleUpperCase(),
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    }

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('Airplane')
  })

  test('should not submit an invalid map (duplicate ID) to the database', async () => {
    const testMap: ICSGODocuments.Input.Map = {
      name: 'Zoo',
      mode: 'de',
      active: false
    }
    const testMapDuplicateID: ICSGODocuments.Input.Map = {
      name: 'Zoo',
      mode: 'de',
      active: false
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

    const dbEntries: ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }> = await mapQuery()

    expect(dbEntries.data!.csgoMaps.length).toBe(1)

    const dbEntry: MongooseDocumentExtensionsCSGO.Output.IMongooseMap &
      any = dbEntries.data!.csgoMaps[0]

    const responseDocument: typeof dbEntry = {
      ...testMap,
      __v: dbEntry.__v,
      _id: dbEntry._id,
      internal_id: testMap.name.toLocaleUpperCase(),
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    }

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('Zoo')

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
      { id: 'ZOO' }
    )

    expect(mapByInternalID).toEqual({ data: { csgoMap: { name: 'Zoo' } } })
  })

  test('should submit an array of valid maps to the database', async () => {
    const testMaps: ICSGODocuments.Input.Map[] = [
      {
        name: 'Subzero',
        mode: 'de',
        active: false
      },
      {
        name: 'Marine',
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

    expect(execution).toEqual({
      data: {
        createCSGOMaps: [
          { errors: [], result: true },
          { errors: [], result: true }
        ]
      }
    })

    const dbEntries: ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }> = await mapQuery()

    expect(dbEntries.data!.csgoMaps.length).toBe(2)
  })

  test('should update a map in the database', async () => {
    const testMaps: ICSGODocuments.Input.Map[] = [
      {
        name: 'Subzero',
        mode: 'de',
        active: false
      },
      {
        name: 'Marine',
        mode: 'de',
        active: false
      }
    ]

    await graphql(
      csgoSchema,
      `
        mutation SUBMIT_CSGO_MAPS($maps: [MapInput]) {
          createCSGOMaps(maps: $maps) {
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
        maps: testMaps
      }
    )

    const dbEntryToModify: ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }> = await mapQuery()

    const mutation: string = `
        mutation UPDATE_CSGO_MAP($id: String, $map: MapInput) {
          updateCSGOMap(id: $id, map: $map) {
            result
            errors
          }
        }
      `

    const variables: { id: string; map: Partial<ICSGODocuments.Input.Map> } = {
      id: dbEntryToModify.data!.csgoMaps[0]._id.toString(),
      map: {
        name: 'Subzero',
        mode: 'de',
        active: true
      }
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      {
        csgoGraphQLService
      },
      variables
    )

    expect(execution).toEqual({
      data: {
        updateCSGOMap: { errors: [], result: true }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }> = await mapQuery()

    expect(dbEntries.data!.csgoMaps.length).toBe(2)

    expect(dbEntries.data!.csgoMaps[0].active).toBe(true)
  })

  test('should delete a map from the database', async () => {
    const testMaps: ICSGODocuments.Input.Map[] = [
      {
        name: 'Subzero',
        mode: 'de',
        active: false
      },
      {
        name: 'Marine',
        mode: 'de',
        active: false
      }
    ]

    await graphql(
      csgoSchema,
      `
        mutation SUBMIT_CSGO_MAPS($maps: [MapInput]) {
          createCSGOMaps(maps: $maps) {
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
        maps: testMaps
      }
    )

    const dbEntryToModify: ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }> = await mapQuery()

    const mutation: string = `
        mutation DELETE_CSGO_MAP($id: String) {
          deleteCSGOMap(id: $id) {
            result
            errors
          }
        }
      `

    const variables: { id: string } = {
      id: dbEntryToModify.data!.csgoMaps[0]._id.toString()
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      {
        csgoGraphQLService
      },
      variables
    )

    expect(execution).toEqual({
      data: {
        deleteCSGOMap: { errors: [], result: true }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[]
    }> = await mapQuery()

    expect(dbEntries.data!.csgoMaps.length).toBe(1)

    expect(dbEntries.data!.csgoMaps[0].name).toBe('Marine')
  })
})
