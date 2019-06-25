import { csgoStrategyDataTransposer } from './csgoStrategyDataTransposer'
import { csgoStrategyValid } from '~src/features/csgo/mocks/csgoStrategyValid.mock'
import { csgoStrategyInvalidItems } from './mocks/csgoStrategyInvalidItems.mock'
import { csgoStrategyInvalidSlots } from './mocks/csgoStrategyInvalidSlots.mock'

describe('CSGOStrategyDataTransposer()', () => {
  test('should reduce items to a unique set of IDs', () => {
    expect(csgoStrategyDataTransposer(csgoStrategyValid).uniqueIDs).toContain(
      'AWP'
    )
  })

  test('should reduce items to a unique set of IDs', () => {
    expect(
      csgoStrategyDataTransposer(csgoStrategyInvalidItems).uniqueIDs
    ).toContain('AUG')
  })

  test('should create an object combining itemIDs with their slots as submitted', () => {
    expect(csgoStrategyDataTransposer(csgoStrategyInvalidSlots).slots).toEqual(
      expect.arrayContaining([ { slot: 'secondary', internal_id: 'AWP' } ])
    )
  })
})
