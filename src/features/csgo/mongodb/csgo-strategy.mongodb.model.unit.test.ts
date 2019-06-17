import mongoose from 'mongoose'
import { MongoError } from 'mongodb'
import { MongooseModelCSGOStrategy } from './csgo-strategy.mongodb.model'

require('dotenv').config()

describe('CSGO Strategy MongoDB Model', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should store a valid strategy', async () => {
    await MongooseModelCSGOStrategy.create([
      {
        name: 'Test',
        map: 'Mirage',
        side: 'ATK',
        budget: 6000,
        team: {
          name: 'Plebs',
          players: {
            player_1: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'AWPer',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_2: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_3: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_4: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Entry Fragger',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_5: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            }
          }
        }
      }
    ])
      .then((result: mongoose.Document[]) => result)
      .catch((error: Error) => error)

    const docs: mongoose.Document[] = await MongooseModelCSGOStrategy.find({})

    expect(docs.length).toEqual(1)

    expect(docs[0].toJSON().map).toEqual('Mirage')
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
      .then((result: mongoose.Document[]) => result)
      .catch((error: MongoError) => {
        expect(error).toBeDefined()

        expect(error.message).toContain('Path `team` is required')
      })

    const docs: mongoose.Document[] = await MongooseModelCSGOStrategy.find({})

    expect(docs.length).toEqual(0)
  })

  test('should throw an error on submission of invalid strategy, one where path `side` is not a valid option in the enum', async () => {
    await MongooseModelCSGOStrategy.create([
      {
        _id: '1',
        name: 'Test',
        map: 'Mirage',
        side: 'DAF',
        budget: 6000,
        team: {
          name: 'Plebs',
          players: {
            player_1: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'AWPer',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_2: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_3: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_4: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Entry Fragger',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_5: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            }
          }
        }
      }
    ])
      .then((result: mongoose.Document[]) => result)
      .catch((error: MongoError) => {
        expect(error).toBeDefined()

        expect(error.message).toContain(
          '`DAF` is not a valid enum value for path `side`'
        )
      })

    const docs: mongoose.Document[] = await MongooseModelCSGOStrategy.find({})

    expect(docs.length).toEqual(0)
  })
})
