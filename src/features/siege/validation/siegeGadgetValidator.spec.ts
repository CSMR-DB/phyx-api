import { siegeGadgetValidator } from './siegeGadgetValidator'
import { siegeStrategyDefenseValid } from '../mocks/siegeStrategyDefenseValid.mock'
import { gameDataManager } from '~src/services/gameDataManager'
import { R6SIEGE, R6SIEGEFACTORY } from '../data/r6siege.factory'
import { siegeStrategyDataTransposer } from '../siegeStrategyDataTransposer'

describe('siegeGadgetValidator', () => {
  test('should validate amount and deployability', async () => {
    await expect(
      siegeGadgetValidator(
        gameDataManager<R6SIEGE.IOperator, keyof R6SIEGE.IOperator>(
          R6SIEGEFACTORY.getOperators()
        ),
        siegeStrategyDataTransposer(siegeStrategyDefenseValid)
      ).execute()
    ).resolves.toEqual(true)
  })
})
