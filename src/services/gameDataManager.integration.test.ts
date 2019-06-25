import { gameDataManager, IGameDataManager } from './gameDataManager'
import { MongooseModelCSGOMap } from './../features/csgo/mongodb/csgo-map.mongodb.model'
import { MongooseModelCSGOItem } from './../features/csgo/mongodb/csgo-item.mongodb.model'
import {
  ICSGODocuments,
  MongooseDocumentExtensionsCSGO
} from '~src/features/csgo/interfaces'

process.env.DB_TEST_COLLECTION = 'gameDataManagerIntegrationTest'

describe('gameDataManager()', () => {
  require('~src/testing/__test_mongodb_preload__')
  require('~src/testing/__test_csgo_mongodb_prepopulate__')

  test('should get CSGO maps from DB', async () => {
    // await MongooseModelCSGOMap.create([
    //   {
    //     internal_id: 'MIRAGE',
    //     name: 'Mirage',
    //     mode: 'de',
    //     active: true
    //   },
    //   {
    //     internal_id: 'NUKE',
    //     name: 'Nuke',
    //     mode: 'de',
    //     active: true
    //   }
    // ])

    const dbItems: MongooseDocumentExtensionsCSGO.IMongooseMap[] = await MongooseModelCSGOMap.find(
      {}
    )

    const itemsManager: IGameDataManager<ICSGODocuments.Map> = gameDataManager(
      (dbItems as unknown) as ICSGODocuments.Map[]
    )

    expect(itemsManager.hasID('MIRAGE')).toEqual(true)
  })

  test('should get CSGO items from DB', async () => {
    // await MongooseModelCSGOItem.create([
    //   {
    //     internal_id: 'DUALBERETTAS',
    //     name: 'Dual Berettas',
    //     cost: 400,
    //     side: 'UNI',
    //     slot: 'secondary'
    //   },
    //   {
    //     internal_id: 'MP7',
    //     name: 'MP-7',
    //     cost: 1400,
    //     side: 'UNI',
    //     slot: 'primary'
    //   }
    // ])

    const dbItems: MongooseDocumentExtensionsCSGO.IMongooseItem[] = await MongooseModelCSGOItem.find(
      {}
    )

    const itemsManager: IGameDataManager<ICSGODocuments.Item> = gameDataManager(
      (dbItems as unknown) as ICSGODocuments.Item[]
    )

    expect(itemsManager.hasID('MP7')).toEqual(true)
  })
})
