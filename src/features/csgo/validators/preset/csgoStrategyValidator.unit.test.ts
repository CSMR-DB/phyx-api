import { csgoStrategyValidator } from './csgoStrategyValidator'
import { csgoStrategyValid } from '../../mocks/csgoStrategyValid.mock'

describe('csgoStrategyValidator', () => {
  test('should return valid when supplied with a valid strategy', async () => {
    await expect(csgoStrategyValidator(csgoStrategyValid)).resolves.toEqual({
      result: true,
      errors: []
    })
  })
})
