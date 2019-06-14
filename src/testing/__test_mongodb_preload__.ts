import mongoose from 'mongoose'
// import { DeleteWriteOpResultObject, MongoError } from 'mongodb'

require('dotenv').config()

// beforeEach(async function(done: Function): any {
//   /*
//     Define clearDB function that will loop through all
//     the collections in our mongoose connection and drop them.
//   */
//   function clearDB(): Function {
//     for (const i in mongoose.connection.collections) {
//       mongoose.connection.collections[i]
//         .deleteMany(() => {
//           console.log('documents removed')
//         })
//         .then((result: DeleteWriteOpResultObject) => console.log(result))
//         .catch((error: Error) => console.warn(error))
//     }

//     return done()
//   }

//   /*
//     If the mongoose connection is closed,
//     start it up using the test url and database name
//     provided by the node runtime ENV
//   */
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(
//       `mongodb://localhost:27017/${process.env.DB_COLLECTION_NAME + '_test'}`,
//       { useNewUrlParser: true }, // <------- IMPORTANT
//       function(err: MongoError): Function {
//         if (err) {
//           throw err
//         }

//         return clearDB()
//       }
//     )
//   }
//   // } else {
//   //   return clearDB()
//   // }

//   await clearDB()
// })

// afterEach(async () => {
//   await mongoose.disconnect()
// })

// // afterEach(function(done: Function): any {
// //   mongoose
// //     .disconnect()
// //     // tslint:disable-next-line: no-empty
// //     .then(() => {})
// //     .catch((error: MongoError) => console.warn(error))

// //   return done()
// // })

// // afterAll((done: Function) => {
// //   mongoose
// //     .disconnect()
// //     // tslint:disable-next-line: no-empty
// //     .then(() => {})
// //     .catch((error: MongoError) => console.warn(error))

// //   return done()
// // })

// import mongoose from 'mongoose'

beforeEach(async () => {
  async function clearDB(): Promise<void> {
    await Promise.all(
      Object.keys(mongoose.connection.collections).map(async (key: string) => {
        return await mongoose.connection.collections[key].deleteMany({})
      })
    )
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      `mongodb://localhost:27017/${process.env.TEST_SUITE}_test`,
      {
        useNewUrlParser: true
      }
    )
  }
  await clearDB()
})

afterEach(async () => {
  await mongoose.disconnect()
})
