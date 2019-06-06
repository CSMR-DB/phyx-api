import { siegeStrategyDataTransposer } from './siegeStrategyDataTransposer'
import { siegeStrategyValid } from '~src/features/siege/mocks/siegeStrategyValid.mock'

describe('StrategyItemsReducer', () => {
  test('should return an array (from Set) of unique Operator IDs', () => {
    expect(
      siegeStrategyDataTransposer(siegeStrategyValid).uniqueOperatorIDs()
    ).toEqual([ 'ALIBI', 'BANDIT', 'CASTLE', 'DOC', 'FROST' ])
  })
})
