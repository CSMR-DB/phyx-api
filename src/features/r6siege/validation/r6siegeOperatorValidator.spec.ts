import { siegeOperatorValidator } from './r6siegeOperatorValidator'
import { gameDataManager } from '~src/services/gameDataManager'
import { siegeStrategyDataTransposer } from '../r6siegeStrategyDataTransposer'
import { R6SIEGEFACTORY } from '../data/r6siege.factory'
import { siegeStrategyValid } from '../mocks/r6siegeStrategyValid.mock'
import { siegeStrategyInvalidOperatorConfig } from '../mocks/r6siegeStrategyInvalidOperatorConfig.mock'
import { siegeStrategyDefenseValid } from '../mocks/r6siegeStrategyDefenseValid.mock'

describe('siegeOperatorValidator()', () => {
  test('should validate an Operator with a good loadout configuration', async () => {
    await expect(
      siegeOperatorValidator(
        gameDataManager(R6SIEGEFACTORY.getOperators()),
        siegeStrategyDataTransposer(siegeStrategyValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })

  test('should invalidate an Operator with a bad loadout configuration', async () => {
    await expect(
      siegeOperatorValidator(
        gameDataManager(R6SIEGEFACTORY.getOperators()),
        siegeStrategyDataTransposer(siegeStrategyInvalidOperatorConfig)
      ).execute()
    ).resolves.toEqual({
      result: false,
      errors: [ Error('ALIBI is invalid: P12') ]
    })
  })

  test('should validate an Operator with a good loadout configuration', async () => {
    await expect(
      siegeOperatorValidator(
        gameDataManager(R6SIEGEFACTORY.getOperators()),
        siegeStrategyDataTransposer(siegeStrategyDefenseValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })
})
