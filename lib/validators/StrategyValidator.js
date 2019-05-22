"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StrategyValidator = /** ~class */ (function () {
    function StrategyValidator(strategy, validators, resultHandler) {
        this.strategy = strategy;
        this.validators = validators;
        this.resultHandler = resultHandler;
        this._results = Array();
    }
    StrategyValidator.prototype._executeOne = function (validator) {
        this._results.push(validator.execute());
    };
    StrategyValidator.prototype._executeAll = function () {
        var _this = this;
        this.validators.map(function (validator) {
            _this._executeOne(validator);
        });
    };
    Object.defineProperty(StrategyValidator.prototype, "result", {
        get: function () {
            return !(this._results.indexOf(false) > -1);
        },
        enumerable: true,
        configurable: true
    });
    StrategyValidator.prototype.execute = function () {
        this._executeAll();
        return this.result;
    };
    return StrategyValidator;
}());
exports.default = StrategyValidator;
/**
 * Runs all supplied Validators in order and determines if a Strategy is qualified to be submitted to storage.
 * ~param validators: Array of all Validators to run, exposing an `execute()` method to comply with the IValidator contract.
 * ~returns A `boolean` value
 */
function strategyValidator(validators) {
    function execute() {
        var results = [];
        validators.map(function (validator) {
            results.push(validator.execute());
        });
        return !(results.indexOf(false) > -1);
    }
    return Object.freeze({ execute: execute });
}
exports.strategyValidator = strategyValidator;
