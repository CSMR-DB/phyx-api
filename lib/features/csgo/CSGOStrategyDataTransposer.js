"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectToArray_1 = require("~src/utils/objectToArray");
function csgoStrategyDataTransposer(strategy) {
    var players = strategy.team.players;
    function uniqueIDs() {
        var playersArray = objectToArray_1.objectToArray(players);
        var loadoutArray = playersArray.map(function (player) { return player['loadout']; });
        var items = loadoutArray
            .map(function (loadout) { return [
            loadout.primary || {},
            loadout.secondary
        ].concat((loadout.gear || []), (loadout.utilities || [])); })
            .reduce(function (pV, cV) { return pV.concat(cV); });
        var ids = items.map(function (_a) {
            var internal_id = _a.internal_id;
            return internal_id;
        });
        return Array.from(new Set(ids));
    }
    return Object.freeze({ uniqueIDs: uniqueIDs() });
}
exports.csgoStrategyDataTransposer = csgoStrategyDataTransposer;
