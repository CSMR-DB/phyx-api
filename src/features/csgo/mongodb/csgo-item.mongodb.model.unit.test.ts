import mongoose from 'mongoose'
import { MongooseModelCSGOItem } from './csgo-item.mongodb.model'

describe('CSGO Item MongoDB Model', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should store valid items', async () => {
    await MongooseModelCSGOItem.create([
      {
        internal_id: 'P250',
        name: 'P-250',
        cost: 300,
        side: 'UNI',
        slot: 'secondary'
      },
      {
        internal_id: 'USPS',
        name: 'USP-S',
        cost: 0,
        side: 'DEF',
        slot: 'secondary'
      }
    ])
      .then((result: mongoose.Document[]) => result)
      .catch((error: Error) => error)

    const docs: mongoose.Document[] = await MongooseModelCSGOItem.find({})

    expect(docs.length).toEqual(2)

    expect(docs[0].toJSON().name).toEqual('P-250')
  })

  test('should not store invalid items', async () => {
    await MongooseModelCSGOItem.create([
      {
        internal_id: 'USPS',
        name: 'USP-S',
        slot: 'secondary'
      }
    ])
      .then((result: mongoose.Document[]) => result)
      .catch((error: Error) => {
        console.log(error)

        expect(error.message).toEqual(
          'csgo_item validation failed: cost: Path `cost` is required., side: Path `side` is required.'
        )
      })

    const docs: mongoose.Document[] = await MongooseModelCSGOItem.find({})

    expect(docs.length).toEqual(0)
  })
})
