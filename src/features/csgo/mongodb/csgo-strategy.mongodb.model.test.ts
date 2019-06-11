import mongoose from 'mongoose'
import { DeleteWriteOpResultObject, MongoError } from 'mongodb'

// Load models since we will not be instantiating our express server.
import { MongooseModelCSGOStrategy } from './csgo-strategy.mongodb.model'

process.env.TEST_SUITE = 'CSGO'

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
            console.log('removed')
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
          `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
          { useNewUrlParser: true }, // <------- IMPORTANT
          function(err: MongoError): Function {
            if (err) {
              throw err
            }

            return clearDB()
          }
        )
        .then((result: typeof mongoose) => console.log(result))
        .catch((error: Error) => console.warn(error))
    } else {
      return clearDB()
    }
  })

  afterEach((done: Function) => {
    mongoose
      .disconnect()
      // tslint:disable-next-line: no-empty
      .then(() => {})
      .catch((error: Error) => console.warn(error))

    return done()
  })

  afterAll((done: Function) => {
    return done()
  })

  test('should store a -presumably valid- strategy', async () => {
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
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              color: 'yellow',
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
              color: 'blue',
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
              color: 'purple',
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            },
            player_4: {
              name: 'PHYD',
              internal_id: 'phyd',
              role: 'Lurker',
              positions: [ { x: 1, y: 1 } ],
              color: 'green',
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
              color: 'orange',
              loadout: {
                primary: { internal_id: 'SG551' },
                secondary: { internal_id: 'P250' }
              }
            }
          }
        }
      }
    ])
      .then((result: mongoose.Document[]) => console.log(result))
      .catch((error: Error) => console.warn(error))

    const docs: mongoose.Document[] = await MongooseModelCSGOStrategy.find({})

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
            role: 'Lurker',
            positions: [ { x: 1, y: 1 } ],
            color: 'yellow',
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
            color: 'blue',
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
            color: 'purple',
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
          player_5: {
            name: 'PHYD',
            internal_id: 'phyd',
            role: 'Lurker',
            positions: [ { x: 1, y: 1 } ],
            color: 'orange',
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
})
