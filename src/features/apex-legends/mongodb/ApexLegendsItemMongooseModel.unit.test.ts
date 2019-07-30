import { Model, Document } from 'mongoose'
import { ApexLegendsContainer } from './../di/ApexLegendsDI'
import { IApexLegendsItem } from '../interfaces/index.interface'

require('dotenv').config()

import path from 'path'
import { ApexLegendsItemMongooseModel } from './ApexLegendsItemMongooseModel'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

const validApexLegendsItem: IApexLegendsItem = {
  name: 'Prowler',
  class: 'SMG',
  ammo_type: 'heavy'
}

const collection: Model<Document, {}> = ApexLegendsContainer.resolve(
  ApexLegendsItemMongooseModel
).collection

describe('Apex Legends Strategy MongoDB Model, using DI', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should store a valid item', async () => {
    await collection
      .create([ validApexLegendsItem ])
      .then((result: any[]) => result)
      .catch((error: Error) => console.warn(error))

    const docs: any[] = await collection.find({})

    expect(docs.length).toEqual(1)

    expect(docs[0]._id).toBe('PROWLER')
  })
})
