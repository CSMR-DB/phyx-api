import { MongoError } from 'mongodb'
import { MongooseModelCSGOStrategy } from './csgo-strategy.mongodb.model'
import { MongooseDocumentExtensionsCSGO } from '../interfaces'
import { csgoStrategyValid } from '../mocks/csgoStrategyValid.mock'

require('dotenv').config()

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('CSGO Strategy MongoDB Model', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('~src/testing/__test_csgo_mongodb_prepopulate__')

  test('should store a valid strategy', async () => {
    await MongooseModelCSGOStrategy.create([
      {
        name: 'Test',
        map: 'Mirage',
        side: 'ATK',
        budget: 6000,
        team: {
          name: 'Plebs',
          players: [
            {
              name: 'PHYD',
              role: 'AWPer',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              role: 'Entry Fragger',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            }
          ]
        }
      }
    ])
      .then(
        (result: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]) =>
          result
      )
      .catch((error: Error) => error)

    const docs: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(docs.length).toEqual(1)

    expect(docs[0].map).toEqual('Mirage')
  })

  test('should throw an error on submission of invalid strategy, one where path `team` is not provided', async () => {
    await MongooseModelCSGOStrategy.create([
      {
        _id: '1',
        name: 'Test',
        map: 'Mirage',
        side: 'ATK',
        budget: 6000
        // team: {...} <-- required, should throw error
      }
    ])
      .then(
        (result: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]) =>
          result
      )
      .catch((error: MongoError) => {
        expect(error).toBeDefined()

        expect(error.message).toContain('Path `team` is required')
      })

    const docs: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(docs.length).toEqual(0)
  })

  test('should throw an error on submission of invalid strategy, one where path `side` is not a valid option in the enum', async () => {
    await MongooseModelCSGOStrategy.create([
      {
        name: 'Test',
        map: 'Mirage',
        side: 'DAF',
        budget: 6000,
        team: {
          name: 'Plebs',
          players: [
            {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'AWPer',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Entry Fragger',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            },
            {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: 'SG551',
                secondary: 'P250'
              }
            }
          ]
        }
      }
    ])
      .then(
        (result: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]) =>
          result
      )
      .catch((error: MongoError) => {
        expect(error).toBeDefined()

        expect(error.message).toContain(
          '`DAF` is not a valid enum value for path `side`'
        )
      })

    const docs: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(docs.length).toBe(0)
  })

  test('should delete a strategy', async () => {
    await MongooseModelCSGOStrategy.create([ csgoStrategyValid ])

    const docs: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(docs.length).toBe(1)

    expect(docs[0].description).toBe(
      'Execute with smokes to CT, Stairs and Connector'
    )

    await MongooseModelCSGOStrategy.updateOne(
      { _id: docs[0]._id },
      { ...csgoStrategyValid, description: 'Split A' }
    )

    const docsAfterUpdate: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(docsAfterUpdate.length).toBe(1)

    expect(docsAfterUpdate[0].description).toBe('Split A')
  })

  test('should delete a strategy', async () => {
    await MongooseModelCSGOStrategy.create([ csgoStrategyValid ])
      .then(
        (result: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[]) =>
          result
      )
      .catch((error: Error) => error)

    const docs: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    await MongooseModelCSGOStrategy.deleteOne({ _id: docs[0]._id })

    const docsAfterDelete: MongooseDocumentExtensionsCSGO.Output.IMongooseStrategy[] = await MongooseModelCSGOStrategy.find(
      {}
    )

    expect(docsAfterDelete.length).toBe(0)
  })
})
