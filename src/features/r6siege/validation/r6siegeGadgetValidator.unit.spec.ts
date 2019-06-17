import { siegeGadgetValidator } from './r6siegeGadgetValidator'
import { siegeStrategyDefenseValid } from '../mocks/r6siegeStrategyDefenseValid.mock'
import { gameDataManager } from '~src/services/gameDataManager'
import { R6SIEGEFACTORY } from '../data/r6siege.factory'
import { siegeStrategyDataTransposer } from '../r6siegeStrategyDataTransposer'

describe('siegeGadgetValidator', () => {
  test('should validate amount and deployability', async () => {
    await expect(
      siegeGadgetValidator(
        gameDataManager(R6SIEGEFACTORY.getOperators()),
        siegeStrategyDataTransposer(siegeStrategyDefenseValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })
})
