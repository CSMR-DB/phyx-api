import { strategyValidator } from './strategyValidator'
import { sideValidator } from './validator-modules/sideValidator'
import { itemsValidator } from './validator-modules/itemsValidator'
import { csgoCostValidator } from '~src/features/csgo/validation/csgoCostValidator'

import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'

import csgoStrategyValid from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import csgoStrategyInvalidCost from '~src/features/csgo/mocks/csgoStrategyInvalidCost.mock'
import csgoStrategyInvalidSide from '~src/features/csgo/mocks/csgoStrategyInvalidSide.mock'
import csgoStrategyInvalidItems from '~src/features/csgo/mocks/csgoStrategyInvalidItems.mock'
import { ICSGOStrategy, ICSGOItem } from '~src/features/csgo/interfaces/ICSGOStrategy.interface'
import { siegeStrategyValid } from '~src/features/siege/mocks/siegeStrategyValid.mock'
import { gameDataManager, IGameDataManager } from '~src/services/gameDataManager'
import { ISiegeStrategy } from '~src/features/siege/ISiegeStrategyModel.interface'
import { siegeStrategyDataTransposer } from '~src/features/siege/siegeStrategyDataTransposer'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { IStrategyDataTransposer } from './validator-modules/IStrategyDataTransposer.interface'
import { R6SIEGEFACTORY, R6SIEGE } from '~src/features/siege/data/r6siege.factory'

describe('strategyValidator()', () => {
  const csgoDataManager: IGameDataManager<ICSGOItem, keyof ICSGOItem> = gameDataManager<ICSGOItem, keyof ICSGOItem>(
    CSGOFACTORY.getItems()
  )

  // tslint:disable-next-line: typedef
  const csgoDataReducer: (strategy: ICSGOStrategy) => IStrategyDataTransposer = (strategy: ICSGOStrategy) =>
    csgoStrategyDataTransposer(strategy)

  const siegeDataManager: IGameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator> = gameDataManager(
    R6SIEGEFACTORY.getOperators()
  )

  // tslint:disable-next-line: typedef
  const siegeDataReducer = (strategy: ISiegeStrategy) => siegeStrategyDataTransposer(strategy)

  const testCases: any[] = [
    {
      strategy: csgoStrategyValid,
      dataManager: csgoDataManager,
      dataReducer: csgoDataReducer,
      expected: {
        errors: [],
        result: true
      }
    },
    {
      strategy: csgoStrategyInvalidCost,
      dataManager: csgoDataManager,
      dataReducer: csgoDataReducer,
      expected: {
        errors: [ Error('Cookie has spent too much on their loadout') ],
        result: false
      }
    },
    {
      strategy: csgoStrategyInvalidSide,
      dataManager: csgoDataManager,
      dataReducer: csgoDataReducer,
      expected: {
        errors: [
          Error('Cookie has spent too much on their loadout'),
          Error('P2000 is not equippable on ATK side'),
          Error('M4A4 is not equippable on ATK side')
        ],
        result: false
      }
    },
    {
      strategy: csgoStrategyInvalidItems,
      dataManager: csgoDataManager,
      dataReducer: csgoDataReducer,
      expected: {
        result: false,
        errors: [
          Error('GLOCKZZZZ18 does not exist'),
          Error('PHYD has spent too much on their loadout'),
          Error('GLOCKZZZZ18 is not equippable on ATK side'),
          Error('AUG is not equippable on ATK side')
        ]
      }
    }
    // {
    //   strategy: siegeStrategyValid,
    //   dataManager: siegeDataManager,
    //   dataReducer: siegeDataReducer,
    //   expected: true
    // }
  ]

  // tslint:disable-next-line: typedef
  test.each(testCases)('strategyValidator() case', async ({ strategy, dataManager, dataReducer, expected }) => {
    await expect(
      strategyValidator([
        itemsValidator(strategy, dataManager, dataReducer(strategy)),
        csgoCostValidator(strategy, dataManager),
        sideValidator(strategy, dataReducer(strategy), dataManager)
      ]).execute()
    ).resolves.toEqual(expected)
  })
})
