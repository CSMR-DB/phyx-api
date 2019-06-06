import { siegeOperatorValidator } from './siegeOperatorValidator'
import { gameDataManager } from '~src/services/gameDataManager'
import { ISiegeOperator } from '~src/features/siege/ISiegeStrategyModel.interface'
import { siegeStrategyDataTransposer } from '../siegeStrategyDataTransposer'
import { R6SIEGEFACTORY, R6SIEGE } from '../data/r6siege.factory'
import { siegeStrategyValid } from '../mocks/siegeStrategyValid.mock'
import { siegeStrategyInvalidOperatorConfig } from '../mocks/siegeStrategyInvalidOperatorConfig.mock'
import { siegeStrategyDefenseValid } from '../mocks/siegeStrategyDefenseValid.mock'

describe('siegeOperatorValidator()', () => {
  test('should validate an Operator with a good loadout configuration', async () => {
    await expect(
      siegeOperatorValidator(
        // siegeStrategyValid,
        gameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>(
          R6SIEGEFACTORY.getOperators()
        ),
        siegeStrategyDataTransposer(siegeStrategyValid)
      ).execute()
    ).resolves.toEqual(true)
  })

  test('should invalidate an Operator with a bad loadout configuration', async () => {
    await expect(
      siegeOperatorValidator(
        // siegeStrategyInvalidOperatorConfig,
        gameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>(
          R6SIEGEFACTORY.getOperators()
        ),
        siegeStrategyDataTransposer(siegeStrategyInvalidOperatorConfig)
      ).execute()
    ).resolves.toEqual(false)
  })

  test('should validate an Operator with a good loadout configuration', async () => {
    await expect(
      siegeOperatorValidator(
        // siegeStrategyDefenseValid,
        gameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>(
          R6SIEGEFACTORY.getOperators()
        ),
        siegeStrategyDataTransposer(siegeStrategyDefenseValid)
      ).execute()
    ).resolves.toEqual(true)
  })
})
