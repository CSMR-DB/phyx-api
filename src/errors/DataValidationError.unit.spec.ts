import { DataValidationError } from './DataValidationError'

describe('ValidationError()', () => {
  interface IValidationError {
    game: string
    item: string
    reason: string
    validator: string
  }

  const validationErrors: IValidationError[] = [
    {
      game: 'CSGO',
      item: 'P2001',
      reason: 'is not a valid item',
      validator: 'ItemValidator'
    },
    {
      game: 'R6SIEGE',
      item: 'Mirage',
      reason: 'is not a valid operator',
      validator: 'OperatorValidator'
    }
  ]

  test.each(validationErrors)(
    'should create a custom Error object',
    ({ game, item, reason, validator }: IValidationError) => {
      const testError: DataValidationError = new DataValidationError(
        game,
        item,
        reason,
        validator
      )
      try {
        throw testError
        expect(true).toBe(false) // In case the throw itself fails, make sure the test fails. This code will otherwise be unreachable
      } catch (e) {
        expect(e.message).toBe(`[${game}] - ${item} ${reason} (${validator})`)
        expect(e.status).toBe(418)
        expect(Math.floor(new Date(e.date).getTime() / 1000)).toBe(
          Math.floor(new Date().getTime() / 1000)
        )
      }
    }
  )

  test('should propagate a nested error', () => {
    const testError: DataValidationError = new DataValidationError(
      'CSGO',
      'USPZ',
      'is not a valid item',
      'itemValidator()'
    )
    function firstLevelFunction(): void {
      try {
        // tslint:disable-next-line: no-void-expression
        expect(secondLevelFunction()).toThrow()
      } catch (e) {
        expect(e.message).toBe(
          `[CSGO] - USPZ is not a valid item (itemValidator())`
        )
        expect(e.status).toBe(418)
        expect(Math.floor(new Date(e.date).getTime() / 1000)).toBe(
          Math.floor(new Date().getTime() / 1000)
        )
      }
    }

    function secondLevelFunction(): void {
      try {
        throw testError
        expect(true).toBe(false) // In case the throw itself fails, make sure the test fails. This code will otherwise be unreachable
      } catch (e) {
        expect(e.message).toBe(
          `[CSGO] - USPZ is not a valid item (itemValidator())`
        )
        expect(e.status).toBe(418)
        expect(Math.floor(new Date(e.date).getTime() / 1000)).toBe(
          Math.floor(new Date().getTime() / 1000)
        )
        throw e
      }
    }

    firstLevelFunction()
  })
})
