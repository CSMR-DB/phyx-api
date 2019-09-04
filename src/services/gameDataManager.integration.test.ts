import { gameDataManager, IGameDataManager } from './gameDataManager'
import { MongooseModelCSGOMap } from './../features/csgo/mongodb/csgo-map.mongodb.model'
import { MongooseModelCSGOItem } from './../features/csgo/mongodb/csgo-item.mongodb.model'
import { MongooseDocumentExtensionsCSGO } from './../features/csgo/interfaces'

import path from 'path'
process.env.DB_TEST_COLLECTION = path
  .basename(__filename, '.ts')
  .replace(/\./g, '_')

describe('gameDataManager()', () => {
  require('./../testing/__test_mongodb_preload__')
  require('./../testing/__test_csgo_mongodb_prepopulate__') // ROOT

  test('should get CSGO maps from DB', async () => {
    const dbMaps: MongooseDocumentExtensionsCSGO.Output.IMongooseMap[] = await MongooseModelCSGOMap.find(
      {}
    )

    const itemsManager: IGameDataManager<
      MongooseDocumentExtensionsCSGO.Output.IMongooseMap
    > = gameDataManager(dbMaps)

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
