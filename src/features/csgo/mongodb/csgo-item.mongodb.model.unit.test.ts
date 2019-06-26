import { MongooseModelCSGOItem } from './csgo-item.mongodb.model'
import { MongooseDocumentExtensionsCSGO } from '../interfaces'

describe('CSGO Item MongoDB Model', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should store valid items', async () => {
    await MongooseModelCSGOItem.create([
      {
        internal_id: 'R99',
        name: 'R-99',
        cost: 6900,
        side: 'UNI',
        slot: 'primary'
      },
      {
        internal_id: 'R301',
        name: 'R-301',
        cost: 6900,
        side: 'UNI',
        slot: 'primary'
      }
    ])

    const docs: MongooseDocumentExtensionsCSGO.IMongooseItem[] = await MongooseModelCSGOItem.find(
      {}
    )

    expect(docs.length).toEqual(2)

    expect(docs[0].name).toEqual('R-99')

    expect(docs[0]._id).toEqual('R99')
  })

  test('should not store invalid items', async () => {
    await MongooseModelCSGOItem.create([
      {
        internal_id: 'PEACEKEEPER',
        name: 'Peacekeeper',
        slot: 'secondary'
      }
    ])
      .then((result: MongooseDocumentExtensionsCSGO.IMongooseItem[]) => result)
      .catch((error: Error) => {
        expect(error.message).toEqual(
          'csgo_item validation failed: cost: Path `cost` is required., side: Path `side` is required.'
        )
      })

    const docs: MongooseDocumentExtensionsCSGO.IMongooseItem[] = await MongooseModelCSGOItem.find(
      {}
    )

    expect(docs.length).toEqual(0)
  })
})
