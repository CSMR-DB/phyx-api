"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resultHandler(scenarios) {
    function handle(scenario) {
        return scenarios[scenario.toString()]();
    }
    return {
        scenarios,
        handle
    };
}
exports.resultHandler = resultHandler;
