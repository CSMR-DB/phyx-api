import { strategyValidator } from './strategyValidator'
import { sideValidator } from './modules/sideValidator'
import { itemsValidator } from './modules/itemsValidator'
import { csgoCostValidator } from '~src/features/csgo/validators/modules/csgoCostValidator'

import { csgoStrategyDataTransposer } from '~src/features/csgo/csgoStrategyDataTransposer'

import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidCost } from '~src/features/csgo/mocks/csgoStrategyInvalidCost.mock'
import { csgoStrategyInvalidSide } from '~src/features/csgo/mocks/csgoStrategyInvalidSide.mock'
import { csgoStrategyInvalidItems } from '~src/features/csgo/mocks/csgoStrategyInvalidItems.mock'
import { ICSGOStrategyDocument } from '~src/features/csgo/interfaces/ICSGOStrategyDocument.interface'
import { siegeStrategyValid } from '~src/features/r6siege/mocks/r6siegeStrategyValid.mock'
import {
  gameDataManager,
  IGameDataManager
} from '~src/services/gameDataManager'
import { IR6SiegeStrategy } from '~src/features/r6siege/IR6SiegeStrategyModel.interface'
import { siegeStrategyDataTransposer } from '~src/features/r6siege/r6siegeStrategyDataTransposer'
import { CSGOFACTORY } from '~src/features/csgo/data/dataFactory'
import { IStrategyDataTransposer } from './modules/IStrategyDataTransposer.interface'
import {
  R6SIEGEFACTORY,
  R6SIEGE
} from '~src/features/r6siege/data/r6siege.factory'
import { IValidator } from './IValidator.interface'

describe('strategyValidator()', () => {
  const csgoDataManager: IGameDataManager<
    ICSGOStrategyDocument.Item
  > = gameDataManager<ICSGOStrategyDocument.Item>(CSGOFACTORY.getItems())

  // tslint:disable-next-line: typedef
  const csgoDataReducer: (
    strategy: ICSGOStrategyDocument.Strategy
  ) => IStrategyDataTransposer = (strategy: ICSGOStrategyDocument.Strategy) =>
    csgoStrategyDataTransposer(strategy)

  const siegeDataManager: IGameDataManager<R6SIEGE.IOperator> = gameDataManager(
    R6SIEGEFACTORY.getOperators()
  )

  // tslint:disable-next-line: typedef
  const siegeDataReducer = (strategy: IR6SiegeStrategy) =>
    siegeStrategyDataTransposer(strategy)

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
  ]

  const mockSideValidator: {
    execute: () => Promise<{ errors: Error[]; result: boolean }>
  } = {
    execute: () =>
      Promise.resolve({
        errors: [],
        result: true
      })
  }

  const mockItemsValidator: {
    execute: () => Promise<{ errors: Error[]; result: boolean }>
  } = {
    execute: () =>
      Promise.resolve({
        errors: [ Error('AUG is not equippable on ATK side') ],
        result: false
      })
  }

  const mockExpected: { result: boolean; errors: Error[] } = {
    result: false,
    errors: [ Error('AUG is not equippable on ATK side') ]
  }

  // tslint:disable-next-line: typedef
  test.each(testCases)(
    'strategyValidator() case',
    async ({ strategy, dataManager, dataReducer, expected }: any) => {
      // jest // < Cannot assign to 'execute' because of Object.freeze({...})
      //   .spyOn(
      //     sideValidator(strategy, dataReducer(strategy), dataManager),
      //     "execute"
      //   )
      //   .mockReturnValue(
      //     Promise.resolve({
      //       errors: [Error("M4A4 is not equippable on ATK side")],
      //       result: false
      //     })
      //   )
      const configuredStrategyValidator: IValidator = strategyValidator(
        itemsValidator(dataManager, dataReducer(strategy)),
        csgoCostValidator(strategy, dataManager),
        sideValidator(dataManager, dataReducer(strategy))
      )

      await expect(configuredStrategyValidator.execute()).resolves.toEqual(
        expected
      )
    }
  )

  test('strategyValidator() mocked', async () => {
    await expect(
      strategyValidator(mockSideValidator, mockItemsValidator).execute()
    ).resolves.toEqual(mockExpected)
  })
})
