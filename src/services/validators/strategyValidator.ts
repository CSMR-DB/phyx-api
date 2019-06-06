import { IValidator } from './IValidator.interface'
import { isValidated } from './validator-modules/isValidated'

type ValidatorReturnType = { result: boolean; errors: Error[] | [] }

/**
 * Runs all supplied Validators in order and determines if a Strategy is qualified to be submitted to storage.
 * ~param validators: Array of all Validators to run, exposing an `execute()` method to comply with the IValidator contract.
 * ~returns A `boolean` value
 */
export function strategyValidator(validators: IValidator[]): IValidator {
  async function execute(): Promise<ValidatorReturnType> {
    const resultPromises: Promise<ValidatorReturnType>[] = validators.map(
      (validator: IValidator) => validator.execute()
    )

    const results: boolean[] = []
    const errors: Error[] = []

    await Promise.all(resultPromises).then(
      (promises: ValidatorReturnType[]) => {
        promises.map((promise: ValidatorReturnType) => {
          results.push(promise.result)
          errors.push(...promise.errors)
        })
      }
    )

    const result: boolean = isValidated(Array.from(new Set(results)))

    return { result, errors }
  }

  return Object.freeze({ execute })
}
