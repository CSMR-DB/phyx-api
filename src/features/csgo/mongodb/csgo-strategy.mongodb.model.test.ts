import mongoose from 'mongoose'
import { DeleteWriteOpResultObject, MongoError } from 'mongodb'
import { MongooseModelCSGOStrategy } from './csgo-strategy.mongodb.model'

require('dotenv').config()

describe('CSGO Strategy MongoDB Model', () => {
  beforeEach(function(done: Function): any {
    /*
      Define clearDB function that will loop through all 
      the collections in our mongoose connection and drop them.
    */
    function clearDB(): Function {
      for (const i in mongoose.connection.collections) {
        mongoose.connection.collections[i]
          .deleteMany(() => {
            console.log('documents removed')
          })
          .then((result: DeleteWriteOpResultObject) => console.log(result))
          .catch((error: Error) => console.warn(error))
      }

      return done()
    }

    /*
      If the mongoose connection is closed, 
      start it up using the test url and database name
      provided by the node runtime ENV
    */
    if (mongoose.connection.readyState === 0) {
      mongoose
        .connect(
          `mongodb://localhost:27017/${process.env.DB_COLLECTION_NAME +
            '_test'}`,
          { useNewUrlParser: true }, // <------- IMPORTANT
          function(err: MongoError): Function {
            if (err) {
              throw err
            }

            return clearDB()
          }
        )
        .then((result: typeof mongoose) => result)
        .catch((error: Error) => console.warn(error))
    } else {
      return clearDB()
    }
  })

  // afterEach((done: Function) => {
  //   mongoose
  //     .disconnect()
  //     // tslint:disable-next-line: no-empty
  //     .then(() => {})
  //     .catch((error: MongoError) => console.warn(error))

  //   return done()
  // })

  afterAll((done: Function) => {
    mongoose
      .disconnect()
      // tslint:disable-next-line: no-empty
      .then(() => {})
      .catch((error: MongoError) => console.warn(error))

    return done()
  })

  test('should store a valid strategy', async () => {
    await MongooseModelCSGOStrategy.create([
      {
        _id: '1',
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

    expect(docs[0].toJSON()).toEqual({
      __v: 0,
      _id: '1',
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
            color: 'blue',
            loadout: {
              primary: { internal_id: 'SG551' },
              secondary: { internal_id: 'P250' },
              gear: [],
              utilities: []
            }
          },
          player_2: {
            name: 'PHYD',
            internal_id: 'phyd',
            role: 'Lurker',
            positions: [ { x: 1, y: 1 } ],
            color: 'purple',
            loadout: {
              primary: { internal_id: 'SG551' },
              secondary: { internal_id: 'P250' },
              gear: [],
              utilities: []
            }
          },
          player_3: {
            name: 'PHYD',
            internal_id: 'phyd',
            role: 'Lurker',
            positions: [ { x: 1, y: 1 } ],
            color: 'green',
            loadout: {
              primary: { internal_id: 'SG551' },
              secondary: { internal_id: 'P250' },
              gear: [],
              utilities: []
            }
          },
          player_4: {
            name: 'PHYD',
            internal_id: 'phyd',
            role: 'Entry Fragger',
            positions: [ { x: 1, y: 1 } ],
            color: 'orange',
            loadout: {
              primary: { internal_id: 'SG551' },
              secondary: { internal_id: 'P250' },
              gear: [],
              utilities: []
            }
          },
          player_5: {
            name: 'PHYD',
            internal_id: 'phyd',
            role: 'Lurker',
            positions: [ { x: 1, y: 1 } ],
            color: 'yellow',
            loadout: {
              primary: { internal_id: 'SG551' },
              secondary: { internal_id: 'P250' },
              gear: [],
              utilities: []
            }
          }
        }
      }
    })
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
