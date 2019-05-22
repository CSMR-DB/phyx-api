import { IValidator } from './IValidator.interface'
// import { IResultHandler } from '~src/utils/resultHandler'
import { isValidated } from './validator-modules/isValidated'

interface IStrategyValidator {
  readonly validators: IValidator[]

  execute(): boolean
}

/**
 * Runs all supplied Validators in order and determines if a Strategy is qualified to be submitted to storage.
 * ~param validators: Array of all Validators to run, exposing an `execute()` method to comply with the IValidator contract.
 * ~returns A `boolean` value
 */
export function strategyValidator(validators: IValidator[]): IValidator {
  async function execute(): Promise<{ result: boolean; errors: Error[] | [] }> {
    const resultPromises: Promise<{ result: boolean; errors: Error[] | [] }>[] = validators.map((validator: IValidator) =>
      validator.execute()
    )

    // const errors: Error[] = await Promise.all(resultPromises)
    //   .then((values: { result: boolean; errors: Error[] }[]) => {
    //     return values.map(({ errors }) => errors).reduce((e) => e)
    //   })
    //   .catch((err: Error) => {
    //     console.log(err)

    //     return [] as Error[]
    //   })

    // const results: { result: boolean; errors: Error[] }[] = await Promise.all(resultPromises)
    //   .then((values: { result: boolean; errors: Error[] }[]) => values)
    //   .catch((err: Error) => {
    //     console.log(err)

    //     return [ { result: false, errors } ]
    //   })

    const results: boolean[] = []
    const errors: Error[] = []

    await Promise.all(resultPromises).then((promises: { result: boolean; errors: Error[] | [] }[]) => {
      promises.map((promise: { result: boolean; errors: Error[] | [] }) => {
        results.push(promise.result)
        errors.push(...promise.errors)
      })
    })

    const result: boolean = isValidated(results.map((r: boolean) => r))

    return { result, errors }
  }

  return Object.freeze({ execute })
}
