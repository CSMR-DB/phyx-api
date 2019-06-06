import { siegeReinforcementValidator } from './r6siegeReinforcementValidator'
import { siegeStrategyDefenseValid } from '../mocks/r6siegeStrategyDefenseValid.mock'
import { gameDataManager } from '~src/services/gameDataManager'
import { R6SIEGEFACTORY } from '../data/r6siege.factory'
import { siegeStrategyDataTransposer } from '../r6siegeStrategyDataTransposer'

describe('siegeReinforcementValidator', () => {
  test('should validate amount and deployability', async () => {
    await expect(
      siegeReinforcementValidator(
        gameDataManager(R6SIEGEFACTORY.getMaps()),
        siegeStrategyDataTransposer(siegeStrategyDefenseValid)
      ).execute()
    ).resolves.toEqual({ result: true, errors: [] })
  })
})
