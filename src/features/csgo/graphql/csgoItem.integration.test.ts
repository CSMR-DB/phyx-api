import { csgoSchema } from './csgo.schema'
import { ExecutionResult, graphql } from 'graphql'
import { csgoGraphQLService } from './../services/csgoGraphQL.service'
import {
  ICSGODocuments,
  MongooseDocumentExtensionsCSGO
} from '~src/features/csgo/interfaces'

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('csgoItem Integration Test', () => {
  require('~src/testing/__test_mongodb_preload__')

  function itemQuery(): Promise<
    ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }>
  > {
    return graphql(
      csgoSchema,
      `
        query QUERY_CSGO_ITEMS {
          csgoItems {
            _id
            internal_id
            name
            side
            cost
            slot
          }
        }
      `,
      null,
      {
        csgoGraphQLService
      }
    )
  }

  test('should submit a valid item to the database', async () => {
    const testItem: ICSGODocuments.Input.Item = {
      name: 'Wingman',
      cost: 1337,
      side: 'UNI',
      slot: 'primary'
    }

    const mutation: string = `
      mutation SUBMIT_CSGO_ITEM($item: ItemInput) {
        createCSGOItem(item: $item) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      item: testItem
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: { createCSGOItem: { errors: [], result: true } }
    })

    const dbEntries: ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }> = await itemQuery()

    expect(dbEntries.data!.csgoItems.length).toBe(1)

    const dbEntry: MongooseDocumentExtensionsCSGO.Output.IMongooseItem &
      any = dbEntries.data!.csgoItems[0]

    const responseDocument: typeof dbEntry = {
      ...testItem,
      __v: dbEntry.__v,
      _id: dbEntry._id,
      internal_id: testItem.name.toLocaleUpperCase(),
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    }

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('Wingman')
  })

  test('should not submit an invalid item (duplicate ID) to the database', async () => {
    const testItem: ICSGODocuments.Input.Item = {
      name: 'EVA-8',
      side: 'UNI',
      cost: 1,
      slot: 'primary'
    }
    const testItemDuplicateID: ICSGODocuments.Input.Item = {
      name: 'EVA-8',
      side: 'UNI',
      cost: 1,
      slot: 'primary'
    }

    const mutation: string = `
      mutation SUBMIT_CSGO_ITEM($item: ItemInput) {
        createCSGOItem(item: $item) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      item: testItem
    }

    const execution: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      variables
    )

    expect(execution).toEqual({
      data: { createCSGOItem: { errors: [], result: true } }
    })

    const executionTwo: ExecutionResult = await graphql(
      csgoSchema,
      mutation,
      null,
      context,
      { item: testItemDuplicateID }
    )

    expect(executionTwo).not.toEqual({
      data: { createCSGOItem: { errors: [], result: true } }
    })

    const dbEntries: ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }> = await itemQuery()

    expect(dbEntries.data!.csgoItems.length).toBe(1)

    const dbEntry: MongooseDocumentExtensionsCSGO.Output.IMongooseItem &
      any = dbEntries.data!.csgoItems[0]

    const responseDocument: typeof dbEntry = {
      ...testItem,
      __v: dbEntry.__v,
      _id: dbEntry._id,
      internal_id: testItem.name.toLocaleUpperCase().replace(/\W/g, ''),
      createdAt: dbEntry.createdAt,
      updatedAt: dbEntry.updatedAt
    }

    expect(dbEntry).toEqual(responseDocument)

    expect(dbEntry.name).toBe('EVA-8')

    const itemByInternalID: ExecutionResult = await graphql(
      csgoSchema,
      `
        query ITEM_BY_ID($id: String!) {
          csgoItem(id: $id) {
            name
          }
        }
      `,
      null,
      context,
      { id: 'EVA8' }
    )

    expect(itemByInternalID).toEqual({ data: { csgoItem: { name: 'EVA-8' } } })
  })

  test('should submit an array of valid items to the database', async () => {
    const testItem: ICSGODocuments.Input.Item[] = [
      {
        name: 'Spitfire',
        side: 'UNI',
        cost: 1,
        slot: 'primary'
      },
      {
        name: 'Prowler',
        side: 'UNI',
        cost: 9001,
        slot: 'primary'
      }
    ]

    const mutation: string = `
      mutation SUBMIT_CSGO_ITEMS($items: [ItemInput]) {
        createCSGOItems(items: $items) {
          result
          errors
        }
      }
    `

    const context: {} = {
      csgoGraphQLService
    }

    const variables: {} = {
      items: testItem
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
        createCSGOItems: [
          { errors: [], result: true },
          { errors: [], result: true }
        ]
      }
    })

    const dbEntries: ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }> = await itemQuery()

    expect(dbEntries.data!.csgoItems.length).toBe(2)
  })

  test('should update a item in the database', async () => {
    const testItem: ICSGODocuments.Input.Item[] = [
      {
        name: 'EVA-8',
        side: 'UNI',
        cost: 1,
        slot: 'primary'
      },
      {
        name: 'Kraber',
        side: 'UNI',
        cost: 9001,
        slot: 'primary'
      }
    ]

    await graphql(
      csgoSchema,
      `
        mutation SUBMIT_CSGO_ITEMS($items: [ItemInput]) {
          createCSGOItems(items: $items) {
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
        items: testItem
      }
    )

    const dbEntryToModify: ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }> = await itemQuery()

    const mutation: string = `
        mutation UPDATE_CSGO_ITEM($id: String, $item: ItemInput) {
          updateCSGOItem(id: $id, item: $item) {
            result
            errors
          }
        }
      `

    const variables: {
      id: string
      item: Partial<ICSGODocuments.Input.Item>
    } = {
      id: dbEntryToModify.data!.csgoItems[0]._id.toString(),
      item: {
        name: 'EVA-8',
        side: 'UNI',
        cost: 3,
        slot: 'primary'
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
        updateCSGOItem: { errors: [], result: true }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }> = await itemQuery()

    expect(dbEntries.data!.csgoItems.length).toBe(2)

    expect(dbEntries.data!.csgoItems[0].cost).toBe(3)
  })

  test('should delete a item from the database', async () => {
    const testItem: ICSGODocuments.Input.Item[] = [
      {
        name: 'G7 Scout',
        side: 'UNI',
        cost: 13337,
        slot: 'primary'
      },
      {
        name: 'Mastiff',
        side: 'UNI',
        cost: 6969,
        slot: 'primary'
      }
    ]

    await graphql(
      csgoSchema,
      `
        mutation SUBMIT_CSGO_ITEMS($items: [ItemInput]) {
          createCSGOItems(items: $items) {
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
        items: testItem
      }
    )

    const dbEntryToModify: ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }> = await itemQuery()

    const mutation: string = `
        mutation DELETE_CSGO_ITEM($id: String) {
          deleteCSGOItem(id: $id) {
            result
            errors
          }
        }
      `

    const variables: { id: string } = {
      id: dbEntryToModify.data!.csgoItems[0]._id.toString()
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
        deleteCSGOItem: { errors: [], result: true }
      }
    })

    const dbEntries: ExecutionResult<{
      csgoItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[]
    }> = await itemQuery()

    expect(dbEntries.data!.csgoItems.length).toBe(1)

    expect(dbEntries.data!.csgoItems[0].name).toBe('Mastiff')
  })
})
