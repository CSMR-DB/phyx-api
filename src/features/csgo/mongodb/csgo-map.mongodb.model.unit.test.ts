import { MongooseModelCSGOMap } from './csgo-map.mongodb.model'
import { MongooseDocumentExtensionsCSGO } from '../interfaces'

require('~src/testing/__test_mongodb_preload__')

describe('CSGO Item MongoDB Model', () => {
  test('should store valid items', async () => {
    await MongooseModelCSGOMap.create([
      {
        internal_id: 'MIRAGE',
        name: 'Mirage',
        mode: 'de',
        active: true
      }
    ])
      .then((result: MongooseDocumentExtensionsCSGO.IMongooseMap[]) => result)
      .catch((error: Error) => error)

    const docs: MongooseDocumentExtensionsCSGO.IMongooseMap[] = await MongooseModelCSGOMap.find(
      {}
    )

    expect(docs.length).toEqual(1)

    expect(docs[0].name).toEqual('Mirage')
  })

  test('should not store invalid items', async () => {
    await MongooseModelCSGOMap.create([
      {
        internal_id: 'MIRAGE',
        name: 'Mirage',
        active: true
      }
    ])
      .then((result: MongooseDocumentExtensionsCSGO.IMongooseMap[]) => result)
      .catch((error: Error) => {
        expect(error.message).toEqual(
          'csgo_map validation failed: mode: Path `mode` is required.'
        )
      })

    const docs: MongooseDocumentExtensionsCSGO.IMongooseMap[] = await MongooseModelCSGOMap.find(
      {}
    )

    expect(docs.length).toEqual(0)
  })

  test('should not store duplicate items', async () => {
    await MongooseModelCSGOMap.create([
      {
        internal_id: 'MIRAGE',
        name: 'Mirage',
        mode: 'de',
        active: true
      },
      {
        internal_id: 'NUKE',
        name: 'Nuke',
        mode: 'de',
        active: true
      },
      {
        internal_id: 'MIRAGE',
        name: 'Dust II',
        mode: 'de',
        active: true
      }
    ])
      .then((result: MongooseDocumentExtensionsCSGO.IMongooseMap[]) => result)
      .catch((error: Error) => {
        expect(error.message.includes('duplicate key error')).toBe(true)
      })

    const docs: MongooseDocumentExtensionsCSGO.IMongooseMap[] = await MongooseModelCSGOMap.find(
      {}
    )

    expect(docs.length).toEqual(2)
  })
})
