import mongoose from 'mongoose'

require('dotenv').config()

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
      `${process.env.DB_ROOT_URL}/${process.env.DB_COLLECTION_NAME}_${
        process.env.DB_TEST_COLLECTION
      }`,
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    )
  }
  await clearDB()
})

afterEach(async () => {
  await mongoose.disconnect()
})
