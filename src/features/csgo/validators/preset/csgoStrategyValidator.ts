import {
  ICSGODocuments,
  MongooseDocumentExtensionsCSGO
} from '../../interfaces'
import { strategyValidator } from '~src/services/validators/strategyValidator'
import { itemsValidator } from '~src/services/validators/modules/itemsValidator'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoCostValidator } from '../modules/csgoCostValidator'
import { sideValidator } from '~src/services/validators/modules/sideValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { slotValidator } from '~src/services/validators/modules/slotValidator'
import { mapValidator } from '~src/services/validators/modules/mapValidator'
import { MongooseModelCSGOItem } from '../../mongodb/csgo-item.mongodb.model'
import { MongooseModelCSGOMap } from '../../mongodb/csgo-map.mongodb.model'
import { Document } from 'mongoose'

export const csgoStrategyValidator: (
  strategy: ICSGODocuments.Input.Strategy
) => Promise<ValidatorReturnType> = async (
  strategy: ICSGODocuments.Input.Strategy
): Promise<ValidatorReturnType> => {
  const dataManager_items: IGameDataManager<
    MongooseDocumentExtensionsCSGO.Output.IMongooseItem & Document
  > = gameDataManager(await MongooseModelCSGOItem.find({}))

  const dataManager_maps: IGameDataManager<
    MongooseDocumentExtensionsCSGO.Output.IMongooseMap & Document
  > = gameDataManager(await MongooseModelCSGOMap.find({}))

  const dataReducer: IStrategyDataTransposer = csgoStrategyDataTransposer(
    strategy
  )

  try {
    return await strategyValidator(
      itemsValidator(dataManager_items, dataReducer),
      csgoCostValidator(strategy, dataManager_items),
      sideValidator(dataManager_items, dataReducer),
      slotValidator(dataManager_items, dataReducer),
      mapValidator(dataManager_maps, dataReducer)
    ).execute()
  } catch (e) {
    return { result: false, errors: [ e ] }
  }
}
