"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectToArray_1 = require("~src/utils/objectToArray");
function csgoStrategyDataTransposer(strategy) {
    var players = strategy.team.players;
    var playersArray = objectToArray_1.objectToArray(players);
    var loadoutArray = playersArray.map(function (player) { return player['loadout']; });
    function uniqueIDs() {
        var items = loadoutArray
            .map(function (loadout) { return [
            loadout.primary || {},
            loadout.secondary
        ].concat((loadout.gear || []), (loadout.utilities || [])); })
            .reduce(function (pV, cV) {
            return pV.concat(cV);
        });
        var ids = items.map(function (_a) {
            var internal_id = _a.internal_id;
            return internal_id;
        });
        return Array.from(new Set(ids));
    }
    function slots() {
        var items = loadoutArray.map(function (loadout) { return ({
            slot: 'secondary',
            internal_id: loadout.secondary.internal_id
        }); });
        loadoutArray.map(function (loadout) {
            if (loadout.primary) {
                items.push({
                    slot: 'primary',
                    internal_id: loadout.primary.internal_id
                });
            }
            if (loadout.gear) {
                loadout.gear.map(function (item) {
                    if (item) {
                        items.push({
                            slot: 'gear',
                            internal_id: item.internal_id
                        });
                    }
                });
            }
            if (loadout.utilities) {
                loadout.utilities.map(function (item) {
                    if (item) {
                        items.push({
                            slot: 'utilities',
                            internal_id: item.internal_id
                        });
                    }
                });
            }
        });
        return Array.from(new Set(items.filter(function (item) { return item; })));
    }
    return Object.freeze({ uniqueIDs: uniqueIDs(), slots: slots() });
}
exports.csgoStrategyDataTransposer = csgoStrategyDataTransposer;
