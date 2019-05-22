import { siegeReinforcementValidator } from './siegeReinforcementValidator'
import { siegeStrategyDefenseValid } from '../mocks/siegeStrategyDefenseValid.mock'
import { gameDataManager } from '~src/services/gameDataManager'
import { R6SIEGE, R6SIEGEFACTORY } from '../data/r6siege.factory'
import { siegeStrategyDataTransposer } from '../siegeStrategyDataTransposer'

describe('siegeReinforcementValidator', () => {
  test('should validate amount and deployability', async () => {
    await expect(
      siegeReinforcementValidator(
        siegeStrategyDefenseValid,
        gameDataManager<R6SIEGE.IMap, keyof R6SIEGE.IMap>(R6SIEGEFACTORY.getMaps()),
        siegeStrategyDataTransposer(siegeStrategyDefenseValid)
      ).execute()
    ).resolves.toEqual(true)
  })
})
