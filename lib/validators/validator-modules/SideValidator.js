"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SideValidator = /** ~class */ (function () {
    function SideValidator(strategy, strategyDataTransposer, resultHandler) {
        this.strategy = strategy;
        this.strategyDataTransposer = strategyDataTransposer;
        this.resultHandler = resultHandler;
        this._uniqueSidesSet = new Set(this.strategyDataTransposer.uniqueSides.concat([strategy.side]));
    }
    Object.defineProperty(SideValidator.prototype, "result", {
        get: function () {
            return this._uniqueSidesSet.size <= 1;
        },
        enumerable: true,
        configurable: true
    });
    SideValidator.prototype.execute = function () {
        return this.result;
    };
    return SideValidator;
}());
exports.default = SideValidator;
function sideValidator(strategy, strategyDataTransposer
// resultHandler?: IResultHandler<number>
) {
    function execute() {
        var sideSet = new Set(strategyDataTransposer.uniqueSides.concat([strategy.side]));
        return sideSet.size <= 1;
    }
    return Object.freeze({ strategy: strategy, execute: execute });
}
exports.sideValidator = sideValidator;
