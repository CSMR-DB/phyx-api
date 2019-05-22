"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sumArray_1 = tslib_1.__importDefault(require("~src/utils/sumArray"));
var objectToArray_1 = tslib_1.__importDefault(require("~src/utils/objectToArray"));
var CSGOCostValidator = /** ~class */ (function () {
    function CSGOCostValidator(strategy, gameDataManager, resultHandler) {
        this.strategy = strategy;
        this.gameDataManager = gameDataManager;
        this.resultHandler = resultHandler;
        this._results = [];
        this._players = objectToArray_1.default(strategy.team.players);
        this._budget = strategy.budget;
    }
    CSGOCostValidator.prototype._validateOne = function (player) {
        var _this = this;
        var _a = player.loadout, primary = _a.primary, secondary = _a.secondary, gear = _a.gear, utilities = _a.utilities;
        var hasOrEmptyFn = function (item) { return (item ? item : []); };
        var allPlayerItems = [
            hasOrEmptyFn(primary),
            hasOrEmptyFn(secondary)
        ].concat(hasOrEmptyFn(gear), hasOrEmptyFn(utilities));
        var allPlayerItemsCost = allPlayerItems.map(function (item) { return _this.gameDataManager.getField(item.id, 'cost', 0); });
        var totalPlayerCost = sumArray_1.default(allPlayerItemsCost);
        var withinBudget = totalPlayerCost <= this._budget;
        this._results.push(withinBudget);
    };
    Object.defineProperty(CSGOCostValidator.prototype, "result", {
        get: function () {
            return !(this._results.indexOf(false) > -1);
        },
        enumerable: true,
        configurable: true
    });
    CSGOCostValidator.prototype.execute = function () {
        var _this = this;
        this._players.map(function (player) { return _this._validateOne(player); });
        return this.result;
    };
    return CSGOCostValidator;
}());
exports.default = CSGOCostValidator;
