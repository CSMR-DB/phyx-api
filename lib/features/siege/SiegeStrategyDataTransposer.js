"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var objectToArray_1 = tslib_1.__importDefault(require("~src/utils/objectToArray"));
var SiegeStrategyDataReducer = /** ~class */ (function () {
    function SiegeStrategyDataReducer(strategy) {
        var _this = this;
        this.strategy = strategy;
        this._operators = [];
        this._operatorIDs = [];
        this._uniqueOperators = [];
        this._uniqueOperatorIDs = [];
        var players = strategy.team.players;
        var playersArray = objectToArray_1.default(players);
        playersArray.map(function (_a) {
            var operator = _a.operator;
            _this._operators.push(operator);
        });
        // this._uniqueOperators = Array.from(new Set(this._operators.map((operator) => JSON.stringify(operator)))).map((operator) =>
        //   JSON.parse(operator)
        // )
        playersArray.map(function (_a) {
            var operator = _a.operator;
            return _this._operatorIDs.push(operator.id);
        });
        // this._uniqueOperatorIDs = this._uniqueOperators.map((operator) => operator.id)
        this._uniqueOperatorIDs = Array.from(new Set(this._operatorIDs));
    }
    Object.defineProperty(SiegeStrategyDataReducer.prototype, "operators", {
        get: function () {
            return this._operators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiegeStrategyDataReducer.prototype, "operatorIDs", {
        get: function () {
            return this._operatorIDs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiegeStrategyDataReducer.prototype, "uniqueOperators", {
        get: function () {
            return this._uniqueOperators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SiegeStrategyDataReducer.prototype, "uniqueOperatorIDs", {
        get: function () {
            return this._uniqueOperatorIDs;
        },
        enumerable: true,
        configurable: true
    });
    return SiegeStrategyDataReducer;
}());
exports.default = SiegeStrategyDataReducer;
