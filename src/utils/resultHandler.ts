export interface IResultHandler<T> {
  scenarios: { [scenario: string]: () => boolean | Error }

  handle: (scenario: T) => boolean | Error
}

// export default class ResultHandler<T> implements IResultHandler<T> {
//   constructor(public scenarios: { [scenario: string]: () => boolean | Error }) {}

//   handle(scenario: T): boolean | Error {
//     return this.scenarios[scenario.toString()]()
//   }
// }

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
