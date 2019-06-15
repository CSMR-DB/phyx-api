"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sumArray_1 = require("~src/utils/sumArray");
var objectToArray_1 = require("~src/utils/objectToArray");
var isValidated_1 = require("~src/services/validators/validator-modules/isValidated");
function csgoCostValidator(strategy, gameDataManager) {
    var budget = strategy.budget;
    var errors = [];
    function validatePlayer(player) {
        var _a = player.loadout, primary = _a.primary, secondary = _a.secondary, gear = _a.gear, utilities = _a.utilities;
        function hasOrEmptyFn(item) {
            return item ? item : [];
        }
        var allPlayerItems = [
            hasOrEmptyFn(primary),
            hasOrEmptyFn(secondary)
        ].concat(hasOrEmptyFn(gear), hasOrEmptyFn(utilities));
        var allPlayerItemsCost = allPlayerItems.map(function (_a) {
            var internal_id = _a.internal_id;
            return gameDataManager.getField(internal_id, 'cost', 0);
        });
        var totalPlayerCost = sumArray_1.sumArray(allPlayerItemsCost);
        var withinBudget = totalPlayerCost <= budget;
        if (!withinBudget) {
            errors.push(new Error(player.name + " has spent too much on their loadout"));
        }
        return { result: withinBudget, errors: errors };
    }
    function execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var players, playersArray, results, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        players = strategy.team.players;
                        playersArray = objectToArray_1.objectToArray(players);
                        results = playersArray.map(function (player) { return validatePlayer(player); });
                        result = isValidated_1.isValidated(results.map(function (_a) {
                            var result = _a.result;
                            return result;
                        }));
                        return [4 /*yield*/, { result: result, errors: errors }];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    return Object.freeze({ execute: execute, errors: errors });
}
exports.csgoCostValidator = csgoCostValidator;
