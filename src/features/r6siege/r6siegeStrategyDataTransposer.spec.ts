import { siegeStrategyDataTransposer } from './r6siegeStrategyDataTransposer'
import { siegeStrategyValid } from '~src/features/r6siege/mocks/r6siegeStrategyValid.mock'

describe('StrategyItemsReducer', () => {
  test('should return an array (from Set) of unique Operator IDs', () => {
    expect(
      siegeStrategyDataTransposer(siegeStrategyValid).uniqueOperatorIDs
    ).toEqual([ 'ALIBI', 'BANDIT', 'CASTLE', 'DOC', 'FROST' ])
  })
})
