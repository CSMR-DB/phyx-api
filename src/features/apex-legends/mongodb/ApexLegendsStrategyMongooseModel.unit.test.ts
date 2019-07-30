import { Model, Document } from 'mongoose'
import { ApexLegendsStrategyMongooseModel } from './ApexLegendsStrategyMongooseModel'
import { ApexLegendsContainer } from './../di/ApexLegendsDI'
import { IApexLegendsStrategyDocument } from '../interfaces/index.interface'

require('dotenv').config()

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

const validApexStrategy: IApexLegendsStrategyDocument = {
  name: 'Test',
  team: {
    name: 'Plebs',
    players: [
      {
        name: 'PHYD',
        legend: 'WATTSON',
        loadout: {
          primary: 'LONGBOW',
          secondary: 'DEVOTION'
        }
      },
      {
        name: 'NOTPHYD',
        legend: 'BANGALORE',
        loadout: {
          primary: 'R99',
          secondary: 'PEACEKEEPER'
        }
      },
      {
        name: 'ALSONOTPHYD',
        legend: 'OCTANE',
        loadout: {
          primary: 'R301',
          secondary: 'KRABER'
        }
      }
    ]
  }
}

const collection: Model<Document, {}> = ApexLegendsContainer.resolve(
  ApexLegendsStrategyMongooseModel
).collection

describe('Apex Legends Strategy MongoDB Model, using DI', () => {
  require('~src/testing/__test_mongodb_preload__')

  test('should store a valid strategy', async () => {
    await collection
      .create([ validApexStrategy ])
      .then((result: any[]) => result)
      .catch((error: Error) => error)

    const docs: any[] = await collection.find({})

    expect(docs.length).toEqual(1)
  })
})
