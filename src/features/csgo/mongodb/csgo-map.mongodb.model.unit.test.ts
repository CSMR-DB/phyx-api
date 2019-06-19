import mongoose from 'mongoose'
import { MongooseModelCSGOMap } from './csgo-map.mongodb.model'

describe('CSGO Item MongoDB Model', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should store valid items', async () => {
    await MongooseModelCSGOMap.create([
      {
        internal_id: 'MIRAGE',
        name: 'Mirage',
        mode: 'de',
        active: true
      }
    ])
      .then((result: mongoose.Document[]) => result)
      .catch((error: Error) => error)

    const docs: mongoose.Document[] = await MongooseModelCSGOMap.find({})

    expect(docs.length).toEqual(1)

    expect(docs[0].toJSON().name).toEqual('Mirage')
  })

  test('should not store invalid items', async () => {
    await MongooseModelCSGOMap.create([
      {
        internal_id: 'MIRAGE',
        name: 'Mirage',
        active: true
      }
    ])
      .then((result: mongoose.Document[]) => result)
      .catch((error: Error) => {
        console.log(error)

        expect(error.message).toEqual(
          'csgo_map validation failed: mode: Path `mode` is required.'
        )
      })

    const docs: mongoose.Document[] = await MongooseModelCSGOMap.find({})

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
      .then((result: mongoose.Document[]) => result)
      .catch((error: Error) => {
        console.log(error)

        expect(error.message.includes('duplicate key error')).toBe(true)
      })

    const docs: mongoose.Document[] = await MongooseModelCSGOMap.find({})

    expect(docs.length).toEqual(2)
  })
})
