import { csgoStrategyValidatorMock } from './csgoStrategyValidator.mock'
import { csgoStrategyValid } from '../../mocks/csgoStrategyValid.mock'

describe('csgoStrategyValidator', () => {
  test('should return valid when supplied with a valid strategy', async () => {
    await expect(csgoStrategyValidatorMock(csgoStrategyValid)).resolves.toEqual(
      {
        result: true,
        errors: []
      }
    )
  })
})
