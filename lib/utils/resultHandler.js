"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export default class ResultHandler<T> implements IResultHandler<T> {
//   constructor(public scenarios: { [scenario: string]: () => boolean | Error }) {}
//   handle(scenario: T): boolean | Error {
//     return this.scenarios[scenario.toString()]()
//   }
// }
function resultHandler(scenarios) {
    function handle(scenario) {
        return scenarios[scenario.toString()]();
    }
    return {
        scenarios: scenarios,
        handle: handle
    };
}
exports.default = resultHandler;
