"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var objectToArray_1 = tslib_1.__importDefault(require("~src/utils/objectToArray"));
var mapSpecificKey_1 = tslib_1.__importDefault(require("~src/utils/mapSpecificKey"));
var CSGOSTrategyDataTransposer = /** ~class */ (function () {
    function CSGOSTrategyDataTransposer(strategy, gameItemsManager) {
        var _this = this;
        this.strategy = strategy;
        this.gameItemsManager = gameItemsManager;
        this._items = [];
        this._uniqueIDs = [];
        this._uniqueSides = [];
        var players = strategy.team.players;
        var playersArray = objectToArray_1.default(players);
        var loadoutArray = mapSpecificKey_1.default(playersArray, 'loadout');
        loadoutArray.map(function (_a) {
            var primary = _a.primary, secondary = _a.secondary, gear = _a.gear, utilities = _a.utilities;
            var _b;
            (_b = _this._items).push.apply(_b, [
                primary || {},
                secondary
            ].concat((gear || []), (utilities || [])));
        });
        this._uniqueIDs = Array.from(new Set(this._items.map(function (item) { return item.id; })));
        this._uniqueItems = this._uniqueIDs.map(function (id) { return _this.gameItemsManager.getOneById(id); });
        this._uniqueSides = Array.from(new Set(this._uniqueIDs
            .map(function (id) {
            var item = _this.gameItemsManager.getOneById(id);
            return typeof item !== 'undefined' ? item.side : undefined;
        })
            .filter(function (side) { return side === 'ATK' || side === 'DEF'; })));
    }
    Object.defineProperty(CSGOSTrategyDataTransposer.prototype, "uniqueItems", {
        get: function () {
            return this._uniqueItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSGOSTrategyDataTransposer.prototype, "uniqueIDs", {
        get: function () {
            return this._uniqueIDs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSGOSTrategyDataTransposer.prototype, "uniqueSides", {
        get: function () {
            return this._uniqueSides;
        },
        enumerable: true,
        configurable: true
    });
    return CSGOSTrategyDataTransposer;
}());
exports.default = CSGOSTrategyDataTransposer;
