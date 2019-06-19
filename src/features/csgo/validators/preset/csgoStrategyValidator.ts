import { ICSGODocuments } from '../../interfaces/ICSGODocuments.interface'
import { strategyValidator } from '~src/services/validators/strategyValidator'
import { itemsValidator } from '~src/services/validators/modules/itemsValidator'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { IStrategyDataTransposer } from '~src/services/validators/modules/IStrategyDataTransposer.interface'
import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'
import { csgoCostValidator } from '../modules/csgoCostValidator'
import { sideValidator } from '~src/services/validators/modules/sideValidator'
import { ValidatorReturnType } from '~src/services/validators/IValidator.interface'
import { slotValidator } from '~src/services/validators/modules/slotValidator'
import { mapValidator } from '~src/services/validators/modules/mapValidator'

export const csgoStrategyValidator: (
  strategy: ICSGODocuments.Strategy
) => Promise<ValidatorReturnType> = async (
  strategy: ICSGODocuments.Strategy
): Promise<ValidatorReturnType> => {
  const dataManager_items: IGameDataManager<
    ICSGODocuments.Item
  > = gameDataManager<ICSGODocuments.Item>(CSGOFACTORY.getItems())

  const dataManager_maps: IGameDataManager<
    ICSGODocuments.Map
  > = gameDataManager<ICSGODocuments.Map>(CSGOFACTORY.getMaps())

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
