import { gameDataManager, IGameDataManager } from './gameDataManager'
import { MongooseModelCSGOMap } from './../features/csgo/mongodb/csgo-map.mongodb.model'
import { MongooseModelCSGOItem } from './../features/csgo/mongodb/csgo-item.mongodb.model'
import { MongooseDocumentExtensionsCSGO } from '~src/features/csgo/interfaces'

process.env.DB_TEST_COLLECTION = 'gameDataManagerIntegrationTest'

describe('gameDataManager()', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('~src/testing/__test_csgo_mongodb_prepopulate__')

  test('should get CSGO maps from DB', async () => {
    const dbItems: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[] = await MongooseModelCSGOMap.find(
      {}
    )

    const itemsManager: IGameDataManager<
      MongooseDocumentExtensionsCSGO.Output.IMongooseMap
    > = gameDataManager(dbItems)

    expect(itemsManager.hasID('MIRAGE')).toEqual(true)
  })

  test('should get CSGO items from DB', async () => {
    const dbItems: MongooseDocumentExtensionsCSGO.Output.IMongooseItem[] = await MongooseModelCSGOItem.find(
      {}
    )

    const itemsManager: IGameDataManager<
      MongooseDocumentExtensionsCSGO.Output.IMongooseItem
    > = gameDataManager(dbItems)

    expect(itemsManager.hasID('MP7')).toEqual(true)
  })
})
