import { ICSGODocuments } from '../../interfaces'
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
import { csgoItems } from '../../data/csgoItems'
import { csgoMaps } from '../../data/csgoMaps'

export const csgoStrategyValidatorMock: (
  strategy: ICSGODocuments.Input.Strategy
) => Promise<ValidatorReturnType> = async (
  strategy: ICSGODocuments.Input.Strategy
): Promise<ValidatorReturnType> => {
  const dataManager_items: IGameDataManager<
    ICSGODocuments.Output.Item
  > = gameDataManager(csgoItems)

  const dataManager_maps: IGameDataManager<
    ICSGODocuments.Output.Map
  > = gameDataManager(csgoMaps)

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
