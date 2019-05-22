"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemsValidator = /** ~class */ (function () {
    function ItemsValidator(strategy, gameDataManager, strategyDataTransposer, resultHandler) {
        this.strategy = strategy;
        this.gameDataManager = gameDataManager;
        this.strategyDataTransposer = strategyDataTransposer;
        this.resultHandler = resultHandler;
        this._results = [];
        this._uniqueIDs = this.strategyDataTransposer.uniqueIDs;
    }
    ItemsValidator.prototype._validateOne = function (itemID) {
        this._results.push(this.gameDataManager.hasID(itemID));
    };
    ItemsValidator.prototype._validateAll = function () {
        var _this = this;
        this._uniqueIDs.map(function (itemID) {
            _this._validateOne(itemID);
        });
    };
    Object.defineProperty(ItemsValidator.prototype, "result", {
        get: function () {
            return !(this._results.indexOf(false) > -1);
        },
        enumerable: true,
        configurable: true
    });
    ItemsValidator.prototype.execute = function () {
        this._validateAll();
        return this.result;
    };
    return ItemsValidator;
}());
exports.default = ItemsValidator;
function itemsValidator(strategy, gameDataManager, strategyDataTransposer) {
    function execute() {
        var uniqueIDs = strategyDataTransposer.uniqueIDs;
        var results = [];
        uniqueIDs.map(function (id) {
            results.push(gameDataManager.hasID(id));
        });
        return !(results.indexOf(false) > -1);
    }
    return Object.freeze({ strategy: strategy, execute: execute });
}
exports.itemsValidator = itemsValidator;
