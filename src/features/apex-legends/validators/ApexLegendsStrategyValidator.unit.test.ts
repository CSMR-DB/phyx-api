import { ApexLegendsContainer } from '../di/ApexLegendsDI'
import { apexLegendsStrategyValid } from '../tests/apexLegendsStrategyValid'
import { ApexLegendsStrategyValidator } from './ApexLegendsStrategyValidator'

describe('ApexLegendsTeamValidator, via Injector', () => {
  test('should validate a valid team', async () => {
    const strategyValidator: ApexLegendsStrategyValidator = ApexLegendsContainer.resolve(
      ApexLegendsStrategyValidator
    )

    await expect(
      strategyValidator.execute(apexLegendsStrategyValid)
    ).resolves.toEqual({
      result: true,
      errors: []
    })
  })
})
