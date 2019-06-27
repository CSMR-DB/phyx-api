import { itemsValidator } from './itemsValidator'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidItems } from '~src/features/csgo/mocks/csgoStrategyInvalidItems.mock'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { MongooseDocumentExtensionsCSGO } from '~src/features/csgo/interfaces'
import { MongooseModelCSGOItem } from '~src/features/csgo/mongodb/csgo-item.mongodb.model'

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('ItemsValidator', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('~src/testing/__test_csgo_mongodb_prepopulate__')

  test('validates reduced items with data from DB', async () => {
    const dbItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[] = await MongooseModelCSGOItem.find(
      {}
    )

    const csgoDataManagerDB: IGameDataManager<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem
    > = gameDataManager(dbItems)

    await expect(
      itemsValidator(
        csgoDataManagerDB,
        csgoStrategyDataTransposer(csgoStrategyValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })

  test('invalidates reduced items with data from DB', async () => {
    const dbItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[] = await MongooseModelCSGOItem.find(
      {}
    )

    const csgoDataManagerDB: IGameDataManager<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem
    > = gameDataManager(dbItems)

    await expect(
      itemsValidator(
        csgoDataManagerDB,
        csgoStrategyDataTransposer(csgoStrategyInvalidItems)
      ).execute()
    ).resolves.toEqual({
      result: false,
      errors: [ Error('GLOCKZZZZ18 does not exist') ]
    })
  })
})
