export interface IResultHandler<T> {
  scenarios: { [scenario: string]: () => boolean | Error }

  handle: (scenario: T) => boolean | Error
}

export function resultHandler<T>(scenarios: {
  [scenario: string]: () => boolean | Error
}): IResultHandler<T> {
  function handle(scenario: T): boolean | Error {
    return scenarios[scenario.toString()]()
  }

  return {
    scenarios,
    handle
  }
}
